// import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
// import './App.css'
// import Footer from './components/Footer'
// import Navbar from './components/Navbar'
// import Add from './pages/Add'
// import View from './pages/View'
// import Home from './pages/Home'
// import Edit from './pages/Edit'
// import Login from './pages/Login'
// import Register from './pages/Register'

// function App() {

//   const location = useLocation();

//   // Check if the current route is either login or register
//   const isAuthPage = ['/login', '/register'].includes(location.pathname);


//   return (
//     <div className='App'>
      
//       {!isAuthPage && <Navbar />}

//       <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<Login />} />
//           <Route path='/register' element={<Register />} />
//           <Route path='/home' element={<Home />} />
//           <Route path='/add' element={<Add />} />
//           <Route path='/view/:id' element={<View />} />
//           <Route path='/edit/:id' element={<Edit />} />
//         </Routes>
//       </BrowserRouter>

//       {!isAuthPage && <Footer />}





//     </div>
//   )
// }

// export default App





import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Add from './pages/Add';
import View from './pages/View';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  // Check if the current route is either login or register
  const isAuthPage = ['/', '/register'].includes(location.pathname);

  return (
    <div className='App'>
      {/* Conditionally render Navbar based on the current route */}
      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/add' element={<Add />} />
        <Route path='/view/:id' element={<View />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>

      {/* Conditionally render Footer based on the current route */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;

