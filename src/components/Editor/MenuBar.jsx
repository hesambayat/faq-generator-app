import { useMemo } from 'react'
import MenuBarIcon from './MenuBarIcon'

const shortcuts = {
  bold: {
    'Mac': '⌘+B',
    'Windows': 'Ctrl+B',
    'Linux': 'Ctrl+B',
  },
  italic: {
    'Mac': '⌘+I',
    'Windows': 'Ctrl+I',
    'Linux': 'Ctrl+I',
  },
  underline: {
    'Mac': '⌘+U',
    'Windows': 'Ctrl+U',
    'Linux': 'Ctrl+U',
  },
  clear: {
    'Mac': '⌘+\\',
    'Windows': 'Ctrl+\\',
    'Linux': 'Ctrl+\\',
  }
}

const MenuBar = ({ editor }) => {
  const os = useMemo(() => {
    const platforms = ['Mac', 'Windows', 'Linux']
    return platforms.find(platform => window.navigator.userAgent.includes(platform))
  }, [])
  const boldTitle = useMemo(() => {
    const shortcut = shortcuts.bold[os]
    if (shortcut !== undefined) {
      return (
        <>
          <strong>Bold</strong>
          <span className="shortcut">{shortcut}</span>
        </>
      )
    }
    return <strong>Bold</strong>
  }, [os])
  const italicTitle = useMemo(() => {
    const shortcut = shortcuts.italic[os]
    if (shortcut !== undefined) {
      return (
        <>
          <i>Italic</i>
          <span className="shortcut">{shortcut}</span>
        </>
      )
    }
    return <i>Italic</i>
  }, [os])
  const underlineTitle = useMemo(() => {
    const shortcut = shortcuts.underline[os]
    if (shortcut !== undefined) {
      return (
        <>
          <u>Underline</u>
          <span className="shortcut">{shortcut}</span>
        </>
      )
    }
    return <u>Underline</u>
  }, [os])
  const clearTitle = useMemo(() => {
    const shortcut = shortcuts.clear[os]
    if (shortcut !== undefined) {
      return (
        <>
          Clear formatting
          <span className="shortcut">{shortcut}</span>
        </>
      )
    }
    return 'Clear formatting'
  }, [os])

  if (!editor) {
    return null
  }

  return (
    <div className="editor__menu">
      <div className="editor__menu__marks">
        <MenuBarIcon
          menuId="bold"
          title={boldTitle}
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <MenuBarIcon
          menuId="italic"
          title={italicTitle}
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <MenuBarIcon
          menuId="underline"
          title={underlineTitle}
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
      </div>
      <div className="editor__menu__utilities">
        <MenuBarIcon
          menuId="clear"
          title={clearTitle}
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
        />
      </div>
    </div>
  )
}

export default MenuBar
