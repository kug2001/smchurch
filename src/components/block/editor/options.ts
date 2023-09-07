import { EditorOptions } from '@toast-ui/editor';

export const editorOptions: Partial<EditorOptions> = {
  height: '400px',
  usageStatistics: false,
  language: 'ko-KR',
  initialEditType: 'wysiwyg',
  hideModeSwitch: true,
  toolbarItems: [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'indent', 'outdent'],
    ['table', 'link']
  ]
};
