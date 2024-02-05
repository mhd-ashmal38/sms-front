import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Add from './pages/Add'
import View from './pages/View'
import Home from './pages/Home'
import Edit from './pages/Edit'

function App() {

  return (
    <div className='App'>
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/view/:id' element={<View />} />
          <Route path='/edit/:id' element={<Edit />} />
        </Routes>
      </BrowserRouter>

      <Footer />






    </div>
  )
}

export default App
