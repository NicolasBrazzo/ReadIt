export const Terms = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Termini e Condizioni d'Uso – ReadIt
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            1. Oggetto del servizio
          </h2>
          <p className="leading-relaxed mb-3">
            ReadIt è una piattaforma web che consente agli utenti registrati di
            gestire e monitorare le proprie letture personali, inserendo e
            modificando informazioni relative ai libri letti o in corso di
            lettura.
          </p>
          <p className="leading-relaxed">
            Il servizio è fornito a titolo gratuito e in fase di sviluppo.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            2. Registrazione e account
          </h2>
          <p className="leading-relaxed mb-3">
            Per utilizzare ReadIt è necessaria la creazione di un account
            personale.
          </p>

          <p className="leading-relaxed mb-2">L'utente si impegna a:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
            <li>fornire informazioni veritiere e aggiornate</li>
            <li>mantenere riservate le proprie credenziali di accesso</li>
            <li>non condividere il proprio account con terzi</li>
          </ul>

          <p className="leading-relaxed">
            Ogni utente è responsabile di tutte le attività svolte tramite il
            proprio account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            3. Utilizzo del servizio
          </h2>

          <div className="mb-4">
            <p className="leading-relaxed mb-2">L'utente può:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                creare, visualizzare, modificare ed eliminare esclusivamente i
                propri dati e i propri libri
              </li>
              <li>
                utilizzare il servizio solo per finalità lecite e personali
              </li>
            </ul>
          </div>

          <div>
            <p className="leading-relaxed mb-2">È vietato:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>tentare di accedere ai dati di altri utenti</li>
              <li>compromettere la sicurezza o il funzionamento del sito</li>
              <li>utilizzare il servizio in modo improprio o abusivo</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            4. Contenuti inseriti dall'utente
          </h2>
          <p className="leading-relaxed mb-3">
            Tutti i dati relativi ai libri inseriti dall'utente sono di sua
            esclusiva responsabilità.
          </p>

          <p className="leading-relaxed mb-2">Il titolare del servizio:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
            <li>non verifica i contenuti inseriti</li>
            <li>
              non è responsabile per eventuali errori, perdite o cancellazioni
              dei dati
            </li>
          </ul>

          <p className="leading-relaxed">
            L'utente può eliminare in qualsiasi momento i propri contenuti
            tramite le funzionalità offerte dal sito.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            5. Sospensione o cessazione dell'account
          </h2>
          <p className="leading-relaxed mb-2">
            Il titolare si riserva il diritto di:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
            <li>
              sospendere o eliminare l'account in caso di violazione dei
              presenti Termini
            </li>
            <li>interrompere o modificare il servizio in qualsiasi momento</li>
          </ul>

          <p className="leading-relaxed">
            In caso di inattività protratta, l'account e i dati associati
            possono essere eliminati.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            6. Limitazione di responsabilità
          </h2>
          <p className="leading-relaxed mb-3">
            Il servizio è fornito "così com'è".
          </p>

          <p className="leading-relaxed mb-2">Il titolare non garantisce:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
            <li>l'assenza di errori</li>
            <li>la continuità del servizio</li>
            <li>la completa disponibilità dei dati nel tempo</li>
          </ul>

          <p className="leading-relaxed">
            Nei limiti consentiti dalla legge, il titolare non è responsabile
            per eventuali danni derivanti dall'utilizzo del servizio.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            7. Proprietà intellettuale
          </h2>
          <p className="leading-relaxed mb-3">
            Il codice, il design e la struttura del sito sono di proprietà del
            titolare del servizio.
          </p>
          <p className="leading-relaxed">
            È vietata la riproduzione non autorizzata dei contenuti del sito.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            8. Modifiche ai Termini
          </h2>
          <p className="leading-relaxed mb-3">
            I presenti Termini possono essere aggiornati in qualsiasi momento.
          </p>
          <p className="leading-relaxed">
            Le modifiche saranno pubblicate su questa pagina e avranno effetto
            immediato.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            9. Legge applicabile
          </h2>
          <p className="leading-relaxed">
            I presenti Termini sono regolati dalla legge italiana ed europea
            applicabile.
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
