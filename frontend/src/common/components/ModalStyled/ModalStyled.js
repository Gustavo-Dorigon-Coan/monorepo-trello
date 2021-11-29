import styled from "styled-components";
import {Button, Modal} from "@mui/material";
import {COLORS} from "../../constants/Color";
import CloseIcon from '@mui/icons-material/Close';
import {useEffect} from "react";

const ContainerModal = styled.div`
  min-width: ${({width}) => width ? width : '700px'};
  width: ${({width}) => width ? width : 'auto'};
  min-height: ${({height}) => height ? height : '35px'};
  background-color: ${COLORS.Background};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid ${COLORS.ContrastLight};
  border-radius: 8px;
  boxShadow: 24;
`

const ContainerChildren = styled.div`
  margin: 16px;
`

const ButtonContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`

export const ModalStyled = ({width, children, open = false, closeButton, ...props}) => {
  return <Modal {...props} open={open}>
    <ContainerModal width={width}>
      {Boolean(closeButton) && <ButtonContainer>
        <Button color={'error'} onClick={closeButton}>
          <CloseIcon color={'error'}/>
        </Button>
      </ButtonContainer>}
      <ContainerChildren>
        {children}
      </ContainerChildren>
    </ContainerModal>
  </Modal>
}
