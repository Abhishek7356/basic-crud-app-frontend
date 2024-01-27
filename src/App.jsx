import { useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Item from './pages/Item/Item';

function App() {
  const [status, setStatus] = useState(false)
  return (
    <div className="outercontainer bg-light">
      <Header status={status} setStatus={setStatus} />
      <Routes>
        <Route path='/' element={<Home status={status} />} />
        <Route path='/item/:id' element={<Item />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
