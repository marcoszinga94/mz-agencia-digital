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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-surface-card border border-surface-border rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-base font-bold text-text mb-1">🌀 Ascensión</h2>
        <p className="text-xs text-text-muted mb-4">Has dominado todas las habilidades. Es hora de ascender.</p>

        <div className="space-y-3 mb-4">
          <div>
            <div className="text-xs font-semibold text-text mb-1.5">🔓 Nuevos proyectos</div>
            <div className="space-y-1">
              {newProjects.map(p => (
                <div key={p.id} className="flex justify-between text-xs text-text-muted bg-surface-hover rounded px-2 py-1">
                  <span>{p.name}</span>
                  <span className="text-text-dim">{fmtNum(p.loc_required)} LoC / {fmtNum(p.work_required)} work</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-text mb-1.5">🌀 Nuevas habilidades ({newSkills.length})</div>
            <div className="space-y-1">
              {branches.map(b => (
                <div key={b} className="text-xs text-text-muted bg-surface-hover rounded px-2 py-1">
                  <span className="font-medium text-accent-blue">{b}</span>
                  <span className="text-text-dim ml-2">{newSkills.filter(s => s.branch === b).length} habilidades</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-accent-orange mb-4 font-medium">Se reiniciará TODO: recursos, upgrades, equipo, proyectos, PP y habilidades de prestigio base. Solo se conservan las habilidades de Ascensión.</p>

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 px-4 py-1.5 rounded-lg bg-surface-hover text-text text-xs font-medium hover:brightness-110 transition-all">
            Cancelar
          </button>
          <button onClick={onConfirm} className="flex-1 px-4 py-1.5 rounded-lg bg-accent-blue text-white text-xs font-medium hover:bg-accent-blue/80 transition-all">
            ¡Ascender!
          </button>
        </div>
      </div>
    </div>
  );
}
