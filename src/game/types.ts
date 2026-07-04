export interface GameData {
  loc: number;
  pd: number;
  trafico: number;
  seguidores: number;
  reputacion: number;
  dinero: number;
  upgrades: string[];
  team: { developers: number; designers: number; marketers: number };
  activeProject: string | null;
  projectProgress: number;
  completedProjects: string[];
  prestigePoints: number;
  prestigeCount: number;
  prestigeUpgrades: string[];
  lastPrestigeReputation: number;
  ascended: boolean;
}

export type UpgradeEffect = 'loc_ps' | 'pd_ps' | 'trafico_ps' | 'loc_click' | 'pd_click' | 'trafico_click';

export type PrestigeEffect =
  | 'multiplier'
  | 'free_devs'
  | 'free_designers'
  | 'free_marketers'
  | 'free_all_roles'
  | 'bonus_reputation'
  | 'project_dinero_mult'
  | 'project_cost_discount'
  | 'bonus_money'
  | 'free_upgrade_dev'
  | 'free_upgrade_dis'
  | 'free_upgrade_mkt'
  | 'hire_cost_discount'
  | 'click_power'
  | 'click_dinero_mult'
  | 'pp_gain_mult'
  | 'prestige_cost_discount'
  | 'project_speed_bonus'
  | 'seg_ps'
  | 'seg_trafico_mult'
  | 'seg_dinero_mult'
  | 'loc_click_power'
  | 'pd_click_power'
  | 'trafico_click_power'
  | 'click_crit_chance'
  | 'click_crit_mult';

export interface Upgrade {
  id: string;
  name: string;
  area: 'dev' | 'dis' | 'mkt';
  cost: number;
  effect_type: UpgradeEffect;
  effect_value: number;
  desc: string;
}

export interface Project {
  id: string;
  name: string;
  desc: string;
  costo_dinero: number;
  loc_required: number;
  pd_required: number;
  trafico_required: number;
  work_required: number;
  reward_dinero: number;
  reward_reputacion: number;
  requiredAscended?: true;
}

export interface PrestigeUpg {
  id: string;
  name: string;
  desc: string;
  cost: number;
  effect_type: PrestigeEffect;
  effect_value: number;
  requires?: string[];
  branch: string;
  tier: number;
  requiredAscended?: true;
}
