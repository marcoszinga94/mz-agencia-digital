import type { GameData } from '../game/types';
import { fmtNum, getLocClick, getPdClick, getTraficoClick, getLocPs, getPdPs, getTraficoPs } from '../game/logic';

interface Props { data: GameData; onDev: () => void; onDis: () => void; onMkt: () => void }

function Btn({ icon, label, info, perSec, onClick }: {
  icon: string; label: string; info: string; perSec: string; onClick: () => void
}) {
  return (
    <button onClick={onClick}
      className="game-btn flex flex-1 items-center gap-3 px-4 py-2.5 rounded-lg border border-surface-border bg-surface-card
        hover:bg-surface-hover hover:border-accent/40 active:scale-[0.98] transition-all duration-150 cursor-pointer group"
    >
      <span className="text-xl">{icon}</span>
      <div className="flex-1 text-left">
        <div className="font-semibold text-sm text-text group-hover:text-white transition-colors">{label}</div>
        <div className="flex gap-3 text-[13px] text-text-muted">
          <span>+{info}</span>
          <span className="text-accent-green">+$0.10</span>
        </div>
      </div>
      <div className="text-right">
        <div className="text-xs text-text-dim">generating</div>
        <div className="text-xs font-medium text-accent">{perSec}/s</div>
      </div>
    </button>
  );
}

export default function ClickButtons({ data, onDev, onDis, onMkt }: Props) {
  return (
    <div className="flex gap-1.5">
      <Btn icon="💻" label="./codificar.sh" info={`${fmtNum(getLocClick(data))} LoC`} perSec={fmtNum(getLocPs(data))} onClick={onDev} />
      <Btn icon="🎨" label="./disenar.sh" info={`${fmtNum(getPdClick(data))} PD`} perSec={fmtNum(getPdPs(data))} onClick={onDis} />
      <Btn icon="📢" label="./marketing.sh" info={`${fmtNum(getTraficoClick(data))} Tráfico`} perSec={fmtNum(getTraficoPs(data))} onClick={onMkt} />
    </div>
  );
}
