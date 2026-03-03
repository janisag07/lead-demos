// ============================================
// CuraMatch AI — Demo Data
// Realistic data for Curasmaa Pflegekräfte-Vermittlung
// ============================================

const CANDIDATES = [
    { id: 1, name: "Maria Kowalska", country: "Polen", flag: "🇵🇱", qualification: "Gesundheits- und Krankenpflegerin", german: "B2", status: "active", stage: "matching", docs: { visa: "valid", recognition: "valid", language: "expiring", cv: "valid" }, experience: 8, specialization: "Intensivpflege", availability: "sofort", notes: "Erfahrung auf Intensivstation, sehr zuverlässig" },
    { id: 2, name: "Ana Popescu", country: "Rumänien", flag: "🇷🇴", qualification: "Altenpflegerin", german: "B1", status: "active", stage: "documents", docs: { visa: "valid", recognition: "received", language: "valid", cv: "valid" }, experience: 5, specialization: "Altenpflege", availability: "ab April", notes: "Anerkennung gerade eingetroffen" },
    { id: 3, name: "Dragana Jović", country: "Serbien", flag: "🇷🇸", qualification: "Gesundheits- und Krankenpflegerin", german: "B2", status: "active", stage: "application", docs: { visa: "pending", recognition: "pending", language: "valid", cv: "valid" }, experience: 6, specialization: "Chirurgie", availability: "ab Mai", notes: "OP-Erfahrung, Willkommens-Mail gesendet" },
    { id: 4, name: "Tomasz Nowak", country: "Polen", flag: "🇵🇱", qualification: "Altenpfleger", german: "B2", status: "placed", stage: "placed", docs: { visa: "valid", recognition: "valid", language: "valid", cv: "valid" }, experience: 10, specialization: "Demenzpflege", availability: "vermittelt", notes: "Erfolgreich bei Seniorenresidenz Allgäu platziert", placedAt: "Seniorenresidenz Allgäu" },
    { id: 5, name: "Elena Vasile", country: "Rumänien", flag: "🇷🇴", qualification: "Gesundheits- und Krankenpflegerin", german: "B1", status: "active", stage: "documents", docs: { visa: "approved", recognition: "pending", language: "valid", cv: "valid" }, experience: 4, specialization: "Innere Medizin", availability: "ab Juni", notes: "Visum genehmigt, Anerkennung läuft" },
    { id: 6, name: "Ivana Horvat", country: "Kroatien", flag: "🇭🇷", qualification: "Pflegefachfrau", german: "B2", status: "active", stage: "matching", docs: { visa: "valid", recognition: "valid", language: "valid", cv: "valid" }, experience: 7, specialization: "Geriatrie", availability: "sofort", notes: "Alle Dokumente komplett, sofort einsetzbar" },
    { id: 7, name: "Petro Kovalenko", country: "Ukraine", flag: "🇺🇦", qualification: "Krankenpfleger", german: "A2", status: "active", stage: "application", docs: { visa: "valid", recognition: "pending", language: "missing", cv: "valid" }, experience: 3, specialization: "Allgemeinpflege", availability: "ab Juli", notes: "Deutschkurs läuft, motiviert" },
    { id: 8, name: "Milena Stojanović", country: "Serbien", flag: "🇷🇸", qualification: "Altenpflegerin", german: "B1", status: "active", stage: "presentation", docs: { visa: "valid", recognition: "valid", language: "valid", cv: "valid" }, experience: 9, specialization: "Palliativpflege", availability: "sofort", notes: "Vorstellung bei Hospiz am See läuft" },
    { id: 9, name: "Katarzyna Wójcik", country: "Polen", flag: "🇵🇱", qualification: "Gesundheits- und Krankenpflegerin", german: "C1", status: "placed", stage: "placed", docs: { visa: "valid", recognition: "valid", language: "valid", cv: "valid" }, experience: 12, specialization: "Intensivpflege", availability: "vermittelt", notes: "Top-Kandidatin, bei Klinikum Ravensburg", placedAt: "Klinikum Ravensburg" },
    { id: 10, name: "Bogdan Marinescu", country: "Rumänien", flag: "🇷🇴", qualification: "Altenpfleger", german: "B2", status: "active", stage: "matching", docs: { visa: "valid", recognition: "valid", language: "valid", cv: "missing" }, experience: 6, specialization: "Rehabilitation", availability: "ab April", notes: "CV muss noch aktualisiert werden" },
    { id: 11, name: "Ljiljana Petrović", country: "Serbien", flag: "🇷🇸", qualification: "Pflegefachfrau", german: "B2", status: "active", stage: "application", docs: { visa: "pending", recognition: "valid", language: "valid", cv: "valid" }, experience: 5, specialization: "Pädiatrie", availability: "ab Mai", notes: "Visum beantragt" },
    { id: 12, name: "Adriana Ionescu", country: "Rumänien", flag: "🇷🇴", qualification: "Gesundheits- und Krankenpflegerin", german: "B1", status: "active", stage: "documents", docs: { visa: "valid", recognition: "pending", language: "valid", cv: "valid" }, experience: 3, specialization: "Allgemeinpflege", availability: "ab Juni", notes: "Jung und motiviert, Anerkennung ausstehend" },
];

const FACILITIES = [
    { id: 1, name: "Klinikum Ravensburg", type: "Krankenhaus", location: "Ravensburg", beds: 450, needs: ["Intensivpflege", "Chirurgie", "Innere Medizin"], openPositions: 3, contact: "Dr. Markus Weber", email: "m.weber@klinikum-rv.de", urgency: "hoch" },
    { id: 2, name: "Seniorenresidenz Allgäu", type: "Pflegeheim", location: "Kempten", beds: 120, needs: ["Altenpflege", "Demenzpflege"], openPositions: 2, contact: "Sabine Hartmann", email: "s.hartmann@sr-allgaeu.de", urgency: "mittel" },
    { id: 3, name: "Altenpflegeheim Sonnental", type: "Pflegeheim", location: "Bad Waldsee", beds: 80, needs: ["Altenpflege", "Palliativpflege", "Geriatrie"], openPositions: 4, contact: "Thomas Müller", email: "t.mueller@sonnental.de", urgency: "hoch" },
    { id: 4, name: "Hospiz am See", type: "Hospiz", location: "Friedrichshafen", beds: 16, needs: ["Palliativpflege"], openPositions: 1, contact: "Dr. Lisa Braun", email: "l.braun@hospiz-see.de", urgency: "mittel" },
    { id: 5, name: "Pflegezentrum Bodensee", type: "Pflegezentrum", location: "Konstanz", beds: 200, needs: ["Allgemeinpflege", "Geriatrie", "Rehabilitation"], openPositions: 5, contact: "Michael Schneider", email: "m.schneider@pz-bodensee.de", urgency: "hoch" },
    { id: 6, name: "Kinderklinik Oberschwaben", type: "Krankenhaus", location: "Wangen", beds: 60, needs: ["Pädiatrie"], openPositions: 2, contact: "Dr. Anna Fischer", email: "a.fischer@kinderklinik-ow.de", urgency: "niedrig" },
];

const DOCUMENTS = [
    { candidateId: 1, candidate: "Maria Kowalska", type: "Sprachzertifikat B2", status: "expiring", expires: "2026-03-17" },
    { candidateId: 1, candidate: "Maria Kowalska", type: "Berufsanerkennung", status: "valid", expires: "2028-01-15" },
    { candidateId: 1, candidate: "Maria Kowalska", type: "Aufenthaltstitel", status: "valid", expires: "2027-06-30" },
    { candidateId: 2, candidate: "Ana Popescu", type: "Berufsanerkennung", status: "received", expires: null },
    { candidateId: 2, candidate: "Ana Popescu", type: "Aufenthaltstitel", status: "valid", expires: "2027-09-01" },
    { candidateId: 3, candidate: "Dragana Jović", type: "Aufenthaltstitel", status: "pending", expires: null },
    { candidateId: 3, candidate: "Dragana Jović", type: "Berufsanerkennung", status: "pending", expires: null },
    { candidateId: 5, candidate: "Elena Vasile", type: "Aufenthaltstitel", status: "approved", expires: "2028-03-01" },
    { candidateId: 5, candidate: "Elena Vasile", type: "Berufsanerkennung", status: "pending", expires: null },
    { candidateId: 7, candidate: "Petro Kovalenko", type: "Sprachzertifikat", status: "missing", expires: null },
    { candidateId: 7, candidate: "Petro Kovalenko", type: "Berufsanerkennung", status: "pending", expires: null },
    { candidateId: 10, candidate: "Bogdan Marinescu", type: "Lebenslauf", status: "missing", expires: null },
    { candidateId: 11, candidate: "Ljiljana Petrović", type: "Aufenthaltstitel", status: "pending", expires: null },
    { candidateId: 12, candidate: "Adriana Ionescu", type: "Berufsanerkennung", status: "pending", expires: null },
];

const MESSAGE_TEMPLATES = {
    welcome: `Sehr geehrte/r {name},

herzlich willkommen bei Curasmaa! Wir freuen uns, Sie auf Ihrem Weg nach Deutschland begleiten zu dürfen.

Als nächste Schritte benötigen wir von Ihnen:
1. Aktueller Lebenslauf (deutsch oder englisch)
2. Kopie Ihrer Berufsqualifikation
3. Sprachzertifikat (mindestens B1)

Bitte laden Sie diese Dokumente in Ihrem Profil hoch oder senden Sie sie per E-Mail.

Bei Fragen stehe ich Ihnen jederzeit zur Verfügung.

Mit freundlichen Grüßen,
Asmaa Scherer
Curasmaa Personalvermittlung`,

    docreminder: `Sehr geehrte/r {name},

wir möchten Sie freundlich daran erinnern, dass Ihr {document} in {days} Tagen abläuft.

Bitte kümmern Sie sich zeitnah um die Erneuerung, damit Ihre Vermittlung reibungslos weiterlaufen kann.

Benötigen Sie Unterstützung bei der Verlängerung? Wir helfen Ihnen gerne!

Mit freundlichen Grüßen,
Asmaa Scherer
Curasmaa Personalvermittlung`,

    match: `Sehr geehrte/r {contact},

wir haben eine hervorragende Kandidatin/einen hervorragenden Kandidaten für Ihre offene Stelle:

Name: {candidateName}
Qualifikation: {qualification}
Berufserfahrung: {experience} Jahre
Deutsch: {german}
Spezialisierung: {specialization}
Verfügbarkeit: {availability}

Unser AI-System hat eine Übereinstimmung von {matchScore}% ermittelt.

Möchten Sie ein Vorstellungsgespräch vereinbaren? Ich koordiniere gerne einen Termin.

Mit freundlichen Grüßen,
Asmaa Scherer
Curasmaa Personalvermittlung`
};
