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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="card p-6 max-w-sm w-full mx-4 animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🔥</span>
          <h2 className="text-lg font-bold text-text">¿Reiniciar todo?</h2>
        </div>
        <p className="text-xs text-text-muted mb-4">Al hacer prestige perderás todo tu progreso a cambio de PP.</p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center px-3 py-2 rounded-lg bg-surface-card/60 border border-surface-border/50">
            <span className="text-xs text-text-dim">Costo</span>
            <span className="text-sm font-bold text-text">{fmtNum(cost)} ⭐</span>
          </div>
          <div className="flex justify-between items-center px-3 py-2 rounded-lg bg-accent-blue/10 border border-accent-blue/20">
            <span className="text-xs text-text-dim">Ganancia</span>
            <span className="text-sm font-bold text-accent-blue">+{fmtNum(gain)} PP</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="px-2 py-1.5 rounded-lg bg-surface-card/40 border border-surface-border/30">
            <div className="text-text-dim text-[10px]">Dinero</div>
            <div className="font-semibold text-text">{fmtDinero(data.dinero)}</div>
          </div>
          <div className="px-2 py-1.5 rounded-lg bg-surface-card/40 border border-surface-border/30">
            <div className="text-text-dim text-[10px]">Reputación</div>
            <div className="font-semibold text-accent-orange">{fmtNum(data.reputacion)} ⭐</div>
          </div>
          <div className="px-2 py-1.5 rounded-lg bg-surface-card/40 border border-surface-border/30">
            <div className="text-text-dim text-[10px]">Recursos</div>
            <div className="font-semibold text-text">{fmtNum(data.loc)} / {fmtNum(data.pd)} / {fmtNum(data.trafico)}</div>
          </div>
          <div className="px-2 py-1.5 rounded-lg bg-surface-card/40 border border-surface-border/30">
            <div className="text-text-dim text-[10px]">Seguidores</div>
            <div className="font-semibold text-text">{fmtNum(data.seguidores)}</div>
          </div>
        </div>

        <p className="text-xs text-accent-orange mb-4 font-medium text-center">Todo el progreso se perderá excepto los PP y habilidades adquiridas.</p>

        <div className="flex gap-2">
          <button onClick={onClose} className="btn btn-secondary flex-1 px-4 py-2 text-xs">
            Cancelar
          </button>
          <button onClick={onConfirm} className="btn btn-danger flex-1 px-4 py-2 text-xs">
            ¡Hacer Prestige!
          </button>
        </div>
      </div>
    </div>
  );
}
