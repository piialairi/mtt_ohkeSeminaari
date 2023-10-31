import { Typography, Button, TextField } from '@mui/material';
import { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // You can add the login logic here, e.g., sending a request to the server.
    console.log(`Logging in with username: ${username} and password: ${password}`);
  };

  return (
    <div>
      <Typography variant="h4">Login</Typography>

      <form>
        <div>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div style={{ margin: '16px 0' }}>
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;