import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import './styles/typography.css'
import './styles/components.css'

// Disable browser scroll restoration so the page always starts at the top
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

console.log('main.jsx: Starting...')

const rootElement = document.getElementById('root')
console.log('main.jsx: Root element found?', !!rootElement)

if (!rootElement) {
  console.error('main.jsx: Root element not found!')
  document.body.innerHTML = '<h1>ERROR: Root element not found</h1>'
} else {
  try {
    const root = ReactDOM.createRoot(rootElement)
    console.log('main.jsx: React root created')

    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
    console.log('main.jsx: React rendered successfully')
  } catch (err) {
    console.error('main.jsx: Error rendering:', err)
    document.body.innerHTML = '<h1>ERROR: ' + err.message + '</h1>'
  }
}
