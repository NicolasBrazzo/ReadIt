export const Loader = ({ fullscreen = false }) => {
  return (
    <div
      className={`flex-center-center ${
        fullscreen ? "fixed inset-0 bg-black z-50" : "w-full py-12"
      }`}
    >
      <div className="relative w-12 h-12">
        {/* Outer ring */}
        <span
          className="absolute inset-0 rounded-full border-2 border-white/10"
        />
        {/* Spinning arc */}
        <span
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin"
        />
        {/* Inner dot */}
        <span
          className="absolute inset-[18px] rounded-full bg-primary opacity-80"
        />
      </div>
    </div>
  );
};
