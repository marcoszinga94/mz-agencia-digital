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
  onOpenSkillTree: () => void;
}

type Tab = 'upgrades' | 'prestige';

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'upgrades', label: 'Mejoras', icon: '⚡' },
  { key: 'prestige', label: 'Prestige', icon: '⭐' },
];

export default function ShopTabs({ data, onBuy, onRebrand, onBuyPrestige, onAscend, onOpenSkillTree }: Props) {
  const [tab, setTab] = useState<Tab>('upgrades');

  return (
    <div className="game-panel card flex flex-col min-h-0 h-full overflow-hidden">
      <div className="flex items-center border-b border-surface-border shrink-0 p-1 gap-1">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`game-btn flex-1 text-[13px] font-semibold py-2 rounded-lg transition-all duration-200 cursor-pointer ${
              tab === t.key
                ? 'bg-accent/10 text-accent border border-accent/30'
                : 'text-text-muted hover:text-text hover:bg-surface-hover'
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        {tab === 'upgrades' && <UpgradesPanel data={data} onBuy={onBuy} />}
        {tab === 'prestige' && <PrestigePanel data={data} onRebrand={onRebrand} onBuyPrestige={onBuyPrestige} onAscend={onAscend} onOpenSkillTree={onOpenSkillTree} />}
      </div>
    </div>
  );
}
