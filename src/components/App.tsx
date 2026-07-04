import { useState, useEffect, useRef, useCallback } from 'react';
import type { GameData } from '../game/types';
import { createInitialState, gameTick, loadGame, saveGame, resetGame, ascend } from '../game/logic';
import { buyUpgrade, clickDev, clickDis, clickMkt, hireRole, prestigeRebrand, buyPrestigeUpgrade, startProject, cancelProject, getPrestigeCost } from '../game/logic';
import ResourceBar from './ResourceBar';
import ClickButtons from './ClickButtons';
import ProjectPanel from './ProjectPanel';
import TeamPanel from './TeamPanel';
import ShopTabs from './ShopTabs';
import PrestigeModal from './PrestigeModal';
import AscendModal from './AscendModal';
import SkillTreeModal from './SkillTreeModal';
import DraggablePanel from './DraggablePanel';


export default function App() {
  const [data, setData] = useState<GameData>(() => loadGame() || createInitialState());
  const [autoProject, setAutoProject] = useState(false);
  const dataRef = useRef(data);
  dataRef.current = data;
  const autoProjRef = useRef(autoProject);
  autoProjRef.current = autoProject;

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const prevActive = prev.activeProject;
        let next = gameTick(prev);
        if (autoProjRef.current && prevActive && !next.activeProject) {
          next = startProject(next, prevActive);
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const h = () => saveGame(dataRef.current);
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && document.fullscreenElement) document.exitFullscreen();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const [showPrestigeModal, setShowPrestigeModal] = useState(false);
  const [showAscendModal, setShowAscendModal] = useState(false);
  const [showSkillTree, setShowSkillTree] = useState(false);

  const act = useCallback((fn: (d: GameData) => GameData) => setData(fn), []);

  const handlePrestige = useCallback(() => {
    const needed = getPrestigeCost(data);
    if (data.reputacion < needed) return;
    setShowPrestigeModal(true);
  }, [data]);

  const confirmPrestige = useCallback(() => {
    setShowPrestigeModal(false);
    act(prestigeRebrand);
  }, [act]);

  const handlePrestigeBuy = useCallback((id: string) => act(d => buyPrestigeUpgrade(d, id)), [act]);

  const handleAscend = useCallback(() => setShowAscendModal(true), []);

  const confirmAscend = useCallback(() => {
    setShowAscendModal(false);
    act(ascend);
  }, [act]);

  const gridRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);
  const [panelSize, setPanelSize] = useState<{
    leftW: number; rightW: number; topH: number; botH: number; totalH: number;
  } | null>(null);
  const initDone = useRef(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (initDone.current) return;
    if (!isDesktop) { initDone.current = true; return; }
    const el = gridRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const gap = 12;
    const rightW = Math.min(480, rect.width * 0.38);
    const leftW = Math.max(280, rect.width - rightW - gap);
    const topH = Math.max(150, (rect.height - gap) / 2);
    const botH = Math.max(150, rect.height - topH - gap);
    setPanelSize({ leftW, rightW, topH, botH, totalH: rect.height });
    initDone.current = true;
  }, [isDesktop]);

  return (
    <div className="h-screen p-2 md:p-3 grid grid-rows-[auto_auto_1fr] gap-2 md:gap-3 overflow-hidden bg-surface">
      <ResourceBar data={data} onReset={() => setData(resetGame())} />
      <ClickButtons data={data} onDev={() => act(clickDev)} onDis={() => act(clickDis)} onMkt={() => act(clickMkt)} />
      {isDesktop && panelSize ? (
        <div className="relative w-full h-full overflow-hidden">
          <DraggablePanel panelId="project" dragHandleClassName="project-drag-handle"
            defaultX={0} defaultY={0} defaultWidth={panelSize.leftW} defaultHeight={panelSize.totalH}
            minWidth={280} minHeight={120}
          >
            <ProjectPanel data={data} onStartProject={(id) => act(d => startProject(d, id))} onCancelProject={() => act(cancelProject)}
              autoProject={autoProject} onToggleAutoProject={() => setAutoProject(p => !p)} />
          </DraggablePanel>
          <DraggablePanel panelId="team" dragHandleClassName="team-drag-handle"
            defaultX={panelSize.leftW + 12} defaultY={0} defaultWidth={panelSize.rightW} defaultHeight={panelSize.topH}
            minWidth={200} minHeight={120}
          >
            <TeamPanel data={data} onHire={(r) => act(d => hireRole(d, r))} />
          </DraggablePanel>
          <DraggablePanel panelId="shop" dragHandleClassName="shop-drag-handle"
            defaultX={panelSize.leftW + 12} defaultY={panelSize.topH + 12} defaultWidth={panelSize.rightW} defaultHeight={panelSize.botH}
            minWidth={200} minHeight={120}
          >
            <ShopTabs data={data} onBuy={(id) => act(d => buyUpgrade(d, id))} onRebrand={handlePrestige} onBuyPrestige={handlePrestigeBuy} onAscend={handleAscend} onOpenSkillTree={() => setShowSkillTree(true)} />
          </DraggablePanel>
        </div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-[1fr_28rem] xl:grid-cols-[1fr_46rem] gap-2 md:gap-3 min-h-0 overflow-y-auto lg:overflow-visible">
          <ProjectPanel data={data} onStartProject={(id) => act(d => startProject(d, id))} onCancelProject={() => act(cancelProject)}
            autoProject={autoProject} onToggleAutoProject={() => setAutoProject(p => !p)} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-rows-[auto_1fr] lg:grid-cols-1 gap-2 md:gap-3 min-h-0">
            <TeamPanel data={data} onHire={(r) => act(d => hireRole(d, r))} />
            <ShopTabs data={data} onBuy={(id) => act(d => buyUpgrade(d, id))} onRebrand={handlePrestige} onBuyPrestige={handlePrestigeBuy} onAscend={handleAscend} onOpenSkillTree={() => setShowSkillTree(true)} />
          </div>
        </div>
      )}
      {showPrestigeModal && (
        <PrestigeModal
          data={data}
          gain={Math.max(1, Math.floor(data.reputacion / 100))}
          cost={getPrestigeCost(data)}
          onConfirm={confirmPrestige}
          onClose={() => setShowPrestigeModal(false)}
        />
      )}
      {showAscendModal && (
        <AscendModal
          data={data}
          onConfirm={confirmAscend}
          onClose={() => setShowAscendModal(false)}
        />
      )}
      {showSkillTree && (
        <SkillTreeModal
          data={data}
          onBuyPrestige={handlePrestigeBuy}
          onClose={() => setShowSkillTree(false)}
        />
      )}
    </div>
  );
}
