
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Content from './component/Content';
import About from './component/About';

function App() {
  return (
    <div className='container' >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Content />} />
          <Route path='about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
