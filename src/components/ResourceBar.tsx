import type { GameData } from '../game/types';
import { fmtNum, fmtDinero, getLocPs, getPdPs, getTraficoPs, getDineroPs, getLocConsumptionPs, getPdConsumptionPs, getTraficoConsumptionPs } from '../game/logic';
import MenuButton from './MenuButton';

interface Props { data: GameData; className?: string; onReset: () => void }

function Stat({ label, value, perSec, color }: { label: string; value: string; perSec?: string; color?: string }) {
  return (
    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-surface-card/50">
      <span className="text-text-muted text-xs font-medium uppercase tracking-wider">{label}</span>
      <span className={`font-semibold text-xs tabular-nums min-w-[4ch] text-right ${color || 'text-text'}`}>{value}</span>
      {perSec && <span className="text-text-dim text-xs tabular-nums w-[9ch]">({perSec}/s)</span>}
    </div>
  );
}

function BalanceItem({ label, value, net }: { label: string; value: string; net: number }) {
  const color = net > 0 ? 'text-accent-green' : net < 0 ? 'text-red-500' : 'text-yellow-500';
  return (
    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-card/50">
      <span className="text-text-muted text-xs font-medium uppercase tracking-wider">{label}</span>
      <span className={`font-bold text-sm tabular-nums min-w-[8ch] text-right ${color}`}>{value}</span>
    </div>
  );
}

export default function ResourceBar({ data, className = '', onReset }: Props) {
  const locNet = getLocPs(data) - getLocConsumptionPs(data);
  const pdNet = getPdPs(data) - getPdConsumptionPs(data);
  const traficoNet = getTraficoPs(data) - getTraficoConsumptionPs(data);
  return (
    <div className={`game-panel overflow-visible flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-card border border-surface-border ${className}`}>
      <Stat label="LoC" value={fmtNum(data.loc)} perSec={fmtNum(getLocPs(data))} />
      <Stat label="PD" value={fmtNum(data.pd)} perSec={fmtNum(getPdPs(data))} />
      <Stat label="Tráfico" value={fmtNum(data.trafico)} perSec={fmtNum(getTraficoPs(data))} />
      <div className="mx-auto flex items-center gap-2 px-3 py-1 rounded-lg bg-surface-card/70 border border-surface-border/50">
        <span className="text-text-muted text-[10px] font-bold uppercase tracking-wider mr-1">Balance</span>
        <BalanceItem label="LoC" value={fmtNum(locNet) + '/s'} net={locNet} />
        <span className="text-text-dim text-[10px]">|</span>
        <BalanceItem label="PD" value={fmtNum(pdNet) + '/s'} net={pdNet} />
        <span className="text-text-dim text-[10px]">|</span>
        <BalanceItem label="Tráf" value={fmtNum(traficoNet) + '/s'} net={traficoNet} />
      </div>
      <Stat label="Seg" value={fmtNum(data.seguidores)} />
      <div className="ml-auto flex items-center gap-3">
        <Stat label="⭐ Rep" value={fmtNum(data.reputacion)} color="text-accent-orange" />
        <div className="flex items-center gap-1.5 bg-accent-green/10 px-3 py-1 rounded-md border border-accent-green/20">
          <span className="text-xs font-medium uppercase tracking-wider text-accent-green">Balance</span>
          <span className="font-bold text-sm text-accent-green tabular-nums">{fmtDinero(data.dinero)}</span>
          {data.activeProject && <span className="text-text-dim text-xs tabular-nums w-[12ch]">({fmtDinero(getDineroPs(data))}/s)</span>}
        </div>
        <MenuButton data={data} onReset={onReset} />
      </div>
    </div>
  );
}
