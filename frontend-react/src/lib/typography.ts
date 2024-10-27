// lib/theme.ts
export const theme = {
  colors: {
    // Text Farben
    text: "text-foreground",         // #DAF2FB
    textLight: "text-foreground/80", // #DAF2FB mit 80% Opacity
    textDark: "text-background",     // #001E27
    
    // Primäre Farben
    primary: "text-primary",         // #78D1F2
    secondary: "text-secondary",     // #101093
    accent: "text-accent",           // #5D41EC
    
    // Hintergründe
    background: "bg-background",     // #001E27
    bgPrimary: "bg-primary",        // #78D1F2
    bgSecondary: "bg-secondary",    // #101093
    bgAccent: "bg-accent",          // #5D41EC
  },

  colorSchemes: {
    // Buttons
    primaryButton: "bg-primary text-background hover:bg-primary/90",
    secondaryButton: "bg-secondary text-foreground hover:bg-secondary/90",
    accentButton: "bg-accent text-foreground hover:bg-accent/90",
    
    // Cards
    primaryCard: "bg-background text-foreground border border-primary/20",
    accentCard: "bg-background text-foreground border border-accent/20",
  },

  typography: {
    // Überschriften
    headlineMain: "font-poppins font-semibold text-3xl leading-normal", // 32px Semibold
    headline: "font-poppins font-semibold text-xl leading-normal uppercase",      // 20px Semibold
    
    // Paragraph Stile
    paragraph: "font-sourceSans3 text-base leading-normal",             // 16px Regular
    paragraphBig: "font-sourceSans3 font-semibold text-3xl leading-normal", // 32px Semibold
    
    // Button & Credentials
    buttonText: "font-poppins font-bold text-xl leading-normal",        // 20px Bold
    credentials: "font-poppins font-medium text-base leading-normal",    // 16px Medium
  }
} as const;

// TypeScript Typ-Definitionen
export type ThemeColors = keyof typeof theme.colors;
export type ThemeColorSchemes = keyof typeof theme.colorSchemes;
export type ThemeTypography = keyof typeof theme.typography;