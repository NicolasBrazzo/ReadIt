import { LegalPageLayout } from "../components/LegalPageLayout";
import { LegalSection } from "../components/LegalSection";

export const CookiePolicy = () => {
  return (
    <LegalPageLayout title="Cookie Policy – ReadIt">
      <LegalSection title="1. Cosa sono i cookie">
        <p className="leading-relaxed">
          I cookie sono piccoli file di testo che i siti web salvano sul
          dispositivo dell'utente per garantire il corretto funzionamento
          delle pagine e migliorare l'esperienza di navigazione.
        </p>
      </LegalSection>

      <LegalSection title="2. Tipologie di cookie utilizzati">
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
      </LegalSection>

      <LegalSection title="3. Cookie di terze parti">
        <p className="leading-relaxed mb-3">
          Il sito può utilizzare servizi di terze parti (es. hosting e
          analytics tecnici) che possono impostare cookie o strumenti simili
          per finalità esclusivamente tecniche e statistiche aggregate.
        </p>
        <p className="leading-relaxed">
          Non vengono utilizzati cookie di profilazione o pubblicitari.
        </p>
      </LegalSection>

      <LegalSection title="4. Consenso">
        <p className="leading-relaxed">
          Poiché ReadIt utilizza solo cookie tecnici, non è richiesto il
          consenso preventivo dell'utente ai sensi della normativa vigente.
        </p>
      </LegalSection>

      <LegalSection title="5. Gestione dei cookie">
        <p className="leading-relaxed mb-3">
          L'utente può gestire o disabilitare i cookie direttamente tramite le
          impostazioni del proprio browser.
        </p>
        <p className="leading-relaxed">
          La disabilitazione dei cookie tecnici potrebbe compromettere il
          corretto funzionamento del sito.
        </p>
      </LegalSection>

      <LegalSection title="6. Modifiche alla Cookie Policy">
        <p className="leading-relaxed">
          La presente Cookie Policy può essere aggiornata in qualsiasi
          momento. Le modifiche saranno pubblicate su questa pagina.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
};
