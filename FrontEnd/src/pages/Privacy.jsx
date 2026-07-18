import { LegalPageLayout } from "../components/LegalPageLayout";
import { LegalSection } from "../components/LegalSection";

export const Privacy = () => {
  return (
    <LegalPageLayout title="Privacy Policy – ReadIt">
      <LegalSection title="1. Titolare del trattamento">
        <p className="leading-relaxed">
          Il titolare del trattamento è il proprietario del sito ReadIt. Per
          qualsiasi richiesta relativa alla presente privacy policy è
          possibile contattare il titolare tramite i riferimenti indicati nel
          sito.
        </p>
      </LegalSection>

      <LegalSection title="2. Tipologie di dati raccolti">
        <p className="leading-relaxed mb-4">
          ReadIt raccoglie esclusivamente i dati necessari al funzionamento
          del servizio.
        </p>

        <div className="mb-4">
          <h3 className="text-xl font-bold text-text mb-2">
            Dati forniti dall'utente:
          </h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Nome</li>
            <li>Email</li>
            <li>Username</li>
            <li>
              Password (conservata esclusivamente in forma crittografata)
            </li>
            <li>
              Dati relativi ai libri inseriti dall'utente:
              <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                <li>titolo</li>
                <li>autore</li>
                <li>data di inizio lettura</li>
                <li>numero totale di pagine</li>
                <li>pagina corrente</li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-text mb-2">Dati tecnici:</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Indirizzo IP</li>
            <li>User agent</li>
            <li>Dati di log relativi alle richieste HTTP</li>
          </ul>
        </div>
      </LegalSection>

      <LegalSection title="3. Finalità del trattamento">
        <p className="leading-relaxed mb-2">
          I dati sono trattati esclusivamente per le seguenti finalità:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>creazione e gestione dell'account utente</li>
          <li>
            utilizzo delle funzionalità del servizio (gestione dei libri e
            dello stato di lettura)
          </li>
          <li>autenticazione e gestione della sessione</li>
          <li>sicurezza del servizio e prevenzione di abusi</li>
          <li>analisi statistiche aggregate sul funzionamento del sito</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Base giuridica del trattamento">
        <p className="leading-relaxed mb-2">
          Il trattamento dei dati personali si basa su:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <strong>esecuzione di un contratto:</strong> per la gestione
            dell'account e delle funzionalità offerte
          </li>
          <li>
            <strong>legittimo interesse del titolare:</strong> per la
            sicurezza, il corretto funzionamento del servizio e l'analisi
            tecnica delle prestazioni
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Cookie">
        <p className="leading-relaxed mb-2">
          ReadIt utilizza esclusivamente:
        </p>
        <ul className="list-disc list-inside ml-4 mb-2">
          <li>
            cookie tecnici di sessione necessari all'autenticazione e al
            funzionamento del sito
          </li>
        </ul>
        <p className="leading-relaxed">
          Non vengono utilizzati cookie di profilazione o marketing.
        </p>
      </LegalSection>

      <LegalSection title="6. Servizi di terze parti">
        <p className="leading-relaxed mb-2">
          I dati possono essere trattati da fornitori esterni che agiscono
          come responsabili del trattamento:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 mb-3">
          <li>
            <strong>Vercel:</strong> hosting dell'applicazione frontend,
            gestione delle richieste e dei log tecnici
          </li>
          <li>
            <strong>Railway:</strong> hosting del backend e gestione delle API
          </li>
          <li>
            <strong>Supabase:</strong> gestione del database e
            dell'autenticazione, con dati conservati su server situati
            nell'Unione Europea
          </li>
          <li>
            <strong>Vercel Analytics:</strong> analisi statistiche aggregate
            sull'utilizzo del sito
          </li>
        </ul>
        <p className="leading-relaxed">
          L'utilizzo di tali servizi può comportare il trattamento di dati
          tecnici (es. indirizzo IP).
        </p>
      </LegalSection>

      <LegalSection title="7. Conservazione dei dati">
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            I dati dell'account e i dati relativi ai libri sono conservati per
            tutta la durata dell'account.
          </li>
          <li>
            In caso di inattività protratta per 24 mesi, l'account e i dati
            associati possono essere eliminati automaticamente.
          </li>
          <li>
            In caso di richiesta di cancellazione da parte dell'utente, i dati
            vengono rimossi entro un periodo tecnico massimo di 30 giorni.
          </li>
          <li>
            I log tecnici sono conservati per il tempo strettamente necessario
            al funzionamento e alla sicurezza del servizio, secondo le
            politiche dei fornitori utilizzati.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="8. Diritti dell'utente">
        <p className="leading-relaxed mb-2">L'utente ha il diritto di:</p>
        <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
          <li>accedere ai propri dati personali</li>
          <li>richiederne la rettifica o la cancellazione</li>
          <li>opporsi al trattamento nei casi previsti dalla legge</li>
          <li>richiedere una copia dei propri dati personali</li>
        </ul>
        <p className="leading-relaxed">
          Le richieste possono essere effettuate contattando il titolare del
          trattamento. Il titolare si impegna a rispondere entro i termini
          previsti dalla normativa vigente.
        </p>
      </LegalSection>

      <LegalSection title="9. Sicurezza">
        <p className="leading-relaxed">
          Il titolare adotta misure tecniche e organizzative adeguate per
          proteggere i dati personali, inclusa la cifratura delle password e
          la limitazione degli accessi ai dati.
        </p>
      </LegalSection>

      <LegalSection title="10. Modifiche alla presente policy">
        <p className="leading-relaxed">
          La presente privacy policy può essere aggiornata in qualsiasi
          momento. Le modifiche saranno pubblicate su questa pagina.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
};
