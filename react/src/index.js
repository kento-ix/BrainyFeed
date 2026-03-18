import { createRoot } from 'react-dom/client';

import App from './components/App.js';

const root = createRoot(document.getElementById('react-container'));
root.render(<App />);
