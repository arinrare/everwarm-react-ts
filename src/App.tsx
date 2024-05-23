import React, {useEffect} from 'react';
import './App.css';
import Home from './pages/home/home';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import ReactGA from 'react-ga4';

const TrackingID = 'G-FKJK7PJ0VH';

function App() {
  useEffect(() => {
    document.title = 'Everwarm Fuel Merchants';
    ReactGA.initialize(TrackingID);
  }, []);
  
  /* basename="/portfolio/everwarm-react-ts" */
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
