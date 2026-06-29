import type { GameData } from '../game/types';
import { PRESTIGIO_UPGRADES } from '../game/data';

interface Props { data: GameData; onBuyPrestige: (id: string) => void; onClose: () => void }

const BRANCHES = ['Producción', 'Talento', 'Proyectos', 'Equipamiento', 'Seguidores', 'Click', 'Prestige', 'Recursos', 'Asc Poder', 'Asc Sabiduría', 'Asc Proyectos', 'Asc Recursos'] as const;
const BRANCH_ICONS: Record<string, string> = {
  Producción: '⚙️', Talento: '👥', Proyectos: '📋', Equipamiento: '🛠️',
  Seguidores: '📢', Click: '🖱️', Prestige: '👑', Recursos: '📦',
  'Asc Poder': '💪', 'Asc Sabiduría': '🧠', 'Asc Proyectos': '🚀', 'Asc Recursos': '⚡',
};

function branchColor(key: string, owned: boolean, locked: boolean, canBuy: boolean): string {
  if (owned) {
    if (key === 'Producción') return 'border-accent bg-accent/10 text-accent';
    if (key === 'Talento') return 'border-accent-orange bg-accent-orange/10 text-accent-orange';
    if (key === 'Proyectos') return 'border-accent-green bg-accent-green/10 text-accent-green';
    if (key === 'Equipamiento') return 'border-accent-purple bg-accent-purple/10 text-accent-purple';
    if (key === 'Seguidores') return 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan';
    if (key === 'Click') return 'border-accent-pink bg-accent-pink/10 text-accent-pink';
    if (key === 'Prestige') return 'border-accent-orange bg-accent-orange/10 text-accent-orange';
    if (key === 'Asc Poder') return 'border-accent-blue bg-accent-blue/10 text-accent-blue';
    if (key === 'Asc Sabiduría') return 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan';
    if (key === 'Asc Proyectos') return 'border-accent-green bg-accent-green/10 text-accent-green';
    if (key === 'Asc Recursos') return 'border-accent-pink bg-accent-pink/10 text-accent-pink';
    return 'border-accent-blue bg-accent-blue/10 text-accent-blue';
  }
  if (locked) return 'border-surface-border bg-surface/30 text-text-dim/40';
  if (canBuy) {
    if (key === 'Producción') return 'border-accent/60 bg-accent/5 text-accent hover:brightness-125';
    if (key === 'Talento') return 'border-accent-orange/60 bg-accent-orange/5 text-accent-orange hover:brightness-125';
    if (key === 'Proyectos') return 'border-accent-green/60 bg-accent-green/5 text-accent-green hover:brightness-125';
    if (key === 'Equipamiento') return 'border-accent-purple/60 bg-accent-purple/5 text-accent-purple hover:brightness-125';
    if (key === 'Seguidores') return 'border-accent-cyan/60 bg-accent-cyan/5 text-accent-cyan hover:brightness-125';
    if (key === 'Click') return 'border-accent-pink/60 bg-accent-pink/5 text-accent-pink hover:brightness-125';
    if (key === 'Prestige') return 'border-accent-orange/60 bg-accent-orange/5 text-accent-orange hover:brightness-125';
    if (key === 'Asc Poder') return 'border-accent-blue/60 bg-accent-blue/5 text-accent-blue hover:brightness-125';
    if (key === 'Asc Sabiduría') return 'border-accent-cyan/60 bg-accent-cyan/5 text-accent-cyan hover:brightness-125';
    if (key === 'Asc Proyectos') return 'border-accent-green/60 bg-accent-green/5 text-accent-green hover:brightness-125';
    if (key === 'Asc Recursos') return 'border-accent-pink/60 bg-accent-pink/5 text-accent-pink hover:brightness-125';
    return 'border-accent-blue/60 bg-accent-blue/5 text-accent-blue hover:brightness-125';
  }
  return 'border-surface-border bg-surface/50 text-text-dim';
}

function connColor(key: string, owned: boolean): string {
  if (!owned) return 'bg-surface-border';
  if (key === 'Producción') return 'bg-accent';
  if (key === 'Talento') return 'bg-accent-orange';
  if (key === 'Proyectos') return 'bg-accent-green';
  if (key === 'Equipamiento') return 'bg-accent-purple';
  if (key === 'Seguidores') return 'bg-accent-cyan';
  if (key === 'Click') return 'bg-accent-pink';
  if (key === 'Prestige') return 'bg-accent-orange';
  if (key === 'Asc Sabiduría') return 'bg-accent-cyan';
  if (key === 'Asc Proyectos') return 'bg-accent-green';
  if (key === 'Asc Recursos') return 'bg-accent-pink';
  return 'bg-accent-blue';
}

export default function SkillTreeModal({ data, onBuyPrestige, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-surface-card border border-surface-border rounded-xl shadow-2xl w-full max-w-[1200px] max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-3 border-b border-surface-border shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-text">🌀 Skill Tree</span>
            <span className="text-sm text-text-dim">{data.prestigeUpgrades.length}/{PRESTIGIO_UPGRADES.length} unlocked</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-accent-purple">{data.prestigePoints} PP</span>
            <button onClick={onClose}
              className="text-xl text-text-dim hover:text-text transition-colors cursor-pointer leading-none">&times;</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-4 gap-4">
            {BRANCHES.map(branchKey => {
              const upgs = PRESTIGIO_UPGRADES.filter(u => u.branch === branchKey).sort((a, b) => a.tier - b.tier);
              if (upgs.length === 0) return null;
              const ownedInBranch = upgs.filter(u => data.prestigeUpgrades.includes(u.id)).length;
              const branchLocked = branchKey.startsWith('Asc ') && !data.ascended;
              const icon = BRANCH_ICONS[branchKey] ?? '❓';

              return (
                <div key={branchKey} className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5 text-sm font-semibold mb-1">
                    <span>{icon}</span>
                    <span>{branchKey}</span>
                  </div>
                  <div className="text-[11px] text-text-dim/60 mb-3">{ownedInBranch}/{upgs.length}</div>
                  {branchLocked && (
                    <div className="text-[11px] text-accent-orange font-medium mb-2 px-2 py-1 rounded bg-accent-orange/10 border border-accent-orange/20 text-center leading-tight">
                      Completa las 52 habilidades para desbloquear
                    </div>
                  )}
                  <div className="flex flex-col items-center">
                    {upgs.map((pup, i) => {
                      const owned = data.prestigeUpgrades.includes(pup.id);
                      const canBuy = data.prestigePoints >= pup.cost && !owned;
                      const locked = pup.requiredAscended && !data.ascended
                        || pup.requires && pup.requires.some(r => !data.prestigeUpgrades.includes(r));

                      return (
                        <div key={pup.id} className="flex flex-col items-center">
                          {i > 0 && (
                            <div className={`w-0.5 h-4 rounded-full ${connColor(branchKey, owned)}`} />
                          )}
                          <button onClick={() => onBuyPrestige(pup.id)}
                            disabled={owned || locked || !canBuy}
                            className="group relative"
                          >
                            <div className={`w-full px-3 py-2.5 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer
                              min-w-[7rem] ${branchColor(branchKey, owned, locked, canBuy)} disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              <div className="text-sm font-bold leading-tight mb-0.5">{pup.name}</div>
                              <div className="text-[11px] leading-tight opacity-80">{pup.desc}</div>
                              <div className={`text-xs font-mono font-semibold mt-1.5 ${
                                owned
                                  ? branchKey === 'Producción' ? 'text-accent' : branchKey === 'Talento' ? 'text-accent-orange' : branchKey === 'Proyectos' ? 'text-accent-green' : branchKey === 'Equipamiento' ? 'text-accent-purple' : branchKey === 'Seguidores' ? 'text-accent-cyan' : branchKey === 'Click' ? 'text-accent-pink' : branchKey === 'Prestige' ? 'text-accent-orange' : branchKey === 'Asc Poder' ? 'text-accent-blue' : branchKey === 'Asc Sabiduría' ? 'text-accent-cyan' : branchKey === 'Asc Proyectos' ? 'text-accent-green' : branchKey === 'Asc Recursos' ? 'text-accent-pink' : 'text-accent-blue'
                                  : locked ? 'text-text-dim/40'
                                  : branchKey === 'Producción' ? 'text-accent' : branchKey === 'Talento' ? 'text-accent-orange' : branchKey === 'Proyectos' ? 'text-accent-green' : branchKey === 'Equipamiento' ? 'text-accent-purple' : branchKey === 'Seguidores' ? 'text-accent-cyan' : branchKey === 'Click' ? 'text-accent-pink' : branchKey === 'Prestige' ? 'text-accent-orange' : branchKey === 'Asc Poder' ? 'text-accent-blue' : branchKey === 'Asc Sabiduría' ? 'text-accent-cyan' : branchKey === 'Asc Proyectos' ? 'text-accent-green' : branchKey === 'Asc Recursos' ? 'text-accent-pink' : 'text-accent-blue'
                              }`}>
                                {owned ? '✓ OWNED' : locked ? '🔒 LOCKED' : `${pup.cost} PP`}
                              </div>
                            </div>
                            {pup.requires && !owned && !branchLocked && (
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 rounded bg-surface-card border border-surface-border
                                text-[11px] text-text-dim whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                                Requires: {pup.requires.map(r => PRESTIGIO_UPGRADES.find(p => p.id === r)?.name).join(' → ')}
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
