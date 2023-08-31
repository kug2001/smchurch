'use client';
import { BaseSyntheticEvent, Dispatch, FC, SetStateAction } from 'react';
import { ContentBlock, EditorState, RichUtils } from 'draft-js';
import {
  EditorConsole,
  EditorContainer,
  EditorModule,
  InlineBtn,
  WrapEditor
} from '@/components/block/editor/Editor.styles';

interface EditorProps {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
}

export const Editor: FC<EditorProps> = props => {
  const { editorState, setEditorState } = props;

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const myBlockStyleFn = (contentBlock: ContentBlock) => {
    return contentBlock.getType();
    // return type;
  };

  const onBold = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };
  const onItalic = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setEditorState(() => RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const onUnderline = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const onHeadingOne = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setEditorState(() => RichUtils.toggleBlockType(editorState, 'header-one'));
  };

  const onHeadingTwo = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, 'header-two'));
  };

  const onHeadingThree = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, 'header-three'));
  };

  return (
    <EditorContainer>
      <EditorConsole>
        <InlineBtn onClick={onHeadingOne}>H1</InlineBtn>
        <InlineBtn onClick={onHeadingTwo}>H2</InlineBtn>
        <InlineBtn onClick={onHeadingThree}>H3</InlineBtn>
        <InlineBtn onClick={onBold}>Bold</InlineBtn>
        <InlineBtn onClick={onItalic}>Italic</InlineBtn>
        <InlineBtn onClick={onUnderline}>Underline</InlineBtn>
      </EditorConsole>
      <WrapEditor>
        <EditorModule
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          blockStyleFn={myBlockStyleFn}
        />
      </WrapEditor>
    </EditorContainer>
  );
};
