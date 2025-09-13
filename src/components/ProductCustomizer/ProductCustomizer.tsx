import { useState, useRef } from 'react';
import * as fabric from 'fabric';
import ProductCanvas from './ProductCanvas';
import BackgroundSelector from './BackgroundSelector';
import IconSelector from './IconSelector';
import ExportOptions from './ExportOptions';

const ProductCustomizer: React.FC = () => {
  const [backgroundShape, setBackgroundShape] = useState<string>('circle');
  const [backgroundColor, setBackgroundColor] = useState<string>('#6D8AB5');
  
  const [selectedIcon, setSelectedIcon] = useState<string>('star');
  const [iconColor, setIconColor] = useState<string>('#000000');

  const canvasRef = useRef<fabric.Canvas | null>(null);

  const setCanvasRef = (canvas: fabric.Canvas | null) => {
    canvasRef.current = canvas;
  };
  const handleExport = (format: string, scale: number) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    try {
      const originalDimensions = {
        width: canvas.width || 500,
        height: canvas.height || 500
      };
      
      const exportWidth = originalDimensions.width * scale;
      const exportHeight = originalDimensions.height * scale;
      
      const dataUrl = format === 'png' 
        ? canvas.toDataURL({ 
            format: 'png',
            multiplier: scale,
            width: exportWidth,
            height: exportHeight
          })
        : canvas.toDataURL({ 
            format: 'svg',
            multiplier: scale,
            width: exportWidth,
            height: exportHeight
          });
      
      const link = document.createElement('a');
      link.download = `custom-design.${format}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting canvas:', error);
      alert('Failed to export image. Please try again.');
    }
  };

  return (
    <div className="product-customizer">
      <div className="customizer-container">
        <div className="controls-section">
          <BackgroundSelector 
            selectedBackground={backgroundShape}
            onBackgroundSelect={setBackgroundShape}
            backgroundColor={backgroundColor}
            onBackgroundColorChange={setBackgroundColor}
          />
          
          <IconSelector 
            selectedIcon={selectedIcon}
            iconColor={iconColor}
            onIconSelect={setSelectedIcon}
            onIconColorChange={setIconColor}
          />
          
          <ExportOptions 
            onExport={handleExport}
          />
        </div>
        
        <div className="canvas-section">
          <ProductCanvas 
            backgroundShape={backgroundShape}
            backgroundColor={backgroundColor}
            selectedIcon={selectedIcon}
            iconColor={iconColor}
            onCanvasCreated={setCanvasRef}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCustomizer;