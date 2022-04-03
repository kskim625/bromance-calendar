import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/pages/Main';
import Previous from './components/pages/Previous';
import Next from './components/pages/Next';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/previous" element={<Previous />}></Route>
        <Route path="/next" element={<Next />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
