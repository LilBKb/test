import React from 'react';

interface TextCustomizerProps {
  customText: string;
  setCustomText: (text: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
}

const TextCustomizer: React.FC<TextCustomizerProps> = ({
  customText,
  setCustomText,
  textColor,
  setTextColor,
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize
}) => {
  const fontOptions = ['Arial', 'Helvetica', 'Times New Roman', 'Courier', 'Verdana', 'Georgia'];
  const textColorOptions = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
  
  return (
    <div className="text-customizer">
      <h3>Customize Text</h3>
      
      <div className="input-group">
        <label htmlFor="custom-text">Text:</label>
        <input
          type="text"
          id="custom-text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Enter your text"
        />
      </div>
      
      <div className="input-group">
        <label htmlFor="font-family">Font:</label>
        <select
          id="font-family"
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
        >
          {fontOptions.map((font, index) => (
            <option key={index} value={font}>{font}</option>
          ))}
        </select>
      </div>
      
      <div className="input-group">
        <label htmlFor="font-size">Size:</label>
        <input
          type="range"
          id="font-size"
          min="10"
          max="72"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
        />
        <span>{fontSize}px</span>
      </div>
      
      <div className="input-group">
        <label>Color:</label>
        <div className="text-color-options">
          {textColorOptions.map((color, index) => (
            <div
              key={index}
              className={`text-color-option ${textColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => setTextColor(color)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextCustomizer;
