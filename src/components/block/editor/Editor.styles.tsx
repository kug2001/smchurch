import { styled } from '@mui/material';
import { Editor } from 'draft-js';

export const EditorContainer = styled('div')`
  padding: 10px 10px;
  border: 1px solid #999;
`;

export const WrapEditor = styled('div')`
  margin-bottom: 10px;
`;

export const EditorModule = styled(Editor)`
  padding: 10px 10px;
`;

export const EditorConsole = styled('div')`
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: 2px solid #d3d3d3;
  & button + button {
    margin-left: 5px;
  }
`;

export const InlineBtn = styled('button')`
  padding: 5px 5px;
  border: none;
  color: #000;
  background-color: #eee;
  transition: all ease-in 0.2s;
  &:hover {
    color: #fff;
    background-color: #999;
  }
`;
