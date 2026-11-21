import './App.css'
import XBankForm from './components/XBankForm'
import logo from './assets/Xcellent-Bank-Secure-Logo.png'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="Xcellent Bank logo" className="app-logo" />
      </header>
      <h1>Open a New Account Today</h1>
      <XBankForm />
    </div>
  )
}

export default App
