import type { GameData, PrestigeUpg, Project } from './types';
import { UPGRADES, PROYECTOS, PRESTIGIO_UPGRADES } from './data';

// ── Formateo ──────────────────────────────────────────

export function fmtNum(n: number): string {
  const abs = Math.abs(n);
  let formatted: string;
  if (abs >= 1_000_000_000) formatted = (abs / 1_000_000_000).toFixed(2) + 'B';
  else if (abs >= 1_000_000) formatted = (abs / 1_000_000).toFixed(2) + 'M';
  else if (abs >= 10_000) formatted = (abs / 1_000).toFixed(2) + 'K';
  else if (abs >= 1) formatted = Math.floor(abs).toLocaleString();
  else if (abs > 0) formatted = abs.toFixed(1);
  else formatted = '0';
  return n < 0 ? '-' + formatted : formatted;
}

export function fmtDinero(n: number): string {
  if (n >= 1_000_000_000) return '$' + (n / 1_000_000_000).toFixed(2) + 'B';
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 10_000) return '$' + (n / 1_000).toFixed(2) + 'K';
  if (n >= 1) return '$' + Math.floor(n).toLocaleString();
  return '$0';
}

// ── Cálculos ──────────────────────────────────────────

export function getMultiplier(data: GameData): number {
  let m = 1;
  for (const pup of PRESTIGIO_UPGRADES) {
    if (data.prestigeUpgrades.includes(pup.id) && pup.effect_type === 'multiplier') {
      m *= (pup.effect_value as number);
    }
  }
  return m;
}

export function getLocPs(data: GameData): number {
  let base = 0;
  for (const uid of data.upgrades) {
    const u = UPGRADES.find(x => x.id === uid);
    if (u && u.effect_type === 'loc_ps') base += u.effect_value;
  }
  base += data.team.developers * 5;
  return base * getMultiplier(data);
}

export function getPdPs(data: GameData): number {
  let base = 0;
  for (const uid of data.upgrades) {
    const u = UPGRADES.find(x => x.id === uid);
    if (u && u.effect_type === 'pd_ps') base += u.effect_value;
  }
  base += data.team.designers * 5;
  return base * getMultiplier(data);
}

function getSeguidoresTraficoMult(data: GameData): number {
  let m = 0.05;
  for (const pid of data.prestigeUpgrades) {
    const pup = PRESTIGIO_UPGRADES.find(x => x.id === pid);
    if (pup && pup.effect_type === 'seg_trafico_mult') m *= pup.effect_value;
  }
  return m;
}

export function getSeguidoresTraficoPs(data: GameData): number {
  return data.seguidores * getSeguidoresTraficoMult(data) * getMultiplier(data);
}

export function getTraficoPs(data: GameData): number {
  let base = 0;
  for (const uid of data.upgrades) {
    const u = UPGRADES.find(x => x.id === uid);
    if (u && u.effect_type === 'trafico_ps') base += u.effect_value;
  }
  base += data.team.marketers * 5;
  return (base + data.seguidores * getSeguidoresTraficoMult(data)) * getMultiplier(data);
}

function getClickPower(data: GameData): number {
  let bonus = 0;
  for (const pid of data.prestigeUpgrades) {
    const pup = PRESTIGIO_UPGRADES.find(x => x.id === pid);
    if (pup && pup.effect_type === 'click_power') bonus += pup.effect_value;
  }
  return bonus;
}

export function getClickDineroMult(data: GameData): number {
  let m = 1;
  for (const pid of data.prestigeUpgrades) {
    const pup = PRESTIGIO_UPGRADES.find(x => x.id === pid);
    if (pup && pup.effect_type === 'click_dinero_mult') m *= pup.effect_value;
  }
  return m;
}

function getSeguidoresDineroMult(data: GameData): number {
  let m = 1;
  for (const pid of data.prestigeUpgrades) {
    const pup = PRESTIGIO_UPGRADES.find(x => x.id === pid);
    if (pup && pup.effect_type === 'seg_dinero_mult') m *= pup.effect_value;
  }
  return m;
}

export function getSeguidoresDineroPs(data: GameData): number {
  return data.seguidores * 0.02 * getSeguidoresDineroMult(data);
}

function getLocClickPower(data: GameData): number {
  let bonus = 0;
  for (const pid of data.prestigeUpgrades) {
    const pup = PRESTIGIO_UPGRADES.find(x => x.id === pid);
    if (pup && pup.effect_type === 'loc_click_power') bonus += pup.effect_value;
  }
  return bonus;
}

function getPdClickPower(data: GameData): number {
  let bonus = 0;
  for (const pid of data.prestigeUpgrades) {
    const pup = PRESTIGIO_UPGRADES.find(x => x.id === pid);
    if (pup && pup.effect_type === 'pd_click_power') bonus += pup.effect_value;
  }
  return bonus;
}

function getTraficoClickPower(data: GameData): number {
  let bonus = 0;
  for (const pid of data.prestigeUpgrades) {
    const pup = PRESTIGIO_UPGRADES.find(x => x.id === pid);
    if (pup && pup.effect_type === 'trafico_click_power') bonus += pup.effect_value;
  }
  return bonus;
}

export function getClickCritChance(data: GameData): number {
  let chance = 0;
  for (const pid of data.prestigeUpgrades) {
    const pup = PRESTIGIO_UPGRADES.find(x => x.id === pid);
    if (pup && pup.effect_type === 'click_crit_chance') chance += pup.effect_value;
  }
  return Math.min(1, chance);
}

function getClickCritMult(data: GameData): number {
  let mult = 2;
  for (const pid of data.prestigeUpgrades) {
    const pup = PRESTIGIO_UPGRADES.find(x => x.id === pid);
    if (pup && pup.effect_type === 'click_crit_mult') mult += pup.effect_value;
  }
  return mult;
}

function applyClickCrit(value: number, data: GameData): number {
  const chance = getClickCritChance(data);
  if (chance <= 0) return value;
  if (Math.random() < chance) return value * getClickCritMult(data);
  return value;
}

export function getLocClick(data: GameData): number {
  let base = 1;
  for (const uid of data.upgrades) {
    const u = UPGRADES.find(x => x.id === uid);
    if (u && u.effect_type === 'loc_click') base += u.effect_value;
  }
  return (base + getClickPower(data) + getLocClickPower(data)) * getMultiplier(data);
}

export function getPdClick(data: GameData): number {
  let base = 1;
  for (const uid of data.upgrades) {
    const u = UPGRADES.find(x => x.id === uid);
    if (u && u.effect_type === 'pd_click') base += u.effect_value;
  }
  return (base + getClickPower(data) + getPdClickPower(data)) * getMultiplier(data);
}

export function getTraficoClick(data: GameData): number {
  let base = 1;
  for (const uid of data.upgrades) {
    const u = UPGRADES.find(x => x.id === uid);
    if (u && u.effect_type === 'trafico_click') base += u.effect_value;
  }
  return (base + getClickPower(data) + getTraficoClickPower(data)) * getMultiplier(data);
}

export function getProjectDineroMult(data: GameData): number {
  let m = 1;
  for (const pid of data.prestigeUpgrades) {
    const pup = PRESTIGIO_UPGRADES.find(x => x.id === pid);
    if (pup && pup.effect_type === 'project_dinero_mult') m *= pup.effect_value;
  }
  return m;
}

export function getProjectReputationMult(data: GameData): number {
  let m = 1;
  for (const pid of data.prestigeUpgrades) {
    const pup = PRESTIGIO_UPGRADES.find(x => x.id === pid);
    if (pup && pup.effect_type === 'bonus_reputation') m *= pup.effect_value;
  }
  return m;
}

export function getProjectReputation(proj: Project, data: GameData): number {
  return Math.floor(proj.reward_reputacion * getProjectReputationMult(data));
}

export function getProjectCostDiscount(data: GameData): number {
  let d = 1;
  for (const pid of data.prestigeUpgrades) {
    const pup = PRESTIGIO_UPGRADES.find(x => x.id === pid);
    if (pup && pup.effect_type === 'project_cost_discount') d *= pup.effect_value;
  }
  return d;
}

export function getLocConsumptionPs(data: GameData): number {
  if (!data.activeProject) return 0;
  const proj = PROYECTOS.find(x => x.id === data.activeProject);
  if (!proj) return 0;
  const speed = getProjectSpeed(data);
  return (proj.loc_required * speed) / proj.work_required;
}

export function getPdConsumptionPs(data: GameData): number {
  if (!data.activeProject) return 0;
  const proj = PROYECTOS.find(x => x.id === data.activeProject);
  if (!proj) return 0;
  const speed = getProjectSpeed(data);
  return (proj.pd_required * speed) / proj.work_required;
}

export function getTraficoConsumptionPs(data: GameData): number {
  if (!data.activeProject) return 0;
  const proj = PROYECTOS.find(x => x.id === data.activeProject);
  if (!proj) return 0;
  const speed = getProjectSpeed(data);
  return (proj.trafico_required * speed) / proj.work_required;
}

export function getProjectDineroPs(data: GameData): number {
  if (!data.activeProject) return 0;
  const proj = PROYECTOS.find(x => x.id === data.activeProject);
  if (!proj) return 0;
  const speed = getProjectSpeed(data);
  const mult = getProjectDineroMult(data);
  return (proj.reward_dinero * mult * speed) / proj.work_required;
}

export function getDineroPs(data: GameData): number {
  return getSeguidoresDineroPs(data) + getProjectDineroPs(data);
}

export function getProjectSpeed(data: GameData): number {
  const total = data.team.developers + data.team.designers + data.team.marketers;
  let basePerMember = 0.3;
  for (const pid of data.prestigeUpgrades) {
    const pup = PRESTIGIO_UPGRADES.find(x => x.id === pid);
    if (pup && pup.effect_type === 'project_speed_bonus') basePerMember += pup.effect_value;
  }
  return 1.0 + total * basePerMember;
}

export function getPrestigeCost(data: GameData): number {
  let d = 1;
  for (const pid of data.prestigeUpgrades) {
    const pup = PRESTIGIO_UPGRADES.find(x => x.id === pid);
    if (pup && pup.effect_type === 'prestige_cost_discount') d *= pup.effect_value;
  }
  const base = data.lastPrestigeReputation > 0 ? data.lastPrestigeReputation * 1.2 : 100;
  return Math.max(20, Math.floor(base * d));
}

export function getPrestigeUpgradeCost(pup: PrestigeUpg): number {
  return Math.floor(pup.cost * Math.pow(1.8, pup.tier - 1));
}

export function getHireCost(role: 'developers' | 'designers' | 'marketers', data: GameData): number {
  let d = 1;
  for (const pid of data.prestigeUpgrades) {
    const pup = PRESTIGIO_UPGRADES.find(x => x.id === pid);
    if (pup && pup.effect_type === 'hire_cost_discount') d *= pup.effect_value;
  }
  return Math.floor(100 * Math.pow(1.5, data.team[role]) * d);
}

// ── Estado inicial ────────────────────────────────────

export function createInitialState(): GameData {
  return {
    loc: 0,
    pd: 0,
    trafico: 0,
    seguidores: 0,
    reputacion: 0,
    dinero: 0,
    upgrades: [],
    team: { developers: 0, designers: 0, marketers: 0 },
    activeProject: null,
    projectProgress: 0,
    completedProjects: [],
    prestigePoints: 0,
    prestigeCount: 0,
    prestigeUpgrades: [],
    lastPrestigeReputation: 0,
    ascended: false,
  };
}

// ── Game tick ─────────────────────────────────────────
// Only advances resource generation and active project progress.
// NO auto-start — player must manually start projects.

export function gameTick(data: GameData): GameData {
  const next: GameData = {
    ...data,
    upgrades: [...data.upgrades],
    prestigeUpgrades: [...data.prestigeUpgrades],
    team: { ...data.team },
  };

  next.loc += getLocPs(data) * 0.1;
  next.pd += getPdPs(data) * 0.1;
  next.trafico += getTraficoPs(data) * 0.1;
  next.dinero += getSeguidoresDineroPs(data) * 0.1;
  for (const pid of data.prestigeUpgrades) {
    const pup = PRESTIGIO_UPGRADES.find(x => x.id === pid);
    if (pup && pup.effect_type === 'seg_ps') next.seguidores += pup.effect_value * 0.1;
  }

  if (next.activeProject) {
    const proj = PROYECTOS.find(x => x.id === next.activeProject);
    if (proj) {
      const speed = getProjectSpeed(data);
      next.projectProgress += speed * 0.1;
      if (next.projectProgress >= proj.work_required) {
        next.dinero += proj.reward_dinero * getProjectDineroMult(data);
        let rep = proj.reward_reputacion;
        for (const pid of data.prestigeUpgrades) {
          const pup = PRESTIGIO_UPGRADES.find(x => x.id === pid);
          if (pup && pup.effect_type === 'bonus_reputation') rep = Math.floor(rep * pup.effect_value);
        }
        next.reputacion += rep;
        next.activeProject = null;
        next.projectProgress = 0;
      }
    }
  }

  return next;
}

// ── Acciones manuales ─────────────────────────────────

export function buyUpgrade(data: GameData, upgradeId: string): GameData {
  if (data.upgrades.includes(upgradeId)) return data;
  const u = UPGRADES.find(x => x.id === upgradeId);
  if (!u) return data;
  if (data.dinero < u.cost) return data;
  return { ...data, dinero: data.dinero - u.cost, upgrades: [...data.upgrades, upgradeId] };
}

export function clickDev(data: GameData): GameData {
  const loc = applyClickCrit(getLocClick(data), data);
  return { ...data, loc: data.loc + loc, dinero: data.dinero + 0.1 * getClickDineroMult(data) };
}

export function clickDis(data: GameData): GameData {
  const pd = applyClickCrit(getPdClick(data), data);
  return { ...data, pd: data.pd + pd, dinero: data.dinero + 0.1 * getClickDineroMult(data) };
}

export function clickMkt(data: GameData): GameData {
  const trafico = applyClickCrit(getTraficoClick(data), data);
  const seg = Math.random() < 0.1 ? data.seguidores + 1 : data.seguidores;
  return { ...data, trafico: data.trafico + trafico, dinero: data.dinero + 0.1 * getClickDineroMult(data), seguidores: seg };
}

export function hireRole(data: GameData, role: 'developers' | 'designers' | 'marketers'): GameData {
  const cost = getHireCost(role, data);
  if (data.dinero < cost) return data;
  const newTeam = { ...data.team, [role]: data.team[role] + 1 };
  return { ...data, dinero: data.dinero - cost, team: newTeam };
}

export function startProject(data: GameData, projectId: string): GameData {
  if (data.activeProject) return data;
  const proj = PROYECTOS.find(x => x.id === projectId);
  if (!proj) return data;
  if (data.loc < proj.loc_required || data.pd < proj.pd_required || data.trafico < proj.trafico_required) return data;
  const discount = getProjectCostDiscount(data);
  const costo = Math.floor(proj.costo_dinero * discount);
  if (data.dinero < costo) return data;

  return {
    ...data,
    dinero: data.dinero - costo,
    loc: data.loc - proj.loc_required,
    pd: data.pd - proj.pd_required,
    trafico: data.trafico - proj.trafico_required,
    activeProject: projectId,
    projectProgress: 0,
  };
}

export function cancelProject(data: GameData): GameData {
  if (!data.activeProject) return data;
  const proj = PROYECTOS.find(x => x.id === data.activeProject);
  if (!proj) return { ...data, activeProject: null, projectProgress: 0 };
  const discount = getProjectCostDiscount(data);
  const costo = Math.floor(proj.costo_dinero * discount);

  return {
    ...data,
    dinero: data.dinero + costo * 0.5,
    loc: data.loc + proj.loc_required * 0.5,
    pd: data.pd + proj.pd_required * 0.5,
    trafico: data.trafico + proj.trafico_required * 0.5,
    activeProject: null,
    projectProgress: 0,
  };
}

export function prestigeRebrand(data: GameData): GameData {
  const cost = getPrestigeCost(data);
  if (data.reputacion < cost) return data;
  let ppMult = 1;
  for (const pid of data.prestigeUpgrades) {
    const pup = PRESTIGIO_UPGRADES.find(x => x.id === pid);
    if (pup && pup.effect_type === 'pp_gain_mult') ppMult *= pup.effect_value;
  }
  const puntos = Math.max(1, Math.floor(data.reputacion / 100 * ppMult));
  const next: GameData = {
    ...createInitialState(),
    prestigePoints: data.prestigePoints + puntos,
    prestigeCount: data.prestigeCount + 1,
    prestigeUpgrades: [...data.prestigeUpgrades],
    lastPrestigeReputation: data.reputacion,
    ascended: data.ascended,
  };

  for (const pid of data.prestigeUpgrades) {
    const pup = PRESTIGIO_UPGRADES.find(x => x.id === pid);
    if (!pup) continue;
    const val = pup.effect_value;
    switch (pup.effect_type) {
      case 'free_devs':
        next.team.developers += val;
        break;
      case 'free_designers':
        next.team.designers += val;
        break;
      case 'free_marketers':
        next.team.marketers += val;
        break;
      case 'free_all_roles':
        next.team.developers += val;
        next.team.designers += val;
        next.team.marketers += val;
        break;
      case 'bonus_money':
        next.dinero += val;
        break;
      case 'free_upgrade_dev':
        if (val === 1) next.upgrades.push('dev_1');
        else if (val === 2) next.upgrades.push('dev_2');
        break;
      case 'free_upgrade_dis':
        if (val === 1) next.upgrades.push('dis_1');
        else if (val === 2) next.upgrades.push('dis_2');
        break;
      case 'free_upgrade_mkt':
        if (val === 1) next.upgrades.push('mkt_1');
        else if (val === 2) next.upgrades.push('mkt_2');
        break;
    }
  }

  return next;
}

export function canAscend(data: GameData): boolean {
  if (data.ascended) return false;
  const baseSkills = PRESTIGIO_UPGRADES.filter(s => !s.requiredAscended);
  return baseSkills.every(s => data.prestigeUpgrades.includes(s.id));
}

export function ascend(data: GameData): GameData {
  if (!canAscend(data)) return data;
  const ascendedUpgrades = data.prestigeUpgrades.filter(id => {
    const pup = PRESTIGIO_UPGRADES.find(x => x.id === id);
    return pup && pup.requiredAscended;
  });
  return {
    ...createInitialState(),
    prestigePoints: 0,
    prestigeCount: 0,
    prestigeUpgrades: ascendedUpgrades,
    ascended: true,
  };
}

export function buyPrestigeUpgrade(data: GameData, id: string): GameData {
  if (data.prestigeUpgrades.includes(id)) return data;
  const pup = PRESTIGIO_UPGRADES.find(x => x.id === id);
  if (!pup) return data;
  const cost = getPrestigeUpgradeCost(pup);
  if (data.prestigePoints < cost) return data;
  if (pup.requiredAscended && !data.ascended) return data;
  if (pup.requires) {
    for (const req of pup.requires) {
      if (!data.prestigeUpgrades.includes(req)) return data;
    }
  }

  const next: GameData = {
    ...data,
    prestigePoints: data.prestigePoints - cost,
    prestigeUpgrades: [...data.prestigeUpgrades, id],
    team: { ...data.team },
    upgrades: [...data.upgrades],
  };

  const val = pup.effect_value;
  switch (pup.effect_type) {
    case 'free_devs':
      next.team.developers += val;
      break;
    case 'free_designers':
      next.team.designers += val;
      break;
    case 'free_marketers':
      next.team.marketers += val;
      break;
    case 'free_all_roles':
      next.team.developers += val;
      next.team.designers += val;
      next.team.marketers += val;
      break;
    case 'bonus_money':
      next.dinero += val;
      break;
    case 'free_upgrade_dev':
      if (val === 1) next.upgrades.push('dev_1');
      else if (val === 2) next.upgrades.push('dev_2');
      break;
    case 'free_upgrade_dis':
      if (val === 1) next.upgrades.push('dis_1');
      else if (val === 2) next.upgrades.push('dis_2');
      break;
    case 'free_upgrade_mkt':
      if (val === 1) next.upgrades.push('mkt_1');
      else if (val === 2) next.upgrades.push('mkt_2');
      break;
  }

  return next;
}

// ── Save / Load ───────────────────────────────────────

const SAVE_KEY = 'agencia-save';

export function saveGame(data: GameData): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch { /* */ }
}

export function loadGame(): GameData | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as GameData;
    if (!data.lastPrestigeReputation && data.prestigeCount > 0) {
      data.lastPrestigeReputation = Math.floor(100 * Math.pow(2, data.prestigeCount - 1));
    }
    return data;
  } catch {
    return null;
  }
}

export function resetGame(): GameData {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch { /* */ }
  return createInitialState();
}
