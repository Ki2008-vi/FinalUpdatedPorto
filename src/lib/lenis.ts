import Lenis from "lenis";
import { gsap } from "./gsap";

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    syncTouch: true,
  });

  // Connect Lenis RAF loop to GSAP ticker
  const onTick = (time: number) => {
    lenis.raf(time * 1000);
  };
  
  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  return {
    lenis,
    destroy: () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    }
  };
}
