import React, { useState, useEffect } from 'react';

function TruncateText({ text, maxLength }) {
  const [truncatedText, setTruncatedText] = useState(text);

  useEffect(() => {
    if (text.length > maxLength) {
      setTruncatedText(text.substring(0, maxLength) + '...');
    } else {
      setTruncatedText(text);
    }
  }, [text, maxLength]);

  return (
    <div style={{fontSize: '16px', lineHeight: '1'}} dangerouslySetInnerHTML={{ __html: truncatedText }} />
  );
}

export default TruncateText;