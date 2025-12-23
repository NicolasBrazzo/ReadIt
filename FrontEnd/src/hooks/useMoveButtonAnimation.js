// hooks/useMoveButtonAnimation.js
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useMoveButtonAnimation({ containerRef, buttonRef, triggerRef } = {}) {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const container = containerRef?.current;
    const button = buttonRef?.current;
    const triggerEl = triggerRef?.current || document.querySelector("#usage-section");

    if (!button) return; // nothing to animate

    // accessibility: respect prefers-reduced-motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      let tl;
      let currentTarget = "#usage-section"; // default: when at top (hero) we want to go to usage
      let scrollTriggerInstance;

      const calcDistance = () => {
        if (!container || !button) return 0;
        // move button to the left edge of the container
        return -(container.offsetWidth - button.offsetWidth);
      };

      const buildTimeline = (distance) => {
        if (tl) {
          try {
            tl.scrollTrigger && tl.scrollTrigger.kill();
            tl.kill();
          } catch (e) {}
        }

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerEl || container,
            start: "top bottom",
            end: "center center",
            scrub: true,
            markers: false,
            invalidateOnRefresh: true,
            onUpdate: self => {
              // self.progress goes 0 -> 1 during the scroll range
              // If progress is small (near start) we assume we're still on hero: clicking should go to usage
              // If progress is large (near end) we assume we're at usage: clicking should go back to hero
              // threshold 0.5 is a simple heuristic; adjust if needed
              if (self.progress < 0.5) {
                currentTarget = "#usage-section";
              } else {
                currentTarget = "#hero-section";
              }

              // store on the button for easier debugging / CSS hooks
              try {
                button.dataset.target = currentTarget;
              } catch (e) {}
            }
          },
        });

        // first part: drop 
        tl.to(button, { y: 400, duration: 1 })
          // second part: slide to left edge of container + rotate
          .to(button, { x: distance, rotate: -90, duration: 1 });

        // keep reference to the ScrollTrigger created by timeline
        scrollTriggerInstance = tl.scrollTrigger;
      };

      let currentDistance = calcDistance();
      buildTimeline(currentDistance);

      // click handler: smooth scroll to currentTarget
      const handleClick = (e) => {
        e.preventDefault();
        const targetEl = document.querySelector(currentTarget);
        if (!targetEl) {
          // fallback: try top of page
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        // prefer smooth native scroll
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      };

      // Attach click listener
      button.addEventListener("click", handleClick);

      const ro = new ResizeObserver(() => {
        const newDistance = calcDistance();
        if (newDistance === currentDistance) return;
        currentDistance = newDistance;
        buildTimeline(currentDistance);
        // refresh ScrollTrigger to re-calc positions
        ScrollTrigger.refresh();
      });

      if (container) ro.observe(container);
      ro.observe(button);

      return () => {
        // cleanup
        button.removeEventListener("click", handleClick);
        ro.disconnect();
        if (tl) {
          try {
            tl.scrollTrigger && tl.scrollTrigger.kill();
            tl.kill();
          } catch (e) {}
        }
        if (scrollTriggerInstance) {
          try {
            scrollTriggerInstance.kill();
          } catch (e) {}
        }
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }, container || button);

    return () => {
      try {
        ctx.revert();
      } catch (e) {}
    };
  }, [containerRef, buttonRef, triggerRef]);
}
