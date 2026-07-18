export const LegalPageLayout = ({ title, children }) => (
  <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-12">
    <h1 className="text-h1 text-text mb-8 text-center">{title}</h1>

    {children}

    <div className="text-center mt-12 pt-8 border-t border-border">
      <p className="text-sm text-text-3">
        Ultimo aggiornamento: {new Date().toLocaleDateString("it-IT")}
      </p>
    </div>
  </div>
);
