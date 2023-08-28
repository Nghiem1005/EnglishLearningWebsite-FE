import React from "react";
import { Drawer } from "@mui/material";

const DrawerShow = ({
  children,
  isShowDrawer,
  setIsShowDrawer,
  anchor = "right",
}) => {
  return (
    <Drawer
      open={isShowDrawer}
      anchor={anchor}
      onClose={() => setIsShowDrawer(!isShowDrawer)}
      modal="true"
      sx={{ zIndex: 10000 }}
    >
      {children}
    </Drawer>
  );
};

export default DrawerShow;
