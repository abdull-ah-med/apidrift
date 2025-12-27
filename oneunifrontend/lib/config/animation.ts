export const ENABLE_ANIMATIONS = true;

export const listAnimations: any = {
  container: ENABLE_ANIMATIONS ? { layout: true } : {},
  card: ENABLE_ANIMATIONS ? {
    layout: true,
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, transition: { duration: 0.1 } },
    transition: { duration: 0.2 }
  } : {},
  emptyState: ENABLE_ANIMATIONS ? {
    initial: { opacity: 0 },
    animate: { opacity: 1 }
  } : {}
};
