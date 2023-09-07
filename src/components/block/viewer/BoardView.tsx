import { FC, useEffect, useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import { viewerOptions } from '@/components/block/viewer/options';

interface BoardViewProps {
  mdContent: string;
}

export const BoardView: FC<BoardViewProps> = props => {
  const { mdContent = '#No content' } = props;
  const viewerInstance = useRef<any>(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    if (viewerRef.current) {
      viewerInstance.current = new Viewer({
        ...viewerOptions,
        el: viewerRef.current as HTMLElement,
        initialValue: mdContent
      });
    }
  }, []);
  return <div ref={viewerRef} />;
};
