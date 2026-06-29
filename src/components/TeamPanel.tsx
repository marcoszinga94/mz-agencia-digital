import type { GameData } from '../game/types';
import { fmtDinero, getHireCost, getProjectSpeed } from '../game/logic';

interface Props { data: GameData; onHire: (role: 'developers' | 'designers' | 'marketers') => void }

function HireRow({ icon, label, count, gen, res, cost, canAfford, onHire }: {
  icon: string; label: string; count: number; gen: number; res: string; cost: number; canAfford: boolean; onHire: () => void
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface border border-surface-border hover:bg-surface-hover transition-colors">
      <span className="text-lg">{icon}</span>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-text">{label}</span>
          <span className="text-xs font-semibold text-accent">{count}</span>
        </div>
        <div className="text-[13px] text-text-muted">+{gen} {res}/s · +0.3x project speed</div>
      </div>
      <div className="text-right">
        <div className="text-xs text-text-dim">Next hire</div>
        <div className="text-xs font-medium text-accent-green mb-1">{fmtDinero(cost)}</div>
        <button onClick={onHire} disabled={!canAfford}
          className="text-xs font-medium px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/30
            hover:bg-accent/20 active:bg-accent/30 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer w-full"
        >+ Hire</button>
      </div>
    </div>
  );
}

export default function TeamPanel({ data, onHire }: Props) {
  const speed = getProjectSpeed(data);
  return (
    <div className="rounded-lg border border-surface-border bg-surface-card p-3 shrink-0">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          <span className="text-accent-purple mr-1">◆</span> Team
        </span>
        <span className="ml-auto text-[13px] text-accent font-medium">🚀 {speed.toFixed(1)}x project speed</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <HireRow icon="👨‍💻" label="Developers" count={data.team.developers} gen={data.team.developers * 5} res="LoC"
          cost={getHireCost('developers', data)} canAfford={data.dinero >= getHireCost('developers', data)}
          onHire={() => onHire('developers')} />
        <HireRow icon="🎨" label="Designers" count={data.team.designers} gen={data.team.designers * 5} res="PD"
          cost={getHireCost('designers', data)} canAfford={data.dinero >= getHireCost('designers', data)}
          onHire={() => onHire('designers')} />
        <HireRow icon="📊" label="Marketers" count={data.team.marketers} gen={data.team.marketers * 5} res="Tráfico"
          cost={getHireCost('marketers', data)} canAfford={data.dinero >= getHireCost('marketers', data)}
          onHire={() => onHire('marketers')} />
      </div>
    </div>
  );
}
