import styled from "styled-components";
import {Button, Modal} from "@mui/material";
import {COLORS} from "../../constants/Color";
import CloseIcon from '@mui/icons-material/Close';

const ContainerModal = styled.div`
  min-width: ${({width}) => width ? width : '700px'};
  min-height: ${({height}) => height ? height : 'auto'};
  background-color: ${COLORS.Background};
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 16px;
  transform: translate(-50%, -50%);
  border: 2px solid #000;
  border-radius: 16px;
  boxShadow: 24;
`
const ButtonContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`

export const ModalStyled = ({width, children, open = false, closeButton, ...props}) => {
  return <Modal {...props} open={open}>
    <ContainerModal width={width}>
      <ButtonContainer>
        <Button color={'error'} onClick={closeButton}>
          <CloseIcon color={'error'}/>
        </Button>
      </ButtonContainer>
      {children}
    </ContainerModal>
  </Modal>
}
