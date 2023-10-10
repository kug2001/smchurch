import { ButtonGroup, styled, Button, ButtonProps } from '@mui/material';
import { AdvancedImage } from '@cloudinary/react';
// import { Button } from '@/components/atoms/button/Button';
// #9c27b0
export const InnerContainer = styled('div')`
  padding: 40px 40px;
`;

export const Title = styled('strong')`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: 700;
  color: #9c27b0;
  border-bottom: 2px solid rgba(156, 39, 176, 0.5);
`;

export const AddBtn = styled((props: ButtonProps) => (
  <Button variant={'outlined'} color={'secondary'} {...props} />
))`
  display: inline-block;
  margin-left: 30px;
`;

export const Description = styled('p')`
  margin-bottom: 40px;
  color: #9c27b0;
`;

export const CardContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
`;

export const CardBox = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  border: 1px solid #9c27b0;
  border-radius: 4px;
`;

export const NewFamilyIma = styled(AdvancedImage)`
  border-bottom: 1px solid #9c27b0;
`;

export const CardTxt = styled('span')`
  margin: 10px 0;
`;

export const BtnConsole = styled(ButtonGroup)``;

export const UpdateBtn = styled((props: ButtonProps) => (
  <Button variant={'outlined'} color={'secondary'} {...props} />
))``;

export const DeleteBtn = styled((props: ButtonProps) => (
  <Button variant={'outlined'} color={'secondary'} {...props} />
))``;

export const FormContainer = styled('form')`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 0;
`;

export const FieldBox = styled('div')`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const WrapEditor = styled('div')`
  width: 100%;
  > div {
    height: 400px;
  }
`;

export const Label = styled('label')`
  width: 200px;
  margin-right: 30px;
  font-size: 20px;
  text-align: center;
`;

export const TextField = styled('input')`
  width: 200px;
  height: 20px;
  padding: 10px 10px;
  border: 1px solid #999;
  border-radius: 8px;
`;

export const TextArea = styled('textarea')`
  width: 800px;
  height: 200px;
  padding: 10px 10px;
  border: 1px solid #999;
  border-radius: 8px;
`;

export const SubmitBtn = styled('button')`
  padding: 10px 20px;
  font-size: 20px;
  color: #9c27b0;
  border: 1px solid #9c27b0;
  border-radius: 4px;
  background-color: #fff;
`;

export const TableContainer = styled('div')``;

export const Table = styled('table')`
  display: table;
  width: 100%;
  border: 1px solid #ccc;
  border-collapse: collapse;
`;

export const Thead = styled('thead')``;
export const Tbody = styled('tbody')``;
export const Th = styled('th')`
  padding: 10px 0;
  border: 1px solid #9c27b055;
  font-size: 1.2rem;
  font-weight: 600;
  color: #9c27b0dd;
  background: #9c27b033;
  &.testimony {
    :nth-of-type(1) {
      width: 10%;
    }
    :nth-of-type(2) {
      width: 10%;
    }
    :nth-of-type(3) {
      width: 10%;
    }
    :nth-of-type(4) {
      width: 55%;
    }
    :nth-of-type(5) {
      width: 15%;
    }
  }
  &.board {
    :nth-of-type(1) {
      width: 10%;
    }
    :nth-of-type(2) {
      width: 50%;
    }
    :nth-of-type(3) {
      width: 10%;
    }
    :nth-of-type(4) {
      width: 10%;
    }
  }
`;
export const HeaderTr = styled('tr')``;
export const Tr = styled('tr')`
  :hover {
    background: #9c27b007;
  }
`;

export const FaceImage = styled(AdvancedImage)`
  padding: 10px 10px;
`;

export const TableBtnConsole = styled('div')`
  display: flex;
  margin: 0 20px;
  justify-content: space-between;
`;

export const Td = styled('td')`
  padding: 10px 10px;
  vertical-align: middle;
  text-align: center;
  color: #9c27b0;
  border: 1px solid #9c27b055;
  background: #9c27b010;

  :nth-of-type(4) {
    text-align: left;
  }
  :nth-of-type(5) {
    padding: 10px 0;
  }
  &.testimony {
    :nth-of-type(4) {
      overflow: hidden;
      height: 50px;
    }
  }
`;
