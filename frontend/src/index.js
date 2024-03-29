import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthContextProvider } from './context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#121223',
    },
    secondary: {
      main: '#4A4E69',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

