import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TabMUI from './navigation/TabMUI';
import FrontPage from './components/FrontPage';
import MyEvents from './components/MyEvents';
import LoginPage from './components/Login';
import EventDetail from './components/EventDetails';

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
          <Route path='myevents' element={<MyEvents />} />      
          <Route path='login' element={<LoginPage />} /> 
          <Route path='event/:eventId' element={<EventDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App
