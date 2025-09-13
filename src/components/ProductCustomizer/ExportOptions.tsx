import React, { useState } from 'react';

interface ExportOptionsProps {
  onExport: (format: string, scale: number) => void;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ onExport }) => {
  const [scale, setScale] = useState<number>(2);
  const [format, setFormat] = useState<string>('png');

  return (
    <div className="export-options">
      <h3>ЭКСПОРТ</h3>
      
      <div className="scale-selector">
        <label>Масштаб:</label>
        <input 
          type="number" 
          value={scale} 
          min={1}
          max={10}
          onChange={(e) => setScale(parseInt(e.target.value))}
        />
      </div>
      
      <div className="format-selector">
        <button 
          className={`format-button ${format === 'png' ? 'selected' : ''}`}
          onClick={() => setFormat('png')}
        >
          PNG
        </button>
        <button 
          className={`format-button ${format === 'svg' ? 'selected' : ''}`}
          onClick={() => setFormat('svg')}
        >
          SVG
        </button>
      </div>
      
      <div className="export-info">
        <p>Фон меняется только тип и цвет. Иконки можно перемещать, вращать, удалять (Del), дублировать (Ctrl+D).</p>
      </div>
    </div>
  );
};

export default ExportOptions;
