import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import { Toolbar } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

function TabMUI() {
  const [value, setValue] = useState(0);

  const handleChange = (e, val) => {
    setValue(val);
  }
  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <Box sx={{ flexGrow: 1, justifyContent: 'space-between'}}>
            <header className="header">
              <h1>MTT</h1>
            </header>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
          <Tabs value={value} onChange={handleChange} variant='fullWidth' centered selectionFollowsFocus textColor='inherit' TabIndicatorProps={{ style: { background: 'white' } }}>
              <Tab label='Etusivu' component={Link} to='/'/>
              <Tab label='Omat tapahtumat'component={Link} to='ownevents'/>
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