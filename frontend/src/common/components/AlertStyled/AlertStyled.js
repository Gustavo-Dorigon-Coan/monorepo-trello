import {Alert, Slide, Snackbar} from "@mui/material";
import React from "react";
import styled from "styled-components";
import {COLORS} from "../../constants/Color";

function TransitionLeft(props) {
  return <Slide {...props} style={{boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.68)', border: `1px solid ${COLORS.Light}`}} direction="top" />;
}

const SnackbarStyled = styled(Snackbar)`
  position: absolute;
  top: 40px !important;
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

export const AlertStyled = ({alert, setAlert}) => {
  return <SnackbarStyled
    autoHideDuration={6700}
    transitionDuration={600}
    open={alert.open}
    onClose={() => setAlert({...alert, open: false})}
    TransitionComponent={TransitionLeft}
    spacing={2}>
    <Alert severity={alert?.severity} style={{width: '100%'}} onClose={() => setAlert({...alert, open: false})}>
      {alert?.message}
    </Alert>
  </SnackbarStyled>
}