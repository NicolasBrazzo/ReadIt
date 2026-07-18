export const LegalSection = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-h2 text-accent mb-4">{title}</h2>
    {children}
  </section>
);
