import { fmtNum } from '../game/logic';
import { PRESTIGIO_UPGRADES, PROYECTOS } from '../game/data';
import type { GameData } from '../game/types';

interface Props {
  data: GameData;
  onConfirm: () => void;
  onClose: () => void;
}

export default function AscendModal({ data, onConfirm, onClose }: Props) {
  const newProjects = PROYECTOS.filter(p => p.requiredAscended);
  const newSkills = PRESTIGIO_UPGRADES.filter(s => s.requiredAscended);
  const branches = [...new Set(newSkills.map(s => s.branch))];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="card p-6 max-w-md w-full mx-4 animate-fade-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🌀</span>
          <h2 className="text-lg font-bold text-text">Ascensión</h2>
        </div>
        <p className="text-xs text-text-muted mb-4">Has dominado todas las habilidades. Es hora de ascender.</p>

        <div className="space-y-3 mb-4">
          <div>
            <div className="section-title mb-2"><span className="text-accent-green">◆</span> Nuevos proyectos</div>
            <div className="space-y-1.5">
              {newProjects.map(p => (
                <div key={p.id} className="flex justify-between items-center text-xs px-3 py-2 rounded-lg bg-surface-card/60 border border-surface-border/50">
                  <span className="font-medium text-text">{p.name}</span>
                  <span className="text-text-dim">{fmtNum(p.loc_required)} LoC · {fmtNum(p.work_required)} work</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="section-title mb-2"><span className="text-accent-blue">◆</span> Nuevas habilidades ({newSkills.length})</div>
            <div className="space-y-1.5">
              {branches.map(b => (
                <div key={b} className="flex justify-between items-center text-xs px-3 py-2 rounded-lg bg-surface-card/60 border border-surface-border/50">
                  <span className="font-medium text-accent-blue">{b}</span>
                  <span className="text-text-dim">{newSkills.filter(s => s.branch === b).length} habilidades</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-accent-orange mb-4 font-medium text-center">
          Se reiniciará TODO excepto las habilidades de Ascensión.
        </p>

        <div className="flex gap-2">
          <button onClick={onClose} className="btn btn-secondary flex-1 px-4 py-2 text-xs">
            Cancelar
          </button>
          <button onClick={onConfirm} className="btn flex-1 px-4 py-2 text-xs"
            style={{
              background: 'linear-gradient(135deg, rgba(121, 192, 255, 0.2), rgba(188, 140, 255, 0.15))',
              border: '1px solid rgba(121, 192, 255, 0.5)',
              color: '#79c0ff'
            }}
          >
            ¡Ascender!
          </button>
        </div>
      </div>
    </div>
  );
}
