import React, { useRef} from "react";
import { Box, Drawer, Paper, Typography, Grid, Button } from "@mui/material";
import { toast } from "react-toastify";

const DrawerShow = ({children, isShowDrawer, setIsShowDrawer, anchor = 'right' }) => {
  const ref = useRef();

  return (
    <Drawer
      open={isShowDrawer}
      anchor={anchor}
      onClose={() => setIsShowDrawer(!isShowDrawer)}
      modal
      sx={{ zIndex: 100000 }}
    >
      {children}
    </Drawer>
  );
};

export default DrawerShow;
