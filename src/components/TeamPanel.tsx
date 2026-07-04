import type { GameData } from '../game/types';
import { fmtDinero, getHireCost, getProjectSpeed } from '../game/logic';

interface Props { data: GameData; onHire: (role: 'developers' | 'designers' | 'marketers') => void }

const ROLES = [
  { key: 'developers' as const, icon: '👨‍💻', label: 'Developers', res: 'LoC', color: 'accent' },
  { key: 'designers' as const, icon: '🎨', label: 'Designers', res: 'PD', color: 'accent-pink' },
  { key: 'marketers' as const, icon: '📊', label: 'Marketers', res: 'Tráfico', color: 'accent-cyan' },
] as const;

function HireRow({ data, role, onHire }: {
  data: GameData;
  role: typeof ROLES[number];
  onHire: () => void;
}) {
  const cost = getHireCost(role.key, data);
  const count = data.team[role.key];
  const canAfford = data.dinero >= cost;

  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-xl border transition-all duration-200 ${
      canAfford
        ? 'border-surface-border bg-surface-card/40 hover:bg-surface-hover/60 hover:border-surface-border/80'
        : 'border-surface-border/50 bg-surface-card/20 opacity-70'
    }`}>
      <div className={`flex items-center justify-center w-9 h-9 rounded-lg bg-${role.color}/10 border border-${role.color}/20 text-lg`}>
        {role.icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-text">{role.label}</span>
          <span className={`text-xs font-bold text-${role.color}`}>{count}</span>
        </div>
        <div className="text-[11px] text-text-muted">+{count * 5} {role.res}/s · +0.3x project speed</div>
      </div>
      <div className="text-right">
        <div className={`text-xs font-mono font-semibold mb-1 ${canAfford ? 'text-accent-green' : 'text-accent-red'}`}>{fmtDinero(cost)}</div>
        <button onClick={onHire} disabled={!canAfford}
          className="btn btn-primary text-xs px-3 py-1 rounded-lg disabled:opacity-30"
        >+ Contratar</button>
      </div>
    </div>
  );
}

export default function TeamPanel({ data, onHire }: Props) {
  const speed = getProjectSpeed(data);
  return (
    <div className="game-panel card p-3 shrink-0">
      <div className="flex items-center justify-between mb-3">
        <div className="section-title">
          <span className="text-accent-purple">◆</span> Equipo
        </div>
        <div className="badge badge-purple">
          <span>🚀</span>
          <span>{speed.toFixed(1)}x speed</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {ROLES.map(role => (
          <HireRow key={role.key} data={data} role={role} onHire={() => onHire(role.key)} />
        ))}
      </div>
    </div>
  );
}
