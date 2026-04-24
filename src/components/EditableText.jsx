import React, { useState, useEffect, useRef } from 'react';

export default function EditableText({ id, as: Tag = 'span', defaultText, className, isEditMode }) {
  const [content, setContent] = useState(defaultText);
  const elementRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(`edit_${id}`);
    if (saved) {
      setContent(saved);
    }
  }, [id]);

  const handleBlur = () => {
    if (elementRef.current) {
      const newText = elementRef.current.innerText;
      setContent(newText);
      localStorage.setItem(`edit_${id}`, newText);
    }
  };

  return (
    <Tag
      ref={elementRef}
      className={`${className} ${isEditMode ? 'editable-active' : ''}`}
      contentEditable={isEditMode}
      suppressContentEditableWarning={true}
      onBlur={handleBlur}
      style={{
        outline: isEditMode ? '2px dashed rgba(255, 255, 255, 0.5)' : 'none',
        outlineOffset: '4px',
        borderRadius: '4px',
        transition: 'all 0.2s ease',
        cursor: isEditMode ? 'text' : 'inherit'
      }}
    >
      {content}
    </Tag>
  );
}
