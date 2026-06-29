import { useState } from 'react';
import type { GameData } from '../game/types';
import UpgradesPanel from './UpgradesPanel';
import PrestigePanel from './PrestigePanel';

interface Props {
  data: GameData;
  onBuy: (id: string) => void;
  onRebrand: () => void;
  onBuyPrestige: (id: string) => void;
  onAscend: () => void;
}

type Tab = 'upgrades' | 'prestige';

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'upgrades', label: 'Upgrades', icon: '⚡' },
  { key: 'prestige', label: 'Prestige', icon: '⭐' },
];

export default function ShopTabs({ data, onBuy, onRebrand, onBuyPrestige, onAscend }: Props) {
  const [tab, setTab] = useState<Tab>('upgrades');

  return (
    <div className="game-panel rounded-lg border border-surface-border bg-surface-card flex flex-col min-h-0 h-full overflow-hidden">
      <div className="flex border-b border-surface-border shrink-0">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`game-btn flex-1 text-[13px] font-semibold py-2 transition-all duration-200 cursor-pointer ${
              tab === t.key
                ? 'text-accent border-b-2 border-accent bg-accent/5'
                : 'text-text-muted hover:text-text hover:bg-surface-hover'
            }`}
          >{t.icon} {t.label}</button>
        ))}
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        {tab === 'upgrades' && <UpgradesPanel data={data} onBuy={onBuy} />}
        {tab === 'prestige' && <PrestigePanel data={data} onRebrand={onRebrand} onBuyPrestige={onBuyPrestige} onAscend={onAscend} />}
      </div>
    </div>
  );
}
