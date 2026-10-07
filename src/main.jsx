import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import App from './App.jsx'
import AuthPreview from './AuthPreview.jsx'
import './styles.css'

const isAuthPreview = window.location.pathname.replace(/\/$/, '') === '/auth-preview'
createRoot(document.getElementById('root')).render(
	isAuthPreview ? <AuthPreview /> : (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/community" element={<App />} />
				<Route path="/broker" element={<App />} />
				<Route path="/tenant" element={<App />} />
				<Route path="/platform/:audience" element={<App />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	)
)
