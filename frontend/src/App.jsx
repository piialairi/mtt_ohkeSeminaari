import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TabMUI from './navigation/TabMUI';
import FrontPage from './components/FrontPage';
import OwnEvents from './components/OwnEvents';

function App() {
  
  /* useEffect(() => {
     fetch("./api/hello")
       .then(response => response.text())
       .then(data => setHello(data));
   }, []);*/
  

  /*useEffect(() => {
    fetch("http://localhost:8080/api/events", { mode: "no-cors" })
      .then(response => response.text())
      .then(data => setEvents(data));
  }, []);*/

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TabMUI />}>
          <Route index element={<FrontPage/>}/>
          <Route path='ownevents' element={<OwnEvents />} />      
        </Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App
