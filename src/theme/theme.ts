import { createTheme, PaletteColor } from "@mui/material";
import { blue, green, red, amber, deepPurple, indigo, teal, pink } from "@mui/material/colors";

declare module '@mui/material/styles' {
  interface Palette {
    incomeColor: PaletteColor;
    expenseColor: PaletteColor;
    balanceColor: PaletteColor;

    // カテゴリごとの色を追加
    incomeCategoryColor: Record<string, string>;
    expenseCategoryColor: Record<string, string>;
  }

  interface PaletteOptions {
    incomeColor?: PaletteOptions['primary'];
    expenseColor?: PaletteOptions['primary'];
    balanceColor?: PaletteOptions['primary'];

    incomeCategoryColor?: Record<string, string>;
    expenseCategoryColor?: Record<string, string>;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: 'Noto Sans Jp, Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  palette: {
    incomeColor: {
      main: blue[500],
      light: blue[100],
      dark: blue[700],
    },
    expenseColor: {
      main: red[500],
      light: red[100],
      dark: red[700],
    },
    balanceColor: {
      main: green[500],
      light: green[100],
      dark: green[700],
    },

    // カテゴリカラーを追加
    incomeCategoryColor: {
      給与: blue[500],
      副収入: teal[400],
      お小遣い: indigo[300],
    },
    expenseCategoryColor: {
      食費: red[400],
      日用品: pink[300],
      住居費: deepPurple[300],
      交際費: amber[600],
      交通費: blue[300],
      娯楽: green[400],
    },
  },
});
