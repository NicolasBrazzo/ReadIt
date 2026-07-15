export const UsageSection = () => {
  return (
    <div id="usage-section" className="w-screen h-screen flex-center">
      <div className="bg-bg/85 backdrop-blur-sm rounded-card mx-6 md:mx-10 px-6 py-10 md:px-16 md:py-14 shadow-3 max-w-5xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-10 sm:gap-6">
          <div className="flex-1">
            <h3 className="fade-scroll font-black tracking-tight text-text text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-center sm:text-left">
              Read <br />
              is not
              <br /> death
            </h3>
          </div>
          <div className="flex-1">
            <p className="fade-scroll text-text-2 text-[16px]/8 md:text-[19px] text-center">
              Simply register and{" "}
              <span className="text-accent font-medium">set up your books</span>. If you
              keep your current page unchanged, you can easily{" "}
              <span className="text-accent font-medium">track your progress</span>. You can
              also set goals and achieve them effortlessly, turning your reading
              into a structured and rewarding experience.
            </p>
          </div>
        </div>

        <h4 className="text-center font-bold text-text mt-9 text-2xl xl:text-3xl">
          All for free
        </h4>
      </div>
    </div>
  );
};
