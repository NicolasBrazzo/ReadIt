import "../slider.css";
import { Navbar } from "../components/Navbar";
import { MoveRight } from "lucide-react";
import { useHomeAnimations } from "../hooks/useAnimations";
import { useRef } from "react";
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

  return (
    <div className="flex flex-col">
      <Navbar />

      <div
        className="flex-1 relative flex-center-col gap-7 mb-8 min-h-[80vh]"
        id="hero-section"
      >
        <div className="relative">
          <p
            id="designedBy"
            className="font-mono uppercase tracking-wide text-[12px] sm:text-[14px] lg:text-[16px] text-text-3 absolute -top-6 sm:left-5 md:-top-6 md:left-5"
          >
            Designed by Brz
          </p>

          <h1 className="font-black text-text w-fit text-7xl sm:text-8xl md:text-9xl lg:text-[140px] px-4 tracking-tight">
            Read-It
          </h1>

          <div className="circle w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 absolute -top-5 -right-2 md:-top-6 md:-right-10 lg:top-0 lg:-right-16"></div>
        </div>
        <p className="text-text font-medium text-xl px-4 sm:px-10 md:text-[30px] text-center mt-4">
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
              document
                .getElementById("slider-section")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            ref={movePageButtonRef}
            id="move-page-button"
            className="circle-cta rotate-90 h-20 w-20 md:h-25 md:w-25 flex-center-center shadow-2"
          >
            <MoveRight className="text-accent-contrast" />
          </button>
        </div>
      </div>

      <Slider />
      <UsageSection />
      <Footer />
    </div>
  );
};
