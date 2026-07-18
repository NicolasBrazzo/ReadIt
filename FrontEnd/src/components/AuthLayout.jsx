export const AuthLayout = ({ tagline, children }) => (
  <div className="flex-1 lg:grid lg:grid-cols-2">
    <div className="hidden lg:flex flex-col justify-center gap-6 bg-surface-2 px-16 relative overflow-hidden">
      <div className="circle w-16 h-16 absolute -top-8 -left-8 opacity-80"></div>
      <h2 className="font-black text-text text-6xl tracking-tight relative">
        Read<span className="text-accent">-It</span>
      </h2>
      <p className="text-text-2 text-lead max-w-sm relative">{tagline}</p>
    </div>

    <div className="flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
      <div className="w-full max-w-[500px] flex flex-col gap-6">{children}</div>
    </div>
  </div>
);
