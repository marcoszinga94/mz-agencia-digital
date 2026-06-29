import { useState } from 'react';
import type { GameData } from '../game/types';
import { fmtNum, getPrestigeCost, canAscend } from '../game/logic';
import SkillTreeModal from './SkillTreeModal';

interface Props { data: GameData; onRebrand: () => void; onBuyPrestige: (id: string) => void; onAscend: () => void }

export default function PrestigePanel({ data, onRebrand, onBuyPrestige, onAscend }: Props) {
  const [showTree, setShowTree] = useState(false);
  const pcost = getPrestigeCost(data);
  const canRebrand = data.reputacion >= pcost;
  const ascendReady = canAscend(data);

  return (
    <div className="p-3 flex flex-col gap-2 overflow-y-auto h-full">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-text-muted">
        <span className="text-accent-orange">◆</span> Prestige
        <span className="ml-auto text-xs font-mono font-normal text-accent-purple">{data.prestigePoints} PP</span>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        <div className="px-2 py-1.5 rounded-md bg-surface border border-surface-border text-center">
          <div className="text-xs text-text-dim">⭐ Reputation</div>
          <div className="text-sm font-bold text-accent-orange">{fmtNum(data.reputacion)}</div>
        </div>
        <div className="px-2 py-1.5 rounded-md bg-surface border border-surface-border text-center">
          <div className="text-xs text-text-dim">🔥 Re-brands</div>
          <div className="text-sm font-bold text-text">{data.prestigeCount}</div>
        </div>
        <div className="px-2 py-1.5 rounded-md bg-surface border border-surface-border text-center">
          <div className="text-xs text-text-dim">🎯 Next cost</div>
          <div className="text-sm font-bold text-accent-orange">{pcost} ⭐</div>
        </div>
      </div>

      <button onClick={onRebrand} disabled={!canRebrand}
        className="w-full text-sm font-semibold px-3 py-2.5 rounded-lg border border-accent-red/40 text-accent-red
          bg-accent-red/5 hover:bg-accent-red/15 active:bg-accent-red/25 disabled:opacity-25 disabled:cursor-not-allowed
          transition-all cursor-pointer"
      >🔥 Re-Brand & Earn PP</button>

      <div className="flex flex-col gap-1.5 pt-1">
        <button onClick={() => setShowTree(true)}
          className="w-full text-sm font-semibold px-3 py-2.5 rounded-lg border border-accent/40 text-accent
            bg-accent/5 hover:bg-accent/15 active:bg-accent/25 transition-all cursor-pointer"
        >🌀 Open Skill Tree</button>
        {ascendReady && (
          <button onClick={onAscend}
            className="w-full text-sm font-semibold px-3 py-2.5 rounded-lg border border-accent-blue/40 text-accent-blue
              bg-accent-blue/5 hover:bg-accent-blue/15 active:bg-accent-blue/25 transition-all cursor-pointer"
          >🌀 Ascender</button>
        )}
      </div>

      {showTree && <SkillTreeModal data={data} onBuyPrestige={onBuyPrestige} onClose={() => setShowTree(false)} />}
    </div>
  );
}
