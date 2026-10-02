import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AuthPreview from './AuthPreview.jsx'
import './styles.css'

const isAuthPreview = window.location.pathname.replace(/\/$/, '') === '/auth-preview'
createRoot(document.getElementById('root')).render(isAuthPreview ? <AuthPreview /> : <App />)
