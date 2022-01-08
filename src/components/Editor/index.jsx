import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import useFocus from '../../hooks/useFocus'
import MenuBar from './MenuBar'

const CustomDocument = Document.extend({
  content: 'heading paragraph block*',
  addKeyboardShortcuts() {
    return {
      'Mod-\\': () => this.editor.chain().focus().unsetAllMarks().clearNodes().run(),
    }
  }
})

const Editor = (props) => {
  const [isFocused, onFocus] = useFocus(props.menuId)
  const editor = useEditor({
    onUpdate: ({ editor }) => {
      props.onChange({
        question: editor.getJSON(),
        fullText: editor.getText()
      })
    },
    onFocus,
    extensions: [
      Underline,
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        showOnlyCurrent: false,
        placeholder: ({ node, editor }) => {
          if (node.type.name === 'heading') {
            return 'Write your question here…'
          }

          return editor.getJSON()?.content?.length < 3 ? 'A short answer goes a long way…' : ''
        },
      })
    ],
    content: props.content
  })

  useEffect(() => {
    editor && editor.setEditable(props.canEdit)
  }, [editor, props.canEdit])

  useEffect(() => {
    if (editor?.isEditable && props.content === undefined) {
      editor.commands.clearContent()
    }
  }, [editor, props.content])

  return (
    <div className={`editor${isFocused ? ' editor--focused' : ''}`}>
      <EditorContent editor={editor} />
      {props.canEdit && isFocused && <MenuBar editor={editor} />}
    </div>
  )
}

export default Editor
