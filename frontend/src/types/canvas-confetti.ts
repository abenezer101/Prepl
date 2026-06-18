declare module "canvas-confetti" {
  export interface CreateConfettiOptions {
    particleCount?: number;
    spread?: number;
    startVelocity?: number;
    gravity?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    scalar?: number;
  }

  export default function confetti(
    options?: CreateConfettiOptions,
  ): Promise<null> | void;
}
