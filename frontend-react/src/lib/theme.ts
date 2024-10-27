// src/lib/theme.ts
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
      background: "bg-[#001E27]",     // Direkte Farbangabe für Background
      bgPrimary: "bg-[#78D1F2]",      // Primary Blau
      bgSecondary: "bg-[#101093]",    // Secondary
      bgAccent: "bg-[#5D41EC]",       // Accent
    },
  
    // Vordefinierte Farbkombinationen
    colorSchemes: {
      // Buttons
      primaryButton: "bg-[#78D1F2] text-[#001E27] hover:bg-[#78D1F2]/90",
      secondaryButton: "bg-[#101093] text-[#DAF2FB] hover:bg-[#101093]/90",
      accentButton: "bg-[#5D41EC] text-[#DAF2FB] hover:bg-[#5D41EC]/90",
      
      // Cards
      primaryCard: "bg-[#001E27] text-[#DAF2FB] border border-[#78D1F2]/20",
      accentCard: "bg-[#001E27] text-[#DAF2FB] border border-[#5D41EC]/20",
    },
  
    typography: {
      // Überschriften
      headlineMain: "font-poppins font-semibold text-3xl leading-normal", // 32px Semibold
      headline: "font-poppins font-semibold text-xl leading-normal",      // 20px Semibold
      
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