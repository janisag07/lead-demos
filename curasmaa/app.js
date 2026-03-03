// ============================================
// CuraMatch AI — Application Logic
// ============================================

// ---- Navigation ----
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');
    document.querySelector(`[data-page="${page}"]`).classList.add('active');
    document.getElementById('sidebar').classList.remove('open');
    if (page === 'candidates') renderCandidates();
    if (page === 'facilities') renderFacilities();
    if (page === 'matching') initMatching();
    if (page === 'documents') renderDocuments();
    if (page === 'analytics') renderCharts();
    window.scrollTo(0, 0);
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// ---- Candidates ----
function renderCandidates(filter = 'all') {
    const tbody = document.getElementById('candidateBody');
    let data = CANDIDATES;
    if (filter === 'active') data = data.filter(c => c.status === 'active');
    if (filter === 'docs') data = data.filter(c => Object.values(c.docs).some(d => d === 'missing' || d === 'pending' || d === 'expiring'));
    if (filter === 'placed') data = data.filter(c => c.status === 'placed');

    tbody.innerHTML = data.map(c => `
        <tr>
            <td>
                <div class="cell-person">
                    <span class="person-flag">${c.flag}</span>
                    <div>
                        <strong>${c.name}</strong>
                        <span class="cell-sub">${c.experience} Jahre Erfahrung</span>
                    </div>
                </div>
            </td>
            <td>${c.country}</td>
            <td>${c.qualification}</td>
            <td><span class="lang-badge lang-${c.german.toLowerCase()}">${c.german}</span></td>
            <td>${statusBadge(c.stage)}</td>
            <td>${docStatus(c.docs)}</td>
            <td>
                <button class="btn btn-sm" onclick="viewCandidate(${c.id})">Details</button>
            </td>
        </tr>
    `).join('');
}

function statusBadge(stage) {
    const map = {
        application: '<span class="badge blue">Bewerbung</span>',
        documents: '<span class="badge yellow">Dokumente</span>',
        matching: '<span class="badge purple">Matching</span>',
        presentation: '<span class="badge orange">Vorstellung</span>',
        placed: '<span class="badge green">Vermittelt ✓</span>'
    };
    return map[stage] || stage;
}

function docStatus(docs) {
    const vals = Object.values(docs);
    const missing = vals.filter(d => d === 'missing').length;
    const pending = vals.filter(d => d === 'pending').length;
    const expiring = vals.filter(d => d === 'expiring').length;
    if (missing > 0) return `<span class="badge red">❌ ${missing} fehlend</span>`;
    if (expiring > 0) return `<span class="badge yellow">⚠️ ${expiring} bald ablaufend</span>`;
    if (pending > 0) return `<span class="badge blue">⏳ ${pending} ausstehend</span>`;
    return '<span class="badge green">✅ Komplett</span>';
}

function filterByStatus(btn, status) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderCandidates(status);
}

function filterCandidates() {
    const q = document.getElementById('candidateSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#candidateBody tr');
    rows.forEach(r => {
        r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
}

function viewCandidate(id) {
    const c = CANDIDATES.find(x => x.id === id);
    if (!c) return;
    const html = `
        <button class="modal-close" onclick="closeModal()">&times;</button>
        <div class="candidate-detail">
            <div class="detail-header">
                <span class="detail-flag">${c.flag}</span>
                <div>
                    <h2>${c.name}</h2>
                    <p>${c.qualification} • ${c.country}</p>
                </div>
            </div>
            <div class="detail-grid">
                <div class="detail-item"><label>Erfahrung</label><p>${c.experience} Jahre</p></div>
                <div class="detail-item"><label>Deutsch</label><p><span class="lang-badge lang-${c.german.toLowerCase()}">${c.german}</span></p></div>
                <div class="detail-item"><label>Spezialisierung</label><p>${c.specialization}</p></div>
                <div class="detail-item"><label>Verfügbarkeit</label><p>${c.availability}</p></div>
                <div class="detail-item"><label>Status</label><p>${statusBadge(c.stage)}</p></div>
                ${c.placedAt ? `<div class="detail-item"><label>Vermittelt bei</label><p>${c.placedAt}</p></div>` : ''}
            </div>
            <h3>Dokumente</h3>
            <div class="detail-docs">
                <div class="doc-chip ${c.docs.visa}">📋 Aufenthaltstitel: ${docLabel(c.docs.visa)}</div>
                <div class="doc-chip ${c.docs.recognition}">📜 Anerkennung: ${docLabel(c.docs.recognition)}</div>
                <div class="doc-chip ${c.docs.language}">🗣️ Sprachzertifikat: ${docLabel(c.docs.language)}</div>
                <div class="doc-chip ${c.docs.cv}">📄 Lebenslauf: ${docLabel(c.docs.cv)}</div>
            </div>
            <h3>Notizen</h3>
            <p class="detail-notes">${c.notes}</p>
            <div class="detail-actions">
                <button class="btn btn-primary" onclick="closeModal(); showPage('matching');">🤖 AI-Match finden</button>
                <button class="btn btn-ghost" onclick="closeModal(); showPage('messages');">✉️ Nachricht senden</button>
            </div>
        </div>
    `;
    openModalHTML(html);
}

function docLabel(status) {
    const map = { valid: '✅ Gültig', pending: '⏳ Ausstehend', missing: '❌ Fehlend', expiring: '⚠️ Bald ablaufend', approved: '✅ Genehmigt', received: '📬 Eingegangen' };
    return map[status] || status;
}

// ---- Facilities ----
function renderFacilities() {
    const grid = document.getElementById('facilityGrid');
    grid.innerHTML = FACILITIES.map(f => `
        <div class="facility-card">
            <div class="facility-header">
                <h3>${f.name}</h3>
                <span class="badge ${f.urgency === 'hoch' ? 'red' : f.urgency === 'mittel' ? 'yellow' : 'blue'}">${f.urgency}</span>
            </div>
            <p class="facility-type">${f.type} • ${f.location}</p>
            <div class="facility-stats">
                <div><strong>${f.beds}</strong><span>Betten</span></div>
                <div><strong>${f.openPositions}</strong><span>Offene Stellen</span></div>
            </div>
            <div class="facility-needs">
                <p><strong>Sucht:</strong></p>
                ${f.needs.map(n => `<span class="need-tag">${n}</span>`).join('')}
            </div>
            <div class="facility-contact">
                <p>📞 ${f.contact}</p>
                <p>📧 ${f.email}</p>
            </div>
            <button class="btn btn-primary btn-full" onclick="showPage('matching'); setTimeout(() => { document.getElementById('matchFacility').value='${f.id}'; runAIMatch(); }, 100)">🤖 Kandidaten matchen</button>
        </div>
    `).join('');
}

// ---- AI Matching ----
function initMatching() {
    const select = document.getElementById('matchFacility');
    select.innerHTML = '<option value="">— Einrichtung wählen —</option>' +
        FACILITIES.map(f => `<option value="${f.id}">${f.name} (${f.openPositions} offen)</option>`).join('');
}

function runAIMatch() {
    const fid = parseInt(document.getElementById('matchFacility').value);
    if (!fid) return;
    const facility = FACILITIES.find(f => f.id === fid);
    const needsDiv = document.getElementById('facilityNeeds');
    needsDiv.style.display = 'block';
    needsDiv.innerHTML = `
        <p><strong>${facility.name}</strong> sucht:</p>
        ${facility.needs.map(n => `<span class="need-tag">${n}</span>`).join('')}
        <p class="mt-1"><strong>${facility.openPositions}</strong> offene Stellen • Dringlichkeit: <strong>${facility.urgency}</strong></p>
    `;

    const results = document.getElementById('matchResults');
    results.innerHTML = `
        <div class="ai-loading">
            <div class="spinner"></div>
            <p>🤖 AI analysiert ${CANDIDATES.filter(c=>c.status==='active').length} Kandidat:innen...</p>
        </div>
    `;

    setTimeout(() => {
        const matches = CANDIDATES
            .filter(c => c.status === 'active')
            .map(c => {
                let score = 0;
                // Specialization match
                if (facility.needs.includes(c.specialization)) score += 40;
                else if (facility.needs.some(n => n === 'Allgemeinpflege')) score += 20;
                // German level
                if (c.german === 'C1') score += 20;
                else if (c.german === 'B2') score += 15;
                else if (c.german === 'B1') score += 8;
                // Documents complete
                const docsOk = !Object.values(c.docs).some(d => d === 'missing' || d === 'pending');
                if (docsOk) score += 15;
                // Experience
                score += Math.min(c.experience * 2, 15);
                // Availability
                if (c.availability === 'sofort') score += 10;
                else if (c.availability.includes('April')) score += 5;
                return { ...c, matchScore: Math.min(score, 99) };
            })
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 5);

        results.innerHTML = matches.length === 0
            ? '<div class="empty-state"><p>Keine passenden Kandidat:innen gefunden</p></div>'
            : matches.map((m, i) => `
                <div class="match-card ${i === 0 ? 'top-match' : ''}">
                    ${i === 0 ? '<div class="top-match-label">⭐ Beste Übereinstimmung</div>' : ''}
                    <div class="match-header">
                        <div class="match-person">
                            <span class="person-flag">${m.flag}</span>
                            <div>
                                <strong>${m.name}</strong>
                                <span>${m.qualification}</span>
                            </div>
                        </div>
                        <div class="match-score">
                            <div class="score-ring" style="--score:${m.matchScore}">
                                <span>${m.matchScore}%</span>
                            </div>
                        </div>
                    </div>
                    <div class="match-details">
                        <span>🗣️ Deutsch ${m.german}</span>
                        <span>📅 ${m.experience}J Erfahrung</span>
                        <span>🏥 ${m.specialization}</span>
                        <span>⏰ ${m.availability}</span>
                    </div>
                    <div class="match-reason">
                        <p class="ai-label">🤖 AI-Begründung:</p>
                        <p>${generateMatchReason(m, facility)}</p>
                    </div>
                    <div class="match-actions">
                        <button class="btn btn-primary btn-sm" onclick="toast('📧 Vorschlag an ${facility.contact} gesendet!')">Einrichtung vorschlagen</button>
                        <button class="btn btn-ghost btn-sm" onclick="viewCandidate(${m.id})">Profil ansehen</button>
                    </div>
                </div>
            `).join('');
    }, 1800);
}

function generateMatchReason(candidate, facility) {
    const reasons = [];
    if (facility.needs.includes(candidate.specialization)) {
        reasons.push(`Spezialisierung in ${candidate.specialization} passt exakt zur Anforderung`);
    }
    if (candidate.german >= 'B2') reasons.push(`Sprachniveau ${candidate.german} ermöglicht selbstständiges Arbeiten`);
    if (candidate.experience >= 5) reasons.push(`${candidate.experience} Jahre Berufserfahrung — überdurchschnittlich`);
    if (candidate.availability === 'sofort') reasons.push('Sofort verfügbar');
    const docsOk = !Object.values(candidate.docs).some(d => d === 'missing' || d === 'pending');
    if (docsOk) reasons.push('Alle Dokumente vollständig und gültig');
    return reasons.join('. ') + '.';
}

// ---- Documents ----
function renderDocuments(filter = 'all') {
    const tbody = document.getElementById('docBody');
    let data = DOCUMENTS;
    if (filter === 'expiring') data = data.filter(d => d.status === 'expiring');
    if (filter === 'missing') data = data.filter(d => d.status === 'missing' || d.status === 'pending');
    if (filter === 'valid') data = data.filter(d => d.status === 'valid' || d.status === 'approved');

    tbody.innerHTML = data.map(d => {
        const statusMap = {
            valid: '<span class="badge green">✅ Gültig</span>',
            expiring: '<span class="badge yellow">⚠️ Bald ablaufend</span>',
            missing: '<span class="badge red">❌ Fehlend</span>',
            pending: '<span class="badge blue">⏳ Ausstehend</span>',
            approved: '<span class="badge green">✅ Genehmigt</span>',
            received: '<span class="badge blue">📬 Eingegangen</span>'
        };
        return `
            <tr>
                <td><strong>${d.candidate}</strong></td>
                <td>${d.type}</td>
                <td>${statusMap[d.status] || d.status}</td>
                <td>${d.expires ? formatDate(d.expires) : '—'}</td>
                <td>
                    ${d.status === 'expiring' ? `<button class="btn btn-sm btn-warn" onclick="toast('📧 Erinnerung an ${d.candidate} gesendet!')">Erinnern</button>` : ''}
                    ${d.status === 'missing' ? `<button class="btn btn-sm" onclick="toast('📤 Anforderung an ${d.candidate} gesendet!')">Anfordern</button>` : ''}
                    ${d.status === 'received' ? `<button class="btn btn-sm btn-success" onclick="toast('✅ Dokument als geprüft markiert!')">Prüfen</button>` : ''}
                </td>
            </tr>
        `;
    }).join('');
}

function filterDocs(btn, filter) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDocuments(filter);
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
    const formatted = d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    if (diff <= 14 && diff > 0) return `<span class="text-warn">${formatted} (${diff} Tage!)</span>`;
    if (diff <= 0) return `<span class="text-danger">${formatted} (ABGELAUFEN)</span>`;
    return formatted;
}

// ---- Messages ----
function loadTemplate() {
    const key = document.getElementById('msgTemplate').value;
    if (key && MESSAGE_TEMPLATES[key]) {
        document.getElementById('msgBody').value = MESSAGE_TEMPLATES[key];
    }
}

function generateAIMessage() {
    const recipient = document.getElementById('msgRecipient').value;
    if (!recipient || recipient.includes('Auswählen')) {
        toast('Bitte wählen Sie zuerst einen Empfänger');
        return;
    }
    const suggestion = document.getElementById('aiSuggestion');
    const text = document.getElementById('aiSuggestionText');
    suggestion.style.display = 'block';
    text.textContent = '🤖 AI generiert personalisierte Nachricht...';
    setTimeout(() => {
        text.textContent = `Sehr geehrte/r ${recipient},\n\nich hoffe, es geht Ihnen gut. Ich melde mich bezüglich Ihres aktuellen Status bei Curasmaa.\n\nWir arbeiten aktiv daran, die bestmögliche Stelle für Sie zu finden. Sobald unser AI-System ein passendes Match identifiziert hat, werden wir Sie umgehend informieren.\n\nFalls Sie in der Zwischenzeit Fragen haben, stehe ich Ihnen jederzeit zur Verfügung.\n\nMit freundlichen Grüßen,\nAsmaa Scherer`;
    }, 1200);
}

function useAISuggestion() {
    document.getElementById('msgBody').value = document.getElementById('aiSuggestionText').textContent;
    document.getElementById('aiSuggestion').style.display = 'none';
    toast('✅ AI-Vorschlag übernommen');
}

function sendMessage() {
    const recipient = document.getElementById('msgRecipient').value;
    const body = document.getElementById('msgBody').value;
    if (!recipient || recipient.includes('Auswählen')) { toast('Bitte Empfänger wählen'); return; }
    if (!body.trim()) { toast('Bitte Nachricht eingeben'); return; }
    toast(`📧 Nachricht an ${recipient} gesendet!`);
    document.getElementById('msgBody').value = '';
}

// ---- Analytics Charts (simple CSS) ----
function renderCharts() {
    const months = [
        { label: 'Sep', value: 2 }, { label: 'Okt', value: 3 },
        { label: 'Nov', value: 4 }, { label: 'Dez', value: 3 },
        { label: 'Jan', value: 5 }, { label: 'Feb', value: 6 }
    ];
    const maxVal = Math.max(...months.map(m => m.value));
    document.getElementById('chartMonthly').innerHTML = `
        <div class="bar-chart">
            ${months.map(m => `
                <div class="bar-col">
                    <div class="bar" style="height:${(m.value / maxVal) * 100}%">
                        <span class="bar-value">${m.value}</span>
                    </div>
                    <span class="bar-label">${m.label}</span>
                </div>
            `).join('')}
        </div>
    `;

    const countries = [
        { name: 'Polen', pct: 35, color: '#3B82F6' },
        { name: 'Rumänien', pct: 30, color: '#8B5CF6' },
        { name: 'Serbien', pct: 20, color: '#10B981' },
        { name: 'Ukraine', pct: 10, color: '#F59E0B' },
        { name: 'Kroatien', pct: 5, color: '#EF4444' }
    ];
    document.getElementById('chartCountries').innerHTML = `
        <div class="h-bars">
            ${countries.map(c => `
                <div class="h-bar-row">
                    <span class="h-bar-label">${c.name}</span>
                    <div class="h-bar-track">
                        <div class="h-bar-fill" style="width:${c.pct}%;background:${c.color}"></div>
                    </div>
                    <span class="h-bar-value">${c.pct}%</span>
                </div>
            `).join('')}
        </div>
    `;
}

// ---- Modal ----
function openModal(type) {
    let html = '';
    if (type === 'addCandidate') {
        html = `
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <h2>Neue Pflegekraft</h2>
            <form class="modal-form" onsubmit="return false">
                <div class="form-row"><div class="form-group"><label>Vorname *</label><input type="text"></div><div class="form-group"><label>Nachname *</label><input type="text"></div></div>
                <div class="form-row"><div class="form-group"><label>Herkunftsland *</label><select class="select-input"><option>Polen</option><option>Rumänien</option><option>Serbien</option><option>Ukraine</option><option>Kroatien</option><option>Bosnien</option><option>Philippinen</option></select></div><div class="form-group"><label>Qualifikation *</label><select class="select-input"><option>Gesundheits- und Krankenpfleger/in</option><option>Altenpfleger/in</option><option>Pflegefachfrau/-mann</option></select></div></div>
                <div class="form-row"><div class="form-group"><label>Deutschniveau *</label><select class="select-input"><option>A1</option><option>A2</option><option>B1</option><option>B2</option><option>C1</option></select></div><div class="form-group"><label>Berufserfahrung (Jahre)</label><input type="number" value="3"></div></div>
                <div class="form-group"><label>Spezialisierung</label><input type="text" placeholder="z.B. Intensivpflege, Altenpflege..."></div>
                <div class="form-group"><label>Notizen</label><textarea rows="3"></textarea></div>
                <button class="btn btn-primary btn-full" onclick="toast('✅ Pflegekraft erfolgreich angelegt! Willkommens-E-Mail wird gesendet...'); closeModal()">Anlegen & Willkommen senden</button>
            </form>
        `;
    }
    openModalHTML(html);
}

function openModalHTML(html) {
    document.getElementById('modalContent').innerHTML = html;
    document.getElementById('modalOverlay').classList.add('open');
}

function closeModal(e) {
    if (e && e.target !== e.currentTarget) return;
    document.getElementById('modalOverlay').classList.remove('open');
}

// ---- Toast ----
function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
    renderCandidates();
});
