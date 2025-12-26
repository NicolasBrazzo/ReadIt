export const Privacy = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Privacy Policy – ReadIt
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            1. Titolare del trattamento
          </h2>
          <p className="leading-relaxed">
            Il titolare del trattamento è il proprietario del sito ReadIt. Per
            qualsiasi richiesta relativa alla presente privacy policy è
            possibile contattare il titolare tramite i riferimenti indicati nel
            sito.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            2. Tipologie di dati raccolti
          </h2>
          <p className="leading-relaxed mb-4">
            ReadIt raccoglie esclusivamente i dati necessari al funzionamento
            del servizio.
          </p>

          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">
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
            <h3 className="text-xl font-semibold mb-2">Dati tecnici:</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Indirizzo IP</li>
              <li>User agent</li>
              <li>Dati di log relativi alle richieste HTTP</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            3. Finalità del trattamento
          </h2>
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
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            4. Base giuridica del trattamento
          </h2>
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
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            5. Cookie
          </h2>
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
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            6. Servizi di terze parti
          </h2>
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
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            7. Conservazione dei dati
          </h2>
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
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            8. Diritti dell'utente
          </h2>
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
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            9. Sicurezza
          </h2>
          <p className="leading-relaxed">
            Il titolare adotta misure tecniche e organizzative adeguate per
            proteggere i dati personali, inclusa la cifratura delle password e
            la limitazione degli accessi ai dati.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            10. Modifiche alla presente policy
          </h2>
          <p className="leading-relaxed">
            La presente privacy policy può essere aggiornata in qualsiasi
            momento. Le modifiche saranno pubblicate su questa pagina.
          </p>
        </section>

        <div className="text-center mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT")}
          </p>
        </div>
      </div>
    </div>
  );
};
