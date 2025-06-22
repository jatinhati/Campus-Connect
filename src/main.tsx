import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Add error handling for root element
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

// Add error boundary for the entire app
const root = createRoot(rootElement);

// Wrap the app in a try-catch for better error reporting
try {
  console.log('Starting application render...');
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
  console.log('Application rendered successfully');
} catch (error) {
  console.error('Error rendering application:', error);
  // Render a fallback UI
  root.render(
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      color: 'red',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Something went wrong</h1>
      <p>Please check the console for more details</p>
      <pre>{error instanceof Error ? error.message : String(error)}</pre>
    </div>
  );
}