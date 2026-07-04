import type { GameData } from '../game/types';
import { PRESTIGIO_UPGRADES } from '../game/data';
import { getPrestigeUpgradeCost } from '../game/logic';

interface Props { data: GameData; onBuyPrestige: (id: string) => void; onClose: () => void }

const BRANCHES = ['Producción', 'Talento', 'Proyectos', 'Equipamiento', 'Seguidores', 'Click', 'Prestige', 'Recursos', 'Asc Poder', 'Asc Sabiduría', 'Asc Proyectos', 'Asc Recursos'] as const;
const BRANCH_ICONS: Record<string, string> = {
  Producción: '⚙️', Talento: '👥', Proyectos: '📋', Equipamiento: '🛠️',
  Seguidores: '📢', Click: '🖱️', Prestige: '👑', Recursos: '📦',
  'Asc Poder': '💪', 'Asc Sabiduría': '🧠', 'Asc Proyectos': '🚀', 'Asc Recursos': '⚡',
};

const BRANCH_COLORS: Record<string, string> = {
  Producción: '#58a6ff',
  Talento: '#d29922',
  Proyectos: '#3fb950',
  Equipamiento: '#bc8cff',
  Seguidores: '#39d2c0',
  Click: '#f778ba',
  Prestige: '#d29922',
  'Asc Poder': '#79c0ff',
  'Asc Sabiduría': '#39d2c0',
  'Asc Proyectos': '#3fb950',
  'Asc Recursos': '#f778ba',
};

export default function SkillTreeModal({ data, onBuyPrestige, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="card w-full max-w-[1200px] max-h-[90vh] flex flex-col animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-3 border-b border-surface-border shrink-0 bg-surface/50">
          <div className="flex items-center gap-3">
            <span className="text-xl">🌀</span>
            <div>
              <div className="text-base font-bold text-text">Árbol de Skills</div>
              <div className="text-[11px] text-text-dim">
                {data.prestigeUpgrades.length}/{PRESTIGIO_UPGRADES.length} desbloqueadas · {data.prestigePoints} PP disponibles
              </div>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg bg-surface-hover text-text-dim hover:text-text hover:bg-surface-border transition-all text-lg leading-none">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {BRANCHES.map(branchKey => {
              const upgs = PRESTIGIO_UPGRADES.filter(u => u.branch === branchKey).sort((a, b) => a.tier - b.tier);
              if (upgs.length === 0) return null;
              const ownedInBranch = upgs.filter(u => data.prestigeUpgrades.includes(u.id)).length;
              const branchLocked = branchKey.startsWith('Asc ') && !data.ascended;
              const color = BRANCH_COLORS[branchKey];

              return (
                <div key={branchKey} className="flex flex-col items-center p-2 rounded-xl border border-surface-border/50 bg-surface-card/40">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-sm">{BRANCH_ICONS[branchKey]}</span>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color }}>{branchKey}</span>
                  </div>
                  <div className="text-[10px] text-text-dim mb-2">{ownedInBranch}/{upgs.length}</div>

                  {branchLocked && (
                    <div className="text-[10px] text-accent-orange font-medium mb-2 px-2 py-1 rounded-lg bg-accent-orange/10 border border-accent-orange/20 text-center">
                      Completa las {PRESTIGIO_UPGRADES.filter(u => !u.requiredAscended).length} habilidades
                    </div>
                  )}

                  <div className="flex flex-col items-center gap-1 w-full">
                    {upgs.map((pup, i) => {
                      const owned = data.prestigeUpgrades.includes(pup.id);
                      const cost = getPrestigeUpgradeCost(pup);
                      const canBuy = data.prestigePoints >= cost && !owned;
                      const locked = branchLocked
                        || pup.requiredAscended && !data.ascended
                        || pup.requires && pup.requires.some(r => !data.prestigeUpgrades.includes(r));

                      return (
                        <div key={pup.id} className="flex flex-col items-center w-full">
                          {i > 0 && (
                            <div className="w-0.5 h-3 rounded-full" style={{ background: owned ? color : '#30363d' }} />
                          )}
                          <button onClick={() => onBuyPrestige(pup.id)} disabled={owned || locked || !canBuy}
                            className="group relative w-full"
                          >
                            <div className="px-2 py-2 rounded-xl border text-center transition-all duration-200 hover:brightness-110"
                              style={{
                                borderColor: owned || canBuy ? color : 'rgba(48, 54, 61, 0.5)',
                                background: owned ? `${color}15` : canBuy ? 'rgba(22, 27, 34, 0.6)' : 'rgba(13, 17, 23, 0.4)',
                                color: owned || canBuy ? color : 'rgba(139, 148, 158, 0.6)',
                                opacity: locked && !owned ? 0.5 : 1,
                                cursor: owned || locked || !canBuy ? 'not-allowed' : 'pointer'
                              }}
                            >
                              <div className="text-xs font-bold leading-tight">{pup.name}</div>
                              <div className="text-[10px] leading-tight opacity-80 mt-0.5">{pup.desc}</div>
                              <div className="text-[11px] font-mono font-bold mt-1" style={{ color: owned || canBuy ? color : 'rgba(139, 148, 158, 0.6)' }}>
                                {owned ? '✓' : locked ? '🔒' : `${cost} PP`}
                              </div>
                            </div>
                            {pup.requires && !owned && !branchLocked && (
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 rounded-lg bg-surface-card border border-surface-border
                                text-[10px] text-text-dim whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                                Requiere: {pup.requires.map(r => PRESTIGIO_UPGRADES.find(p => p.id === r)?.name).join(' → ')}
                              </div>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
