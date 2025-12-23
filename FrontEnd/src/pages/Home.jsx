import "../fonts.css";
import "../slider.css";
import { Navbar } from "../components/Navbar";
import { MoveRight } from "lucide-react";
import { useHomeAnimations } from "../hooks/useAnimations";
import { useRef, useState } from "react";
import { useMoveButtonAnimation } from "../hooks/useMoveButtonAnimation";
import { Slider } from "../components/Slider";
import { UsageSection } from "../components/UsageSection";
import { Footer } from "../components/Footer";

export const Home = () => {
  useHomeAnimations();

  const containerMovePageButtonRef = useRef(null);
  const movePageButtonRef = useRef(null);
  useMoveButtonAnimation({
    containerRef: containerMovePageButtonRef,
    buttonRef: movePageButtonRef,
  });

  const [sideSelected, setSideSelected] = useState(0);

  return (
    <div className="flex flex-col">
      {/* <div className="fixed border top-[50%] -translate-y-[50%] h-30 flex flex-col items-center justify-between mx-10 z-50">
        <button
          onClick={() => {
            setSideSelected(0);
            document
              .getElementById("hero-section")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`w-5 h-5 hover:w-6 hover:h-6 transition-all duration-150 ${sideSelected === 0 ? "bg-primary" : "bg-slate-400"} rounded-full`}
        />

        <button
          onClick={() => {
            setSideSelected(1);
            document
              .getElementById("usage-section")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`w-5 h-5 hover:w-6 hover:h-6 transition-all duration-150 ${sideSelected === 1 ? "bg-primary" : "bg-slate-400"} rounded-full`}
        />
  
        <button
          onClick={() => {
            setSideSelected(2);
            document
              .getElementById("footer")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`w-5 h-5 hover:w-6 hover:h-6 transition-all duration-150 ${sideSelected === 2 ? "bg-primary" : "bg-slate-400"} rounded-full`}
        />
      </div> */}

      <Navbar />

      <div
        className="flex-1 relative flex flex-col items-center gap-7 justify-center mb-8 min-h-[80vh]"
        id="hero-section"
      >
        <div className="relative">
          <p
            id="designedBy"
            className="text-[14px] sm:text-[17px] lg:text-[22px] zen-dots absolute -top-6 sm:left-5 md:-top-6 md:left-5"
          >
            Designed by Brz
          </p>

          <h1 className="zen-dots w-fit text-7xl sm:text-8xl md:text-9xl lg:text-[140px] px-4">
            Read-It
          </h1>

          <div className="circle w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 absolute -top-5 -right-2 md:-top-6 md:-right-10 lg:top-0 lg:-right-16"></div>
        </div>
        <p className="comfoorta text-xl px-4 sm:px-10 md:text-[30px] text-center mt-4">
          Welcome to the new application, where reading becomes a delightful
          experience.
        </p>

        <div
          ref={containerMovePageButtonRef}
          id="container-move-page-button"
          className="w-[80vw] absolute bottom-0 flex justify-end"
        >
          <button
            onClick={() => {
              window.location.href;
            }}
            ref={movePageButtonRef}
            id="move-page-button"
            className="circle-cta rotate-90 h-20 w-20 md:h-25 md:w-25 flex-center-center"
          >
            <MoveRight className="text-black" />
          </button>
        </div>
      </div>

      <Slider />
      <UsageSection />
      <Footer />
    </div>
  );
};
