import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

export const useHomeAnimations = () => {
  useGSAP(() => {
    gsap.from("#title", {
      opacity: 0,
      duration: 1,
      y: -50,
    });

    gsap.from("#designedBy", {
      duration: 1,
      opacity: 0,
      delay: 0.5,
      x: -500,
      ease: "power3.inOut",
    });

    gsap.from(".circle", {
      opacity: 0,
      duration: 1,
      y: -500,
      ease: "back.inOut",
    });

    gsap.fromTo(
      ".fade-scroll",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: "#usage-section",
          start: "top center", 
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);
};
