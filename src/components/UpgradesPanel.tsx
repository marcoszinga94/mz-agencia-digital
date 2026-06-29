import type { GameData, Upgrade } from '../game/types';
import { UPGRADES } from '../game/data';
import { fmtDinero, fmtNum, getLocClick, getPdClick, getTraficoClick, getLocPs, getPdPs, getTraficoPs } from '../game/logic';

interface Props { data: GameData; onBuy: (id: string) => void }

const AREAS = [
  { key: 'dev', icon: '💻', label: 'Desarrollo' },
  { key: 'dis', icon: '🎨', label: 'Diseño' },
  { key: 'mkt', icon: '📊', label: 'Marketing' },
] as const;

const CURRENT_TOTALS: Record<string, (d: GameData) => string> = {
  loc_click: d => `${fmtNum(getLocClick(d))}`,
  pd_click: d => `${fmtNum(getPdClick(d))}`,
  trafico_click: d => `${fmtNum(getTraficoClick(d))}`,
  loc_ps: d => `${fmtNum(getLocPs(d))}/s`,
  pd_ps: d => `${fmtNum(getPdPs(d))}/s`,
  trafico_ps: d => `${fmtNum(getTraficoPs(d))}/s`,
};

function UpgradeRow({ name, desc, cost, effect_type, effect_value, owned, canAfford, totalStr, onBuy }: {
  name: string; desc: string; cost: number; effect_type: string; effect_value: number; owned: boolean; canAfford: boolean; totalStr: string; onBuy: () => void
}) {
  return (
    <div className={`group flex items-center gap-2 px-2.5 py-2 rounded-md transition-all ${
      owned ? 'bg-accent-green/5' : 'hover:bg-surface-hover'
    }`}>
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-medium leading-tight ${owned ? 'text-accent-green' : 'text-text'}`}>
          {name}
          <span className={`ml-1.5 text-[13px] font-mono ${owned ? 'text-accent-green/60' : 'text-accent'}`}>+{effect_value}</span>
        </div>
        <div className="text-xs text-text-dim leading-tight mt-0.5">{desc}</div>
      </div>
      <div className="text-right shrink-0">
        <div className={`text-xs font-mono ${owned ? 'text-accent-green/60' : 'text-text-dim/60'}`}>total: {totalStr}</div>
        <div className={`text-xs font-mono ${owned ? 'text-accent-green' : 'text-text-dim'}`}>{fmtDinero(cost)}</div>
      </div>
      <button onClick={onBuy} disabled={owned || !canAfford}
        className={`text-xs font-medium px-2 py-0.5 rounded border shrink-0 transition-all cursor-pointer ${
          owned
            ? 'border-accent-green/30 text-accent-green bg-accent-green/10'
            : 'border-accent/30 text-accent bg-accent/10 hover:bg-accent/20 group-hover:border-accent/50'
        } disabled:opacity-25 disabled:cursor-not-allowed`}
      >{owned ? '✓' : 'Buy'}</button>
    </div>
  );
}

function UpgradeList({ upgs, data, onBuy }: { upgs: Upgrade[]; data: GameData; onBuy: (id: string) => void }) {
  return (
    <>
      {upgs.map(upg => (
        <UpgradeRow key={upg.id}
          name={upg.name} desc={upg.desc}
          cost={upg.cost} effect_type={upg.effect_type} effect_value={upg.effect_value}
          owned={data.upgrades.includes(upg.id)}
          canAfford={data.dinero >= upg.cost}
          totalStr={CURRENT_TOTALS[upg.effect_type]?.(data) ?? ''}
          onBuy={() => onBuy(upg.id)}
        />
      ))}
    </>
  );
}

export default function UpgradesPanel({ data, onBuy }: Props) {
  return (
    <div className="flex flex-col min-h-0 h-full">
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="grid grid-cols-3 divide-x divide-surface-border h-full">
          {AREAS.map(area => {
            const clickUpgs = UPGRADES.filter(u => u.area === area.key && u.effect_type.endsWith('_click'));
            const psUpgs = UPGRADES.filter(u => u.area === area.key && u.effect_type.endsWith('_ps'));
            return (
              <div key={area.key} className="flex flex-col min-h-0">
                <div className="px-3 py-1.5 border-b border-surface-border bg-surface/50 shrink-0">
                  <span className="text-[13px] font-semibold text-text-muted">{area.icon} {area.label}</span>
                </div>
                <div className="py-1">
                  {clickUpgs.length > 0 && (
                    <div className="px-3 py-1 mt-1">
                      <span className="text-[13px] font-semibold uppercase tracking-wider text-text-dim/60">Click</span>
                    </div>
                  )}
                  <UpgradeList upgs={clickUpgs} data={data} onBuy={onBuy} />
                  {psUpgs.length > 0 && (
                    <div className="px-3 py-1 mt-1 border-t border-surface-border/40">
                      <span className="text-[13px] font-semibold uppercase tracking-wider text-text-dim/60">Por segundo</span>
                    </div>
                  )}
                  <UpgradeList upgs={psUpgs} data={data} onBuy={onBuy} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
