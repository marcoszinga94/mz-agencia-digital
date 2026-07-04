import type { GameData } from '../game/types';
import { fmtNum, fmtDinero, getLocClick, getPdClick, getTraficoClick, getLocPs, getPdPs, getTraficoPs, getClickDineroMult } from '../game/logic';

interface Props { data: GameData; onDev: () => void; onDis: () => void; onMkt: () => void }

const BUTTONS = [
  { key: 'dev', icon: '💻', label: 'Codificar', res: 'LoC', color: 'accent', hover: 'hover:border-accent/50 hover:shadow-[0_0_16px_rgba(88,166,255,0.15)]', glow: 'group-hover:shadow-[0_0_12px_rgba(88,166,255,0.3)]' },
  { key: 'dis', icon: '🎨', label: 'Diseñar', res: 'PD', color: 'accent-pink', hover: 'hover:border-accent-pink/50 hover:shadow-[0_0_16px_rgba(247,120,186,0.15)]', glow: 'group-hover:shadow-[0_0_12px_rgba(247,120,186,0.3)]' },
  { key: 'mkt', icon: '📢', label: 'Marketing', res: 'Tráfico', color: 'accent-cyan', hover: 'hover:border-accent-cyan/50 hover:shadow-[0_0_16px_rgba(57,210,192,0.15)]', glow: 'group-hover:shadow-[0_0_12px_rgba(57,210,192,0.3)]' },
] as const;

function ClickBtn({ data, type, onClick }: {
  data: GameData;
  type: typeof BUTTONS[number];
  onClick: () => void;
}) {
  const clickMap = {
    dev: getLocClick(data),
    dis: getPdClick(data),
    mkt: getTraficoClick(data),
  };
  const psMap = {
    dev: getLocPs(data),
    dis: getPdPs(data),
    mkt: getTraficoPs(data),
  };
  const moneyPerClick = 0.1 * getClickDineroMult(data);

  return (
    <button onClick={onClick}
      className={`group relative flex flex-1 items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-surface-border bg-surface-card
        transition-all duration-200 cursor-pointer overflow-hidden
        hover:-translate-y-0.5 hover:bg-surface-hover ${type.hover}`}
    >
      <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-${type.color}/10 border border-${type.color}/20 text-xl sm:text-2xl transition-all duration-200 ${type.glow}`}>
        {type.icon}
      </div>
      <div className="flex-1 text-left min-w-0">
        <div className="font-bold text-xs sm:text-sm text-text group-hover:text-white transition-colors truncate">{type.label}</div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-text-muted mt-0.5">
          <span className={`font-semibold text-${type.color}`}>+{fmtNum(clickMap[type.key])} {type.res}</span>
          <span className="text-accent-green">+{fmtDinero(moneyPerClick)}</span>
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="hidden sm:block text-[10px] text-text-dim uppercase tracking-wider">generando</div>
        <div className={`text-xs font-bold text-${type.color}`}>{fmtNum(psMap[type.key])}/s</div>
      </div>
    </button>
  );
}

export default function ClickButtons({ data, onDev, onDis, onMkt }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
      <ClickBtn data={data} type={BUTTONS[0]} onClick={onDev} />
      <ClickBtn data={data} type={BUTTONS[1]} onClick={onDis} />
      <ClickBtn data={data} type={BUTTONS[2]} onClick={onMkt} />
    </div>
  );
}
