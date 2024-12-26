import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // import darkmode CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import MyApolloProvider from './Providers/ApolloProvider';
import { ThemeProvider } from './Context/ThemeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MyApolloProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MyApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);

