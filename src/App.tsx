import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import AppRoutes from "./AppRoutes";
import theme from "./theme";
import { AuthProvider } from "@contexts/authContext";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* This applies baseline CSS for consistent styling */}
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
