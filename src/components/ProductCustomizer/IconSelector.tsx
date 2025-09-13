import React from 'react';

interface IconSelectorProps {
  selectedIcon: string;
  iconColor: string;
  onIconSelect: (icon: string) => void;
  onIconColorChange: (color: string) => void;
}

const IconSelector: React.FC<IconSelectorProps> = ({ 
  selectedIcon, 
  iconColor, 
  onIconSelect,
  onIconColorChange 
}) => {
  const icons = [
    { id: 'star', path: 'M12,2L15.09,8.26L22,9.27L17,14.14L18.18,21.02L12,17.77L5.82,21.02L7,14.14L2,9.27L8.91,8.26L12,2Z' },
    { id: 'umbrella', path: 'M12,2A9,9 0 0,1 21,11H13V19A3,3 0 0,1 10,22A3,3 0 0,1 7,19V18H9V19A1,1 0 0,0 10,20A1,1 0 0,0 11,19V11H3A9,9 0 0,1 12,2Z' },
    { id: 'triangle', path: 'M1,21H23L12,2L1,21Z' }
  ];

  return (
    <div className="icon-selector">
      <h3>ИКОНКИ</h3>
      <div className="icon-options">
        {icons.map((icon) => (
          <div 
            key={icon.id} 
            className={`icon-option ${selectedIcon === icon.id ? 'selected' : ''}`}
            onClick={() => onIconSelect(icon.id)}
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d={icon.path} fill={selectedIcon === icon.id ? iconColor : "#000"} />
            </svg>
          </div>
        ))}
      </div>
      
      <div className="color-selector">
        <label>Цвет иконки:</label>
        <input 
          type="color" 
          value={iconColor} 
          onChange={(e) => onIconColorChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default IconSelector;
