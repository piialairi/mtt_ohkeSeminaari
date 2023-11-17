import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import { Toolbar } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const mttLogo1 = 'src/images/mttLogo1.jpg';
const mttLogo2 = 'src/images/mttLogo2.jpg';


function TabMUI() {
  const [value, setValue] = useState(0);
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const random = Math.random();
    const selectedLogo = random < 0.5 ? mttLogo1 : mttLogo2;

    setLogo(selectedLogo);
}, [])

  const handleChange = (e, val) => {
    setValue(val);
  }
  
  return (
    <>
      <AppBar position='sticky' sx={{mt:0, mb:'36px'}}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, justifyContent: 'space-between'}}>
            {logo && <img src={logo} alt="MTT Logo" style={{ height: '150px', width: 'auto', marginTop:"5px"}} />}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
          <Tabs value={value} onChange={handleChange} variant='fullWidth' centered selectionFollowsFocus textColor='inherit' TabIndicatorProps={{ style: { background: 'white' } }}>
              <Tab label='Home' component={Link} to='/'/>
              <Tab label='My events'component={Link} to='myevents'/>
            </Tabs>
            </Box>
          <Box>
            <a href="/login">
              <button title="Log in">Log in</button>
            </a>
          </Box>
        </Toolbar>  
      </AppBar>
      <Outlet/>
    </>
  )
}
export default TabMUI;