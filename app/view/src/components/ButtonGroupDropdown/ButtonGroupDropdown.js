import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import { Theme } from '@mui/material';
// import { makeStyles } from '@mui/material';

// const useStyles = makeStyles((theme) => ({
//     menu: {
//       "& .MuiPaper-root": {
//         backgroundColor: "lightblue"
//       } 
//     }
//   }));

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event,url) => {
    console.log(event)
    if(url!=undefined && String(url).length>0){
        window.open(url,'_blank')
    }
    
    setAnchorEl(null);
  };

  return (
    <div className='pull-right'>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        // style={{color:'white !important'}}
        color="info"
        variant='contained'
      >
        Camera View
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        // onClose={handleClose}
        onClick={handleClose}
        // classes={{ paper: classes.menuPaper }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'primary',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={(event)=>handleClose(event,'https://play.google.com/store/apps/details?id=com.hikvision.convergence')}>Android</MenuItem>
        <MenuItem onClick={(event)=>handleClose(event,'https://apps.apple.com/us/app/hik-connect-for-end-user/id1087803190')}>IOS</MenuItem>
      </Menu>
    </div>
  );
}