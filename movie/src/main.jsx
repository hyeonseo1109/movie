import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx';
import { SupabaseProvider } from '../supabase/context';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SupabaseProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </SupabaseProvider>
    </BrowserRouter>
  </StrictMode>,
)
