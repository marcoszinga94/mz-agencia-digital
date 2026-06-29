import type { GameData } from '../game/types';
import { PROYECTOS } from '../game/data';
import { fmtNum, fmtDinero, getProjectSpeed, getProjectDineroMult, getProjectCostDiscount } from '../game/logic';

interface Props { data: GameData; onStartProject: (id: string) => void; onCancelProject: () => void; autoProject: boolean; onToggleAutoProject: () => void }

export default function ProjectPanel({ data, onStartProject, onCancelProject, autoProject, onToggleAutoProject }: Props) {
  const speed = getProjectSpeed(data);

  return (
    <div className="game-panel flex flex-col rounded-lg border border-surface-border bg-surface-card p-3 min-h-0 h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          <span className="text-accent mr-1">◆</span> Projects
        </div>
        <button onClick={onToggleAutoProject}
          className={`game-btn text-xs font-medium px-2 py-0.5 rounded border transition-all cursor-pointer ${
            autoProject
              ? 'border-accent bg-accent/15 text-accent hover:bg-accent/25'
              : 'border-surface-border text-text-dim hover:text-text hover:bg-surface-hover'
          }`}
        >{autoProject ? '🔁 Auto: ON' : '🔁 Auto'}</button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-1.5 pr-1">
        {PROYECTOS.filter(proj => !proj.requiredAscended || data.ascended).map(proj => {
          const isActive = data.activeProject === proj.id;
          const discount = getProjectCostDiscount(data);
          const mult = getProjectDineroMult(data);
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
          const border = isActive ? 'border-accent' : 'border-surface-border';

          return (
              <div key={proj.id} className={`flex flex-col gap-1 px-3 py-2 rounded-lg border ${border} bg-surface-card/50 transition-all duration-200 hover:bg-surface-hover/50`}>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-text flex-1">{proj.name}</span>
                  {isActive && <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded animate-pulse">ACTIVE</span>}
                  {!isActive && canStart && (
                    <button onClick={() => onStartProject(proj.id)}
                      className="game-btn text-xs font-medium px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/30
                        hover:bg-accent/20 active:bg-accent/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                    >Start Project</button>
                  )}
                </div>
                <span className="text-[13px] text-text-muted">{proj.desc}</span>
                {isActive && (
                  <div className="w-full h-2 rounded-full bg-surface-border overflow-hidden">
                    <div className={`h-full rounded-full bg-accent transition-all duration-300 ${data.projectProgress > 0 ? 'progress-glow' : ''}`}
                      style={{ width: `${Math.min(100, (data.projectProgress / proj.work_required) * 100)}%` }} />
                  </div>
                )}
              <div className="flex items-center gap-3 text-xs text-text-dim flex-wrap">
                <span className={hasDinero ? 'text-text-dim' : 'text-accent-red'}>💵 {fmtDinero(costo)}</span>
                <span className={hasLoc ? 'text-text-dim' : 'text-accent-red'}>📄 {fmtNum(proj.loc_required)} LoC</span>
                <span className={hasPd ? 'text-text-dim' : 'text-accent-red'}>🎨 {fmtNum(proj.pd_required)} PD</span>
                <span className={hasTrafico ? 'text-text-dim' : 'text-accent-red'}>📢 {fmtNum(proj.trafico_required)} Tráfico</span>
                <span className="text-accent-green">💰 {fmtDinero(reward)}</span>
                <span className="text-accent-orange">⭐ {proj.reward_reputacion}</span>
                {isActive && (
                  <>
                    <span className="text-accent">⏱ ETA {(Math.max(0, proj.work_required - data.projectProgress) / speed).toFixed(2)}s</span>
                    <span className="text-accent">🚀 {speed.toFixed(1)}x</span>
                    <button onClick={onCancelProject}
                      className="game-btn ml-auto text-xs px-2 py-0.5 rounded border border-accent-red/30 text-accent-red hover:bg-accent-red/10 transition-colors cursor-pointer"
                    >Cancel</button>
                  </>
                )}
              </div>
              {isActive && autoProject && <div className="text-[13px] text-accent text-center">↻ Se reiniciará automáticamente al completarse</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
