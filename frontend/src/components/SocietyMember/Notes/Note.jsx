import React, { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Underline, Trash2, Save, Pencil } from 'lucide-react';

function Note({ note, onDelete, onUpdate }) {
  const [html, setHtml] = useState(note.html);
  const [activeButtons, setActiveButtons] = useState({
    bold: false,
    italic: false,
    underline: false,
  });
  const mainEl = useRef(null);
  const lastHtml = useRef(note.html);

  useEffect(() => {
    // mainEl.current.innerHTML = html;
    if (mainEl.current && html !== mainEl.current.innerHTML) {
      const selection = window.getSelection();
      const range = document.createRange();

      // Preserve the cursor position
      const startOffset = selection.rangeCount > 0 ? selection.getRangeAt(0).startOffset : 0;
      mainEl.current.innerHTML = html;

      // Restore the cursor position
      range.setStart(mainEl.current.firstChild, Math.min(startOffset, mainEl.current.firstChild.length));
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [html]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    updateActiveButtons();
  };

  const handleInput = () => {
    const newHtml = mainEl.current.innerHTML;
    if (newHtml !== lastHtml.current) {
      setHtml(newHtml);
      lastHtml.current = newHtml;
      onUpdate({ text: mainEl.current.innerText, html: newHtml });
    }
    updateActiveButtons();
  };

  const updateActiveButtons = () => {
    setActiveButtons({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    });
  };

  return (
    <div className="note-wrapper">
      <div className="operations">
        <button className={`boldBtn formatBtn ${activeButtons.bold ? 'active' : ''}`} onClick={() => execCommand('bold')}>
          <Bold/>
        </button>
        <button className={`italicBtn formatBtn ${activeButtons.italic ? 'active' : ''}`} onClick={() => execCommand('italic')}>
          <Italic/>
        </button>
        <button className={`underlineBtn formatBtn ${activeButtons.underline ? 'active' : ''}`} onClick={() => execCommand('underline')}>
            <Underline/>
        </button>
        <input
          type="color"
          className="textColorPicker formatBtn"
          // onInput={(e) => execCommand('foreColor', e.target.value)}
          onChange={(e) => {execCommand('foreColor', e.target.value);
            setActiveButtons({ ...activeButtons, textColor: e.target.value });
          }}
        />
        <button onClick={() => mainEl.current.focus()}>
        <Pencil/>
        </button>
        <button onClick={() => {}}>
            <Save/>
        </button>
        <button onClick={onDelete}>
            <Trash2/>
        </button>
      </div>
      <div
        className="main"
        contentEditable="true"
        ref={mainEl}
        onInput={handleInput}
        onKeyUp = {updateActiveButtons}
        onMouseUp={updateActiveButtons}
        dir='ltr'
        style={{whiteSpace: 'pre-wrap'}}
      ></div>
    </div>
  );
}

export default Note;
