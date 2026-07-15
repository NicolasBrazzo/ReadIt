export const Loader = ({ fullscreen = false }) => {
  return (
    <div
      className={`flex-center-center ${
        fullscreen ? "fixed inset-0 bg-bg z-50" : "w-full py-12"
      }`}
    >
      <div className="relative w-12 h-12">
        {/* Outer ring */}
        <span
          className="absolute inset-0 rounded-full border-2 border-surface-2"
        />
        {/* Spinning arc */}
        <span
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent animate-spin"
        />
        {/* Inner dot */}
        <span
          className="absolute inset-[18px] rounded-full bg-accent opacity-80"
        />
      </div>
    </div>
  );
};
