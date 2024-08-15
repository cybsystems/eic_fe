import './App.css';

import { AuthProvider } from '@contexts/authContext';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';

import AppRoutes from './AppRoutes';
import theme from './theme';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* This applies baseline CSS for consistent styling */}
        <AppRoutes />
        <ToastContainer />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
