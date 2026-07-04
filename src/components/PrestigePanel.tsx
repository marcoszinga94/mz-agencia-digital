import type { GameData } from '../game/types';
import { fmtNum, getPrestigeCost, canAscend } from '../game/logic';

interface Props { data: GameData; onRebrand: () => void; onBuyPrestige: (id: string) => void; onAscend: () => void; onOpenSkillTree: () => void }

export default function PrestigePanel({ data, onRebrand, onBuyPrestige, onAscend, onOpenSkillTree }: Props) {
  const pcost = getPrestigeCost(data);
  const canRebrand = data.reputacion >= pcost;
  const ascendReady = canAscend(data);
  const gain = Math.max(1, Math.floor(data.reputacion / 100));

  return (
    <div className="p-3 flex flex-col gap-3 overflow-y-auto h-full">
      <div className="section-title">
        <span className="text-accent-orange">◆</span> Prestige
      </div>

      {data.prestigeCount > 0 && (
        <div className="text-center">
          <span className="badge badge-orange">Re-brand #{data.prestigeCount}</span>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        <div className="px-2 py-2 rounded-xl bg-surface-card/60 border border-surface-border/50 text-center">
          <div className="text-[10px] text-text-dim uppercase tracking-wider">⭐ Rep</div>
          <div className="text-sm font-bold text-accent-orange">{fmtNum(data.reputacion)}</div>
        </div>
        <div className="px-2 py-2 rounded-xl bg-surface-card/60 border border-surface-border/50 text-center">
          <div className="text-[10px] text-text-dim uppercase tracking-wider">🔮 PP</div>
          <div className="text-sm font-bold text-accent-purple">{data.prestigePoints}</div>
        </div>
        <div className={`px-2 py-2 rounded-xl border text-center transition-all ${
          canRebrand
            ? 'bg-accent-green/10 border-accent-green/30'
            : 'bg-surface-card/60 border-surface-border/50'
        }`}>
          <div className="text-[10px] text-text-dim uppercase tracking-wider">🎯 Costo</div>
          <div className={`text-sm font-bold ${canRebrand ? 'text-accent-green' : 'text-accent-orange'}`}>{pcost} ⭐</div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button onClick={onRebrand} disabled={!canRebrand}
          className={`btn w-full text-sm font-semibold px-4 py-3 rounded-xl transition-all ${
            canRebrand
              ? 'btn-danger animate-pulse'
              : 'btn-secondary opacity-60 cursor-not-allowed'
          }`}
        >
          <span>🔥</span>
          <span>Re-Brand +{fmtNum(gain)} PP</span>
        </button>

        <button type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenSkillTree();
          }}
          className="w-full text-sm font-semibold px-4 py-3 rounded-xl border border-accent/40 bg-accent/10 text-accent hover:bg-accent/20 transition-all"
        >
          <span>🌀</span>
          <span>Árbol de Skills</span>
        </button>

        {ascendReady && (
          <button onClick={onAscend}
            className="btn w-full text-sm font-semibold px-4 py-3 rounded-xl animate-pulse"
            style={{
              background: 'linear-gradient(135deg, rgba(121, 192, 255, 0.15), rgba(188, 140, 255, 0.1))',
              border: '1px solid rgba(121, 192, 255, 0.4)',
              color: '#79c0ff'
            }}
          >
            <span>🌀</span>
            <span>Ascender</span>
          </button>
        )}
      </div>
    </div>
  );
}
