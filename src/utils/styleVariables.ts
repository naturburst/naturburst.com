// src/utils/styleVariables.ts

/**
 * Font family variables to ensure consistent typography across all components
 */
export const fonts = {
  primary: 'var(--font-primary)',
  secondary: 'var(--font-secondary)'
};

/**
 * Font weight variables for consistency
 */
export const fontWeights = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800
};

/**
 * Function to generate consistent typography styles
 */
export const getTypographyStyle = (
  fontFamily: 'primary' | 'secondary' = 'primary',
  weight: 400 | 500 | 600 | 700 | 800 = 400,
  size: string = '1rem',
  letterSpacing: string = 'normal'
) => `
  font-family: ${fonts[fontFamily]};
  font-weight: ${weight};
  font-size: ${size};
  letter-spacing: ${letterSpacing};
`;