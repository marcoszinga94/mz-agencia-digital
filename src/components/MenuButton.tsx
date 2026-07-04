import { useState, useRef, useEffect } from 'react';
import type { GameData } from '../game/types';

interface Props {
  data: GameData;
  onReset: () => void;
}

const SAVE_KEY = 'agencia-save';

function HowToPlayModal({ onClose }: { onClose: () => void }) {
  const steps = [
    { icon: '👆', title: 'Clicks', desc: 'Generá LoC, PD y Tráfico manualmente. Cada click también da dinero.' },
    { icon: '⚡', title: 'Mejoras', desc: 'Potenciá tu generación de recursos y clicks.' },
    { icon: '👥', title: 'Equipo', desc: 'Contratá desarrolladores, diseñadores y marketers para generar recursos pasivos.' },
    { icon: '📋', title: 'Proyectos', desc: 'Invertí recursos para ganar dinero y reputación. Activá auto-repeat para encadenarlos.' },
    { icon: '⭐', title: 'Prestigio', desc: 'Al llegar a la reputación necesaria, reiniciá tu progreso a cambio de PP para desbloquear habilidades.' },
    { icon: '🌀', title: 'Ascensión', desc: 'Al dominar todas las habilidades base, ascendé a un nuevo plano con proyectos y skills exclusivos.' },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="card p-6 max-w-lg w-full mx-4 animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📖</span>
          <h2 className="text-lg font-bold text-text">Cómo jugar</h2>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {steps.map((step, i) => (
            <div key={i} className="p-3 rounded-lg bg-surface-card/60 border border-surface-border/50">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{step.icon}</span>
                <span className="text-xs font-bold text-text">{step.title}</span>
              </div>
              <p className="text-[11px] text-text-muted leading-snug">{step.desc}</p>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="btn btn-primary w-full px-4 py-2 text-xs">
          Entendido
        </button>
      </div>
    </div>
  );
}

export default function MenuButton({ data, onReset }: Props) {
  const [open, setOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const handleReset = () => {
    setOpen(false);
    if (window.confirm('Resetear toda la partida?\nTodo el progreso se perderá. ¿Continuar?')) {
      onReset();
    }
  };

  const handleExport = () => {
    setOpen(false);
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) { alert('No hay partida guardada para exportar.'); return; }
      const blob = new Blob([raw], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'agencia-save.json';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Error al exportar la partida.');
    }
  };

  const handleImport = () => {
    setOpen(false);
    fileRef.current?.click();
  };

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        JSON.parse(text);
        localStorage.setItem(SAVE_KEY, text);
        window.location.reload();
      } catch {
        alert('Archivo JSON inválido.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <>
      <div ref={ref} className="relative z-[100]">
        <button
          onClick={() => setOpen(p => !p)}
          className="btn btn-secondary px-2.5 py-1.5 text-xs"
        >
          <span>⚙</span>
          <span>Menú</span>
          <span className="text-[10px]">▾</span>
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-1.5 w-52 rounded-xl card py-1.5 z-[100] animate-fade-in overflow-hidden">
            <button onClick={() => { setOpen(false); setShowTutorial(true); }} className="w-full flex items-center gap-2 text-left px-3 py-2 text-xs text-text hover:bg-surface-hover transition-colors">
              <span>📖</span> Cómo jugar
            </button>
            <button onClick={handleExport} className="w-full flex items-center gap-2 text-left px-3 py-2 text-xs text-text hover:bg-surface-hover transition-colors">
              <span>📤</span> Exportar partida
            </button>
            <button onClick={handleImport} className="w-full flex items-center gap-2 text-left px-3 py-2 text-xs text-text hover:bg-surface-hover transition-colors">
              <span>📥</span> Importar partida
            </button>
            <hr className="border-surface-border my-1" />
            <button onClick={handleReset} className="w-full flex items-center gap-2 text-left px-3 py-2 text-xs text-accent-red hover:bg-surface-hover transition-colors">
              <span>🗑</span> Resetear partida
            </button>
          </div>
        )}
      </div>
      {showTutorial && <HowToPlayModal onClose={() => setShowTutorial(false)} />}
      <input ref={fileRef} type="file" accept=".json" onChange={onFileSelected} className="hidden" />
    </>
  );
}
