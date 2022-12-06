import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';

import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function Header(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" style={{ marginRight: 10 }}>
            <Link to="/home">
              <img src={props.logo} alt="logo" style={{ height: '50px' }} />
            </Link>
          </Typography>
          <Typography variant="h6" component="div" style={{ marginRight: 20 }}>
            <Link to="/home">{props.title}</Link>
          </Typography>
          {props.services && props.services.map((item, index) => (
            <MenuItem key={index} sx={{ flexGrow: 1 }}>
              <Link to={{ pathname: `/solution-detail/${item.id}`, state: { Solution: item } }}>
                {item.name}
              </Link>
            </MenuItem>
          ))}
          <MenuItem>
            <a color="inherit"
              onClick={() => supabase.auth.signOut()}>
              Log out
            </a>
          </MenuItem>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
