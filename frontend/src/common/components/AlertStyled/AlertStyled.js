import {Alert, Slide, Snackbar} from "@mui/material";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {COLORS} from "../../constants/Color";
import {useSelector} from "react-redux";

function TransitionLeft(props) {
  return <Slide {...props} style={{boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.68)', border: `1px solid ${COLORS.ContrastLight}`}}  />;
}

const SnackbarStyled = styled(Snackbar)`
  position: absolute;
  bottom: 0 !important;
  left: 50% !important;
  width: 700px;
  height: 50px;
  transform: translate(-50%, -50%) !important;

  .MuiAlert-standardSuccess {
    background-color: #2d540a !important;
  }

  .MuiAlert-standardError {
    background-color: #540a0a !important;
  }

  .MuiAlert-standardInfo {
    background-color: #0a4b54 !important;
  }

  .MuiAlert-standardWarning {
    background-color: #54430a !important;
  }
`

export const AlertStyled = () => {
  const alert = useSelector(store => store.alertState.alert);
  const [ open, setOpen ] = useState(false);

  useEffect(() => {
    setOpen(alert.open);
  },[alert]);

  return <SnackbarStyled
    autoHideDuration={6700}
    transitionDuration={600}
    open={open}
    onClose={() => setOpen(false)}
    TransitionComponent={TransitionLeft}
    spacing={2}>
    <Alert severity={alert?.severity} style={{width: '100%'}} onClose={() => setOpen(false)}>
      {alert?.message}
    </Alert>
  </SnackbarStyled>
}