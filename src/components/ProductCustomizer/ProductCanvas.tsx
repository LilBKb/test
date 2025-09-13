import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

interface ProductCanvasProps {
  backgroundShape: string;
  backgroundColor: string;
  selectedIcon: string;
  iconColor: string;
  onCanvasCreated?: (canvas: fabric.Canvas) => void;
}

const ProductCanvas: React.FC<ProductCanvasProps> = ({
  backgroundShape,
  backgroundColor,
  selectedIcon,
  iconColor,
  onCanvasCreated
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [backgroundObject, setBackgroundObject] = useState<fabric.Object | null>(null);
  const [iconObject, setIconObject] = useState<fabric.Object | null>(null);
  
  const iconPaths = {
    'star': 'M12,2L15.09,8.26L22,9.27L17,14.14L18.18,21.02L12,17.77L5.82,21.02L7,14.14L2,9.27L8.91,8.26L12,2Z',
    'umbrella': 'M12,2A9,9 0 0,1 21,11H13V19A3,3 0 0,1 10,22A3,3 0 0,1 7,19V18H9V19A1,1 0 0,0 10,20A1,1 0 0,0 11,19V11H3A9,9 0 0,1 12,2Z',
    'triangle': 'M1,21H23L12,2L1,21Z'
  };

  useEffect(() => {
    if (canvasRef.current && !canvas) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 500,
        height: 500,
        backgroundColor: '#f5f5f5',
        preserveObjectStacking: true
      });
      
      setCanvas(fabricCanvas);
      
      if (onCanvasCreated) {
        onCanvasCreated(fabricCanvas);
      }

      return () => {
        fabricCanvas.dispose();
      };
    }
  }, [canvasRef]);

  const updateCanvasSize = () => {
    if (canvas) {
      const container = canvasRef.current?.parentElement;
      if (container) {
        const width = Math.min(container.clientWidth, 500);
        const height = width;
        canvas.setDimensions({ width, height });
        canvas.renderAll();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateCanvasSize);
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [canvas]);

  useEffect(() => {
    if (!canvas) return;

    if (backgroundObject) {
      canvas.remove(backgroundObject);
    }

    let bgObject;
    const canvasSize = canvas.width || 500;
    const size = canvasSize * 0.8;
    const center = canvasSize / 2;

    switch (backgroundShape) {
      case 'circle':
        bgObject = new fabric.Circle({
          radius: size / 2,
          left: center,
          top: center,
          originX: 'center',
          originY: 'center',
          fill: backgroundColor,
          selectable: false
        });
        break;
      case 'triangle':
        bgObject = new fabric.Triangle({
          width: size,
          height: size,
          left: center,
          top: center,
          originX: 'center',
          originY: 'center',
          fill: backgroundColor,
          selectable: false
        });
        break;
      default:
        bgObject = new fabric.Rect({
          width: size,
          height: size,
          left: center,
          top: center,
          originX: 'center',
          originY: 'center',
          fill: backgroundColor,
          selectable: false
        });
    }

    canvas.add(bgObject);
    setBackgroundObject(bgObject);
    
    if (iconObject) {
      canvas.remove(iconObject);
      canvas.add(iconObject);
    }
    
    canvas.renderAll();
  }, [backgroundShape, backgroundColor, canvas]);

  useEffect(() => {
    if (!canvas) return;

    if (iconObject) {
      canvas.remove(iconObject);
    }

    if (selectedIcon && iconPaths[selectedIcon as keyof typeof iconPaths]) {
      const pathStr = iconPaths[selectedIcon as keyof typeof iconPaths];
      const path = new fabric.Path(pathStr);
      
      if (path) {
        const icon = path;
        const canvasSize = canvas.width || 500;
        
        icon.set({
          left: canvasSize / 2,
          top: canvasSize / 2,
          originX: 'center',
          originY: 'center',
          fill: iconColor,
          scaleX: canvasSize * 0.3 / 24,
          scaleY: canvasSize * 0.3 / 24,
          selectable: true,
          hasControls: true,
          hasBorders: true,
        });
        
        canvas.add(icon);
        setIconObject(icon);
        canvas.setActiveObject(icon);
        canvas.renderAll();
      }
    }
  }, [selectedIcon, canvas]);

  useEffect(() => {
    if (canvas && iconObject) {
      iconObject.set('fill', iconColor);
      canvas.renderAll();
    }
  }, [iconColor, iconObject, canvas]);

  return (
    <div className="product-canvas-container">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ProductCanvas;