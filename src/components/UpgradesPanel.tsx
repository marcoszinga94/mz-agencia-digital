import type { GameData, Upgrade } from '../game/types';
import { UPGRADES } from '../game/data';
import { fmtDinero, fmtNum, getLocClick, getPdClick, getTraficoClick, getLocPs, getPdPs, getTraficoPs } from '../game/logic';

interface Props { data: GameData; onBuy: (id: string) => void }

const AREAS = [
  { key: 'dev', icon: '💻', label: 'Desarrollo', color: 'accent' },
  { key: 'dis', icon: '🎨', label: 'Diseño', color: 'accent-pink' },
  { key: 'mkt', icon: '📊', label: 'Marketing', color: 'accent-cyan' },
] as const;

const CURRENT_TOTALS: Record<string, (d: GameData) => string> = {
  loc_click: d => `${fmtNum(getLocClick(d))}`,
  pd_click: d => `${fmtNum(getPdClick(d))}`,
  trafico_click: d => `${fmtNum(getTraficoClick(d))}`,
  loc_ps: d => `${fmtNum(getLocPs(d))}/s`,
  pd_ps: d => `${fmtNum(getPdPs(d))}/s`,
  trafico_ps: d => `${fmtNum(getTraficoPs(d))}/s`,
};

function UpgradeRow({ name, desc, cost, effect_value, owned, canAfford, totalStr, onBuy }: {
  name: string; desc: string; cost: number; effect_value: number; owned: boolean; canAfford: boolean; totalStr: string; onBuy: () => void;
}) {
  return (
    <div className={`group flex items-center gap-3 px-2.5 py-2 rounded-lg border transition-all duration-200 ${
      owned
        ? 'bg-accent-green/5 border-accent-green/20'
        : canAfford
          ? 'bg-surface-card/30 border-surface-border/50 hover:bg-surface-hover/60 hover:border-accent/30'
          : 'bg-surface-card/20 border-surface-border/30 opacity-70'
    }`}>
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-semibold leading-tight ${owned ? 'text-accent-green' : 'text-text'}`}>
          {name}
        </div>
        <div className="text-[11px] text-text-dim leading-tight mt-0.5">{desc}</div>
      </div>
      <div className="text-right shrink-0">
        <div className={`text-[10px] font-mono ${owned ? 'text-accent-green/60' : 'text-text-dim/60'}`}>total {totalStr}</div>
        <div className={`text-xs font-mono font-semibold ${owned ? 'text-accent-green' : canAfford ? 'text-accent-green' : 'text-accent-red'}`}>{fmtDinero(cost)}</div>
      </div>
      <button onClick={onBuy} disabled={owned || !canAfford}
        className={`btn text-xs px-2.5 py-1 rounded-lg shrink-0 disabled:opacity-25 ${
          owned
            ? 'bg-accent-green/10 text-accent-green border border-accent-green/30'
            : 'btn-primary'
        }`}
      >{owned ? '✓' : 'Comprar'}</button>
    </div>
  );
}

function UpgradeList({ upgs, data, onBuy }: { upgs: Upgrade[]; data: GameData; onBuy: (id: string) => void }) {
  return (
    <div className="flex flex-col gap-1">
      {upgs.map(upg => (
        <UpgradeRow key={upg.id}
          name={upg.name} desc={upg.desc}
          cost={upg.cost} effect_value={upg.effect_value}
          owned={data.upgrades.includes(upg.id)}
          canAfford={data.dinero >= upg.cost}
          totalStr={CURRENT_TOTALS[upg.effect_type]?.(data) ?? ''}
          onBuy={() => onBuy(upg.id)}
        />
      ))}
    </div>
  );
}

export default function UpgradesPanel({ data, onBuy }: Props) {
  return (
    <div className="flex flex-col min-h-0 h-full">
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-surface-border h-full">
          {AREAS.map(area => {
            const clickUpgs = UPGRADES.filter(u => u.area === area.key && u.effect_type.endsWith('_click'));
            const psUpgs = UPGRADES.filter(u => u.area === area.key && u.effect_type.endsWith('_ps'));
            return (
              <div key={area.key} className="flex flex-col min-h-0">
                <div className="px-3 py-2 border-b border-surface-border bg-surface/50 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{area.icon}</span>
                    <span className={`text-[13px] font-bold text-${area.color}`}>{area.label}</span>
                  </div>
                </div>
                <div className="py-2 px-1.5">
                  {clickUpgs.length > 0 && (
                    <div className="px-2 py-1 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-text-dim">Por click</span>
                    </div>
                  )}
                  <UpgradeList upgs={clickUpgs} data={data} onBuy={onBuy} />
                  {psUpgs.length > 0 && (
                    <div className="px-2 py-1 mt-2 border-t border-surface-border/40">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-text-dim">Por segundo</span>
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
