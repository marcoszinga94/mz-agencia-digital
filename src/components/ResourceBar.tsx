import type { GameData } from '../game/types';
import { fmtNum, fmtDinero, getLocPs, getPdPs, getTraficoPs, getDineroPs } from '../game/logic';
import MenuButton from './MenuButton';

interface Props { data: GameData; className?: string; onReset: () => void }

function Stat({ label, value, perSec, color }: { label: string; value: string; perSec?: string; color?: string }) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-surface-card/50">
      <span className="text-text-muted text-xs font-medium uppercase tracking-wider">{label}</span>
      <span className={`font-semibold text-xs ${color || 'text-text'}`}>{value}</span>
      {perSec && <span className="text-text-dim text-xs">({perSec}/s)</span>}
    </div>
  );
}

export default function ResourceBar({ data, className = '', onReset }: Props) {
  return (
    <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-card border border-surface-border ${className}`}>
      <Stat label="LoC" value={fmtNum(data.loc)} perSec={fmtNum(getLocPs(data))} />
      <Stat label="PD" value={fmtNum(data.pd)} perSec={fmtNum(getPdPs(data))} />
      <Stat label="Tráfico" value={fmtNum(data.trafico)} perSec={fmtNum(getTraficoPs(data))} />
      <Stat label="Seg" value={fmtNum(data.seguidores)} />
      <div className="ml-auto flex items-center gap-3">
        <Stat label="⭐ Rep" value={fmtNum(data.reputacion)} color="text-accent-orange" />
        <div className="flex items-center gap-1.5 bg-accent-green/10 px-3 py-1 rounded-md border border-accent-green/20">
          <span className="text-xs font-medium uppercase tracking-wider text-accent-green">Balance</span>
          <span className="font-bold text-sm text-accent-green">{fmtDinero(data.dinero)}</span>
          {data.activeProject && <span className="text-text-dim text-xs">({fmtDinero(getDineroPs(data))}/s)</span>}
        </div>
        <MenuButton data={data} onReset={onReset} />
      </div>
    </div>
  );
}
