import styled from '@emotion/styled';

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
  border-bottom: 2px solid #000;
`;

export const AddBtn = styled('button')`
  display: inline-block;
  margin-left: 30px;
  height: 40px;
  background: #e1e1e1;
  border-radius: 4px;
  border: 1px solid #000;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
`;

export const Description = styled('p')`
  margin-bottom: 40px;
`;

export const CardContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 10px;
`;

export const CardBox = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  border: 1px solid #000;
  border-radius: 4px;
`;

export const CardTxt = styled('span')`
  margin: 10px 0;
`;

export const BtnConsole = styled('div')`
  display: flex;
  width: 50%;
  justify-content: space-between;
`;

export const UpdateBtn = styled('button')`
  padding: 10px 10px;
  background: #e1e1e1;
  border-radius: 4px;
  border: 1px solid #000;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
`;

export const DeleteBtn = styled('button')`
  padding: 10px 10px;
  background: #e1e1e1;
  border-radius: 4px;
  border: 1px solid #000;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
`;

export const FormContainer = styled('form')`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  width: 400px;
`;

export const FieldBox = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const Label = styled('label')`
  width: 120px;
  margin-right: 30px;
  font-size: 20px;
  text-align: center;
`;

export const TextField = styled('input')`
  width: 200px;
  height: 20px;
`;

export const SubmitBtn = styled('button')`
  padding: 20px 20px;
  font-size: 20px;
`;
