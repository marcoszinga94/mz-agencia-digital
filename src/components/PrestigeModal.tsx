import { fmtDinero, fmtNum } from '../game/logic';
import type { GameData } from '../game/types';

interface Props {
  data: GameData;
  gain: number;
  cost: number;
  onConfirm: () => void;
  onClose: () => void;
}

export default function PrestigeModal({ data, gain, cost, onConfirm, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-surface-card border border-surface-border rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl animate-fade-in" onClick={e => e.stopPropagation()}>
        <h2 className="text-base font-bold text-text mb-1">¿Reiniciar todo?</h2>
        <p className="text-xs text-text-muted mb-4">Al hacer prestige perderás todo tu progreso a cambio de PP.</p>

        <div className="space-y-2 mb-4 text-xs">
          <div className="flex justify-between"><span className="text-text-muted">Costo</span><span className="text-text font-medium">{fmtNum(cost)} ⭐ Rep</span></div>
          <div className="flex justify-between"><span className="text-text-muted">Ganancia</span><span className="text-accent-blue font-bold">+{fmtNum(gain)} PP</span></div>
          <hr className="border-surface-border" />
          <div className="flex justify-between"><span className="text-text-muted">Dinero actual</span><span className="text-text">{fmtDinero(data.dinero)}</span></div>
          <div className="flex justify-between"><span className="text-text-muted">Reputación actual</span><span className="text-text">{fmtNum(data.reputacion)} ⭐</span></div>
          <div className="flex justify-between"><span className="text-text-muted">LoC / PD / Tráfico</span><span className="text-text">{fmtNum(data.loc)} / {fmtNum(data.pd)} / {fmtNum(data.trafico)}</span></div>
          <div className="flex justify-between"><span className="text-text-muted">Seguidores</span><span className="text-text">{fmtNum(data.seguidores)}</span></div>
        </div>

        <p className="text-xs text-accent-orange mb-4 font-medium">Todo el progreso se perderá excepto los PP y habilidades adquiridas.</p>

        <div className="flex gap-2">
          <button onClick={onClose} className="game-btn flex-1 px-4 py-1.5 rounded-lg bg-surface-hover text-text text-xs font-medium hover:brightness-110 transition-all">
            Cancelar
          </button>
          <button onClick={onConfirm} className="game-btn flex-1 px-4 py-1.5 rounded-lg bg-accent-blue text-white text-xs font-medium hover:bg-accent-blue/80 transition-all">
            ¡Hacer Prestige!
          </button>
        </div>
      </div>
    </div>
  );
}
