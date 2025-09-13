import React from 'react';

interface BackgroundSelectorProps {
  selectedBackground: string;
  onBackgroundSelect: (background: string) => void;
  backgroundColor: string;
  onBackgroundColorChange: (color: string) => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ 
  selectedBackground,
  onBackgroundSelect,
  backgroundColor,
  onBackgroundColorChange
}) => {
  const backgrounds = [
    { id: 'square', label: 'Квадрат' },
    { id: 'circle', label: 'Круг' },
    { id: 'triangle', label: 'Треугольник' }
  ];

  return (
    <div className="background-selector">
      <h3>ФОН</h3>
      <div className="background-options">
        {backgrounds.map((bg) => (
          <div 
            key={bg.id} 
            className={`background-option ${selectedBackground === bg.id ? 'selected' : ''}`}
            onClick={() => onBackgroundSelect(bg.id)}
          >
            {bg.id === 'square' && (
              <div className="bg-preview square"></div>
            )}
            {bg.id === 'circle' && (
              <div className="bg-preview circle"></div>
            )}
            {bg.id === 'triangle' && (
              <div className="bg-preview triangle"></div>
            )}
          </div>
        ))}
      </div>
      
      <div className="color-selector">
        <label>Цвет фона:</label>
        <input 
          type="color" 
          value={backgroundColor} 
          onChange={(e) => onBackgroundColorChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default BackgroundSelector;
