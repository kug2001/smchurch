import { FC, useEffect, useRef } from 'react';
import Editor from '@toast-ui/editor';
import type { EditorCore } from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { editorOptions } from '@/components/block/editor/options';

export interface BoardEditorProps {
  onChangeEditor: (mdContent: string) => void;
  initMdContent?: string;
}
export const BoardEditor: FC<BoardEditorProps> = props => {
  const { onChangeEditor, initMdContent } = props;
  const editorInstance = useRef<EditorCore | null>(null);
  const editorRef = useRef(null);

  const handleOnChange = () => {
    const mdContent = editorInstance.current?.getMarkdown();
    if (mdContent) {
      onChangeEditor(mdContent);
      return;
    }
  };

  useEffect(() => {
    if (window && editorRef.current) {
      editorInstance.current = new Editor({
        ...editorOptions,
        el: editorRef.current as HTMLElement,
        initialValue: initMdContent || '텍스트를 입력하세요',
        events: {
          change: handleOnChange
        }
      });
    }
  }, []);

  return <div id="#editor" ref={editorRef} />;
};
