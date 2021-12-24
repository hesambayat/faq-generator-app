const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="editor__menu">
      <div className="editor__menu__marks">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          Underline
        </button>
      </div>
      <div className="editor__menu__utilities">
        <button onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
          clear
        </button>
      </div>
    </div>
  )
}

export default MenuBar
