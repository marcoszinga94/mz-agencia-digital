import { useEffect, useRef, useState, useCallback, type ReactNode } from 'react';
import { Rnd } from 'react-rnd';

let zCounter = 10;

interface Props {
  panelId: string;
  children: ReactNode;
  dragHandleClassName?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultX?: number;
  defaultY?: number;
  minWidth?: number;
  minHeight?: number;
}

function loadLayout(panelId: string): { x: number; y: number; w: number; h: number } | null {
  try {
    const saved = localStorage.getItem(`layout_${panelId}`);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

export default function DraggablePanel({
  panelId, children, dragHandleClassName,
  defaultWidth = 400, defaultHeight = 300, defaultX = 0, defaultY = 0,
  minWidth = 200, minHeight = 120,
}: Props) {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);
  const [pos, setPos] = useState(() => {
    const saved = loadLayout(panelId);
    return { x: saved?.x ?? defaultX, y: saved?.y ?? defaultY };
  });
  const [sz, setSz] = useState(() => {
    const saved = loadLayout(panelId);
    return { width: saved?.w ?? defaultWidth, height: saved?.h ?? defaultHeight };
  });
  const [zIndex, setZIndex] = useState(1);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const save = useCallback((x: number, y: number, w: number, h: number) => {
    localStorage.setItem(`layout_${panelId}`, JSON.stringify({ x, y, w, h }));
  }, [panelId]);

  const bringToFront = useCallback(() => {
    zCounter += 1;
    setZIndex(zCounter);
  }, []);

  if (!isDesktop) {
    return <>{children}</>;
  }

  return (
    <Rnd
      position={pos}
      size={sz}
      style={{ zIndex }}
      onDragStart={bringToFront}
      onResizeStart={bringToFront}
      onDragStop={(_e, d) => {
        setPos({ x: d.x, y: d.y });
        save(d.x, d.y, sz.width as number, sz.height as number);
      }}
      onResizeStop={(_e, _dir, ref, _delta, position) => {
        const w = ref.offsetWidth;
        const h = ref.offsetHeight;
        setSz({ width: w, height: h });
        setPos({ x: position.x, y: position.y });
        save(position.x, position.y, w, h);
      }}
      bounds="parent"
      minWidth={minWidth}
      minHeight={minHeight}
      dragHandleClassName={dragHandleClassName}
      enableResizing={{ top: true, right: true, bottom: true, left: true, topRight: true, bottomRight: true, bottomLeft: true, topLeft: true }}
    >
      {children}
    </Rnd>
  );
}
