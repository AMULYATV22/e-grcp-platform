import { Suspense, useMemo } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import AppRoutes from "./routes/AppRoutes";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { useAppSelector } from "./hooks/reduxHooks";
import { selectDarkMode } from "./app/uiSlice";

function App() {
  const darkMode = useAppSelector(selectDarkMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: {
            main: darkMode ? "#90caf9" : "#1976d2",
          },
          background: {
            default: darkMode ? "#121212" : "#f5f7fb",
            paper: darkMode ? "#1e1e1e" : "#ffffff",
          },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRoutes />
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;