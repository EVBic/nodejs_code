import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import ContactList from './components/ContactList'

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="nav-tabs d-flex bg-rgb(11, 59, 23)">
          <ul>
            <li>
              <div className="leftContainer">
                {' '}
                <Link
                   style={{ textDecoration: 'none', fontWeight: '600', color:'black' }}
                   to="/"
                 >
                   <img src={`casa.png`} alt="HomePic" style={{ width: '18px', justifyItems: 'center' }} />
                   <br/>
                   Home 
                                   </Link>{' '}
                 <Link
                   style={{ textDecoration: 'none', fontWeight: '600', color:'black' }}
                   to="/contacts"
                 >
                   <img src={`contacts black.jpg`} alt="ContactsPic" style={{ width: '25px', fill: 'rgb(45, 131, 79)'}} />
                   <br/>
                   Contacts
                </Link>
              </div>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/" />
        </Routes>
      </div>
    </Router>
  )
}

export default App
