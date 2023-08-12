import "../styles/globals.css";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

const theme = createTheme({
  typography: {
    fontFamily: "Arial",
  },
  palette: {
    mode: "light",
    primary: {
      main: "#e65100",
    },
    background: {
      default: '#D3D3D3',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
