import { Drawer } from '@mui/material';
import React from 'react'

const TransactionMenu = () => {
  const menuDrawerWidth = 320;
  return (
    <Drawer 
      sx={{
        width: menuDrawerWidth,
        "& .MuiDrawer-paper": {
          width: menuDrawerWidth,
          boxSizing: 'border-box',
          p: 2,
          top:
        },
      }}
    />
  )
}

export default TransactionMenu