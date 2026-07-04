import type { GameData } from '../game/types';
import { fmtNum, fmtDinero, getLocPs, getPdPs, getTraficoPs, getDineroPs, getLocConsumptionPs, getPdConsumptionPs, getTraficoConsumptionPs, getSeguidoresTraficoPs, getSeguidoresDineroPs, getPrestigeCost, canAscend } from '../game/logic';
import MenuButton from './MenuButton';

interface Props { data: GameData; className?: string; onReset: () => void }

function ResourceStat({ icon, value, net, color = 'text-text' }: {
  icon: string; value: string; net: number; color?: string;
}) {
  const netColor = net > 0 ? 'text-accent-green' : net < 0 ? 'text-accent-red' : 'text-yellow-500';
  return (
    <div className="flex flex-col leading-none min-w-[3.5rem]">
      <div className="flex items-center gap-1">
        <span className="text-sm">{icon}</span>
        <span className={`font-bold text-xs tabular-nums ${color}`}>{value}</span>
      </div>
      <span className={`text-[10px] tabular-nums ${netColor}`}>{net > 0 ? '+' : ''}{fmtNum(net)}/s</span>
    </div>
  );
}

function MiniStat({ icon, value, color = 'text-text', title }: {
  icon: string; value: string; color?: string; title?: string;
}) {
  return (
    <div className="flex items-center gap-1" title={title}>
      <span className="text-sm">{icon}</span>
      <span className={`font-semibold text-xs tabular-nums ${color}`}>{value}</span>
    </div>
  );
}

export default function ResourceBar({ data, className = '', onReset }: Props) {
  const locNet = getLocPs(data) - getLocConsumptionPs(data);
  const pdNet = getPdPs(data) - getPdConsumptionPs(data);
  const traficoNet = getTraficoPs(data) - getTraficoConsumptionPs(data);
  const pcost = getPrestigeCost(data);
  const canRebrand = data.reputacion >= pcost;
  const ascendReady = canAscend(data);

  return (
    <div className={`game-panel card relative z-50 flex flex-wrap items-center gap-1.5 md:gap-2 px-2 md:px-2.5 py-1.5 ${className}`}>
      {/* Recursos */}
      <div className="flex items-center gap-1.5 px-1.5 md:px-2 py-1 rounded-lg bg-surface-card/60 border border-surface-border/50">
        <span className="hidden sm:block text-[9px] font-bold uppercase tracking-wider text-text-muted" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Recursos</span>
        <div className="flex items-center gap-2">
          <ResourceStat icon="💻" value={fmtNum(data.loc)} net={locNet} color="text-accent" />
          <div className="w-px h-6 bg-surface-border/40" />
          <ResourceStat icon="🎨" value={fmtNum(data.pd)} net={pdNet} color="text-accent-pink" />
          <div className="w-px h-6 bg-surface-border/40" />
          <ResourceStat icon="📢" value={fmtNum(data.trafico)} net={traficoNet} color="text-accent-cyan" />
        </div>
      </div>

      {/* Seguidores */}
      <div className="flex items-center gap-1.5 px-1.5 md:px-2 py-1 rounded-lg bg-surface-card/60 border border-surface-border/50">
        <span className="hidden sm:block text-[9px] font-bold uppercase tracking-wider text-text-muted" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Seguidores</span>
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1">
            <span className="text-sm">👥</span>
            <span className="font-bold text-xs tabular-nums text-text">{fmtNum(data.seguidores)}</span>
          </div>
          <span className="text-[10px] text-text-dim tabular-nums">
            +{fmtNum(getSeguidoresTraficoPs(data))}/s · {fmtDinero(getSeguidoresDineroPs(data))}/s
          </span>
        </div>
      </div>

      {/* Prestige */}
      <div className="flex items-center gap-1.5 px-1.5 md:px-2 py-1 rounded-lg bg-surface-card/60 border border-surface-border/50">
        <span className="hidden sm:block text-[9px] font-bold uppercase tracking-wider text-text-muted" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Prestige</span>
        <div className="flex items-center gap-2">
          <MiniStat icon="⭐" value={fmtNum(data.reputacion)} color="text-accent-orange" title="Reputación" />
          <MiniStat icon="🔮" value={`${data.prestigePoints}`} color="text-accent-purple" title="Prestige Points" />
          <MiniStat icon="🎯" value={`${pcost}`} color={canRebrand ? 'text-accent-green' : 'text-text-dim'} title="Próximo prestige" />
          {ascendReady && (
            <span className="text-[10px] font-bold text-accent-blue animate-pulse">✦ Asc</span>
          )}
        </div>
      </div>

      <div className="flex-1" />

      {/* Economía */}
      <div className="flex items-center gap-2 px-2 md:px-2.5 py-1 rounded-lg bg-accent-green/10 border border-accent-green/20">
        <div className="flex flex-col leading-none">
          <span className="text-[9px] font-bold uppercase tracking-wider text-accent-green">Balance</span>
          <span className="font-bold text-sm md:text-base tabular-nums text-accent-green">{fmtDinero(data.dinero)}</span>
          <span className="text-[10px] text-text-dim tabular-nums">+{fmtDinero(getDineroPs(data))}/s</span>
        </div>
      </div>

      {canRebrand && (
        <div className="badge badge-orange animate-pulse">
          <span>🔥</span>
          <span>Prestige</span>
        </div>
      )}

      <MenuButton data={data} onReset={onReset} />
    </div>
  );
}
