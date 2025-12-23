export const UsageSection = () => {
  return (
    <div id="usage-section" className="w-screen h-screen flex-center">
      <div>
        <div className="flex flex-col sm:flex-row items-center justify-between h-[60vh] mx-10 lg:mx-26 xl:mx-30">
          <div className="flex-1">
            <h3 className="fade-scroll zen-dots text-6xl sm:text-[65px] md:text-8xl xl:text-9xl text-center sm:text-left">
              Read <br />
              is not
              <br /> death
            </h3>
          </div>
          <div className="flex-1">
            <p className="fade-scroll comfoorta text-[18px]/9 md:text-[22px] text-center">
              Simply register and{" "}
              <span className="text-primary">set up your books</span>. If you
              keep your current page unchanged, you can easily{" "}
              <span className="text-primary">track your progress</span>. You can
              also set goals and achieve them effortlessly, turning your reading
              into a structured and rewarding experience.
            </p>
          </div>
        </div>

        <h4 className="text-center zen-dots mt-9 text-2xl xl:text-3xl">
          All for free
        </h4>
      </div>
    </div>
  );
};
