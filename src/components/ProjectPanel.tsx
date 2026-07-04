import type { GameData } from '../game/types';
import { PROYECTOS } from '../game/data';
import { fmtNum, fmtDinero, getProjectSpeed, getProjectDineroMult, getProjectCostDiscount, getProjectReputation } from '../game/logic';

interface Props { data: GameData; onStartProject: (id: string) => void; onCancelProject: () => void; autoProject: boolean; onToggleAutoProject: () => void }

export default function ProjectPanel({ data, onStartProject, onCancelProject, autoProject, onToggleAutoProject }: Props) {
  const speed = getProjectSpeed(data);

  return (
    <div className="game-panel card flex flex-col p-3 min-h-0 h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="section-title project-drag-handle cursor-grab">
          <span className="text-accent">◆</span> Proyectos
        </div>
        <button onClick={onToggleAutoProject}
          className={`btn text-xs px-2.5 py-1 rounded-lg border transition-all ${
            autoProject
              ? 'border-accent bg-accent/15 text-accent hover:bg-accent/25'
              : 'border-surface-border text-text-dim hover:text-text hover:bg-surface-hover'
          }`}
        >
          <span>{autoProject ? '🔁' : '🔁'}</span>
          <span>{autoProject ? 'Auto: ON' : 'Auto'}</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-2 pr-1">
        {PROYECTOS.filter(proj => !proj.requiredAscended || data.ascended).map(proj => {
          const isActive = data.activeProject === proj.id;
          const discount = getProjectCostDiscount(data);
          const mult = getProjectDineroMult(data);
          const rep = getProjectReputation(proj, data);
          const costo = Math.floor(proj.costo_dinero * discount);
          const reward = Math.floor(proj.reward_dinero * mult);
          const canStart = !isActive && !data.activeProject
            && data.dinero >= costo
            && data.loc >= proj.loc_required
            && data.pd >= proj.pd_required
            && data.trafico >= proj.trafico_required;
          const hasDinero = data.dinero >= costo;
          const hasLoc = data.loc >= proj.loc_required;
          const hasPd = data.pd >= proj.pd_required;
          const hasTrafico = data.trafico >= proj.trafico_required;
          const progressPct = Math.min(100, (data.projectProgress / proj.work_required) * 100);

          return (
            <div key={proj.id}
              className={`relative grid grid-rows-[auto_auto_1fr_auto_auto] gap-1 px-3 py-2 rounded-xl border transition-all duration-200 min-h-[7.5rem] ${
                isActive
                  ? 'border-accent bg-accent/5 glow-blue'
                  : 'border-surface-border bg-surface-card/40 hover:bg-surface-hover/60 hover:border-surface-border/80'
              }`}
            >
              {/* Fila 1: nombre + estado/acción */}
              <div className="flex items-center gap-2 min-h-[1.5rem]">
                <span className="font-bold text-sm text-text flex-1 truncate">{proj.name}</span>
                <div className="shrink-0 w-20 text-right">
                  {isActive && <span className="badge badge-blue animate-pulse">ACTIVO</span>}
                  {!isActive && canStart && (
                    <button onClick={() => onStartProject(proj.id)}
                      className="btn btn-primary text-xs px-3 py-1 rounded-lg w-full"
                    >Iniciar</button>
                  )}
                  {!isActive && !canStart && data.activeProject === null && (
                    <span className="text-[10px] text-text-dim uppercase tracking-wider">Bloqueado</span>
                  )}
                </div>
              </div>

              {/* Fila 2: descripción */}
              <p className="text-xs text-text-muted leading-snug truncate">{proj.desc}</p>

              {/* Fila 3: barra de progreso (siempre ocupa espacio) */}
              <div className="progress-bar h-2 w-full self-end transition-opacity duration-200" style={{ opacity: isActive ? 1 : 0 }}>
                <div className="progress-bar-fill" style={{ width: `${isActive ? progressPct : 0}%` }} />
              </div>

              {/* Fila 4: costos y recompensas */}
              <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[11px] min-h-[1.25rem]">
                <span className={hasDinero ? 'text-text-dim' : 'text-accent-red'}>💵 {fmtDinero(costo)}</span>
                <span className={hasLoc ? 'text-text-dim' : 'text-accent-red'}>📄 {fmtNum(proj.loc_required)} LoC</span>
                <span className={hasPd ? 'text-text-dim' : 'text-accent-red'}>🎨 {fmtNum(proj.pd_required)} PD</span>
                <span className={hasTrafico ? 'text-text-dim' : 'text-accent-red'}>📢 {fmtNum(proj.trafico_required)} Tráfico</span>
                <span className="text-accent-green font-medium">💰 {fmtDinero(reward)}</span>
                <span className="text-accent-orange font-medium">⭐ {rep}</span>
              </div>

              {/* Fila 5: acciones / ETA / auto */}
              <div className="flex items-center justify-between min-h-[1.25rem]">
                <div className="flex items-center gap-2 text-[11px]">
                  {isActive ? (
                    <>
                      <span className="text-accent">⏱ {(Math.max(0, proj.work_required - data.projectProgress) / speed).toFixed(1)}s</span>
                      <span className="text-accent">🚀 {speed.toFixed(1)}x</span>
                    </>
                  ) : (
                    <span className="text-text-dim/60">Esperando para iniciar</span>
                  )}
                </div>
                {isActive && (
                  <button onClick={onCancelProject}
                    className="btn btn-danger text-[10px] px-2 py-0.5 rounded-md"
                  >Cancelar</button>
                )}
              </div>

              {/* Fila 6: mensaje auto (siempre ocupa espacio) */}
              <div className="text-[11px] text-accent text-center min-h-[1rem] transition-opacity duration-200" style={{ opacity: isActive && autoProject ? 1 : 0 }}>
                ↻ Se reiniciará automáticamente al completarse
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
