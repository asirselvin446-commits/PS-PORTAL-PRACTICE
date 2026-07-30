import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.type === 'cancelation' && event.reason.msg === 'operation is manually canceled') {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <App />
);
