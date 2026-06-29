import { useState, useRef, useEffect } from 'react';
import type { GameData } from '../game/types';

interface Props {
  data: GameData;
  onReset: () => void;
}

const SAVE_KEY = 'agencia-save';

function HowToPlayModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-surface-card border border-surface-border rounded-xl p-6 max-w-lg w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-base font-bold text-text mb-3">Cómo jugar</h2>
        <ul className="space-y-2 text-xs text-text-muted">
          <li><strong className="text-text">Clicks</strong> — Generá LoC, PD y Tráfico manualmente.</li>
          <li><strong className="text-text">Proyectos</strong> — Invertí recursos para ganar dinero y reputación. Activá auto-repeat para encadenarlos.</li>
          <li><strong className="text-text">Equipo</strong> — Contratá desarrolladores, diseñadores y marketers para generar recursos por segundo.</li>
          <li><strong className="text-text">Mejoras</strong> — Potenciá tu generación de recursos.</li>
          <li><strong className="text-text">Prestigio</strong> — Al llegar a cierta reputación, podés reiniciar tu progreso a cambio de PP para desbloquear habilidades en el Árbol de Skills.</li>
        </ul>
        <button onClick={onClose} className="mt-4 px-4 py-1.5 rounded-lg bg-accent-blue text-white text-xs font-medium hover:bg-accent-blue/80 transition-colors">
          Cerrar
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
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(p => !p)}
          className="px-2 py-1 rounded-lg bg-surface-card/50 border border-surface-border text-text-muted hover:bg-surface-hover hover:text-text transition-colors text-xs font-medium leading-tight"
        >
          Menú ▾
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-1 w-48 rounded-lg bg-surface-card border border-surface-border shadow-lg z-50 py-1 overflow-hidden">
            <button onClick={() => { setOpen(false); setShowTutorial(true); }} className="w-full text-left px-3 py-2 text-xs text-text hover:bg-surface-hover transition-colors">
              📖 Cómo jugar
            </button>
            <button onClick={handleExport} className="w-full text-left px-3 py-2 text-xs text-text hover:bg-surface-hover transition-colors">
              📤 Exportar partida
            </button>
            <button onClick={handleImport} className="w-full text-left px-3 py-2 text-xs text-text hover:bg-surface-hover transition-colors">
              📥 Importar partida
            </button>
            <hr className="border-surface-border my-1" />
            <button onClick={handleReset} className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-surface-hover transition-colors">
              🗑 Resetear partida
            </button>
          </div>
        )}
      </div>
      {showTutorial && <HowToPlayModal onClose={() => setShowTutorial(false)} />}
      <input ref={fileRef} type="file" accept=".json" onChange={onFileSelected} className="hidden" />
    </>
  );
}
