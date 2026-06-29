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

  return (
    <div className="h-screen p-2 grid grid-rows-[auto_auto_1fr] gap-1.5 overflow-hidden">
      <ResourceBar data={data} className="flex-1" onReset={() => setData(resetGame())} />
      <ClickButtons data={data} onDev={() => act(clickDev)} onDis={() => act(clickDis)} onMkt={() => act(clickMkt)} />
      <div className="grid grid-cols-[1fr_50rem] gap-1.5 min-h-0">
        <ProjectPanel data={data} onStartProject={(id) => act(d => startProject(d, id))} onCancelProject={() => act(cancelProject)}
          autoProject={autoProject} onToggleAutoProject={() => setAutoProject(p => !p)} />
        <div className="grid grid-rows-[auto_1fr] gap-1.5 min-h-0">
          <TeamPanel data={data} onHire={(r) => act(d => hireRole(d, r))} />
          <ShopTabs data={data} onBuy={(id) => act(d => buyUpgrade(d, id))} onRebrand={handlePrestige} onBuyPrestige={handlePrestigeBuy} onAscend={handleAscend} />
        </div>
      </div>
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
    </div>
  );
}
