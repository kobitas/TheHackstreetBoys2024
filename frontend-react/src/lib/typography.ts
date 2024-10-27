export const typography = {
  // Headlines
  headlineMain: "font-poppins font-semibold text-3xl leading-normal", // 32px Semibold
  headline: "font-poppins font-semibold text-xl leading-normal",      // 20px Semibold

  // Paragraphs
  paragraph: "font-sourceSans text-base leading-normal",             // 16px Regular
  paragraphBig: "font-sourceSans font-semibold text-3xl leading-normal", // 32px Semibold

  // Button & Credentials
  buttonText: "font-poppins font-bold text-xl leading-normal",        // 20px Bold
  credentials: "font-poppins font-medium text-base leading-normal",    // 16px Medium
} as const;

// Type for typography
export type TypographyVariant = keyof typeof typography;
