import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './routes/Home';
import CryptoDetails from './components/CryptoDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cryptocurrency/:id" element={<CryptoDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
