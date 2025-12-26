export const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Cookie Policy – ReadIt
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            1. Cosa sono i cookie
          </h2>
          <p className="leading-relaxed">
            I cookie sono piccoli file di testo che i siti web salvano sul
            dispositivo dell'utente per garantire il corretto funzionamento
            delle pagine e migliorare l'esperienza di navigazione.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            2. Tipologie di cookie utilizzati
          </h2>
          <p className="leading-relaxed mb-4">
            ReadIt utilizza esclusivamente cookie tecnici necessari al
            funzionamento del sito.
          </p>

          <p className="leading-relaxed mb-2">In particolare:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
            <li>cookie di sessione per l'autenticazione dell'utente</li>
            <li>cookie necessari al mantenimento dello stato di login</li>
          </ul>

          <p className="leading-relaxed">
            Questi cookie non raccolgono informazioni a fini di marketing o
            profilazione.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            3. Cookie di terze parti
          </h2>
          <p className="leading-relaxed mb-3">
            Il sito può utilizzare servizi di terze parti (es. hosting e
            analytics tecnici) che possono impostare cookie o strumenti simili
            per finalità esclusivamente tecniche e statistiche aggregate.
          </p>
          <p className="leading-relaxed">
            Non vengono utilizzati cookie di profilazione o pubblicitari.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            4. Consenso
          </h2>
          <p className="leading-relaxed">
            Poiché ReadIt utilizza solo cookie tecnici, non è richiesto il
            consenso preventivo dell'utente ai sensi della normativa vigente.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            5. Gestione dei cookie
          </h2>
          <p className="leading-relaxed mb-3">
            L'utente può gestire o disabilitare i cookie direttamente tramite le
            impostazioni del proprio browser.
          </p>
          <p className="leading-relaxed">
            La disabilitazione dei cookie tecnici potrebbe compromettere il
            corretto funzionamento del sito.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            6. Modifiche alla Cookie Policy
          </h2>
          <p className="leading-relaxed">
            La presente Cookie Policy può essere aggiornata in qualsiasi
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
