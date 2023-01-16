export function makeImagePath(id: string, format?: string) {
  if (id === null) {
    return "https://cdn.icon-icons.com/icons2/510/PNG/512/image_icon-icons.com_50366.png";
  }
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 10,
    y: -70,
    scale: 1.6,
    transition: { delay: 0.5, duration: 0.3 },
  },
};

export const infoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.3 },
  },
};

export const rowVarients = {
  hidden: (options: { windowWidth: number; Back: boolean }) => ({
    x: options.Back ? -options.windowWidth + 10 : options.windowWidth + 10,
  }),
  visible: {
    x: 0,
  },
  exit: (options: { windowWidth: number; Back: boolean }) => ({
    x: options.Back ? options.windowWidth - 10 : -options.windowWidth - 10,
  }),
};

export const offset = 6;
