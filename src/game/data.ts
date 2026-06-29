import type { Upgrade, Project, PrestigeUpg } from './types';

export const UPGRADES: Upgrade[] = [
  { id: 'dev_1', name: 'Teclado Mecánico', area: 'dev', cost: 10, effect_type: 'loc_click', effect_value: 2, desc: '+2 LoC por click' },
  { id: 'dev_2', name: 'Monitor 4K', area: 'dev', cost: 50, effect_type: 'loc_click', effect_value: 5, desc: '+5 LoC por click' },
  { id: 'dev_3', name: 'Framework Bootstrap', area: 'dev', cost: 200, effect_type: 'loc_ps', effect_value: 2, desc: '+2 LoC/s' },
  { id: 'dev_4', name: 'Servidor Dedicado', area: 'dev', cost: 1000, effect_type: 'loc_ps', effect_value: 10, desc: '+10 LoC/s' },
  { id: 'dev_5', name: 'React Expert', area: 'dev', cost: 5000, effect_type: 'loc_ps', effect_value: 50, desc: '+50 LoC/s' },
  { id: 'dev_6', name: 'IA Generadora de Código', area: 'dev', cost: 25000, effect_type: 'loc_ps', effect_value: 200, desc: '+200 LoC/s' },

  { id: 'dis_1', name: 'Lápiz Digital', area: 'dis', cost: 10, effect_type: 'pd_click', effect_value: 2, desc: '+2 PD por click' },
  { id: 'dis_2', name: 'Figma Básico', area: 'dis', cost: 50, effect_type: 'pd_click', effect_value: 5, desc: '+5 PD por click' },
  { id: 'dis_3', name: 'Banco de Plantillas', area: 'dis', cost: 200, effect_type: 'pd_ps', effect_value: 2, desc: '+2 PD/s' },
  { id: 'dis_4', name: 'Figma Pro', area: 'dis', cost: 1000, effect_type: 'pd_ps', effect_value: 10, desc: '+10 PD/s' },
  { id: 'dis_5', name: 'Design System', area: 'dis', cost: 5000, effect_type: 'pd_ps', effect_value: 50, desc: '+50 PD/s' },
  { id: 'dis_6', name: 'AI Designer', area: 'dis', cost: 25000, effect_type: 'pd_ps', effect_value: 200, desc: '+200 PD/s' },

  { id: 'mkt_1', name: 'Post Viral', area: 'mkt', cost: 10, effect_type: 'trafico_click', effect_value: 2, desc: '+2 Tráfico por click' },
  { id: 'mkt_2', name: 'Google Ads', area: 'mkt', cost: 50, effect_type: 'trafico_click', effect_value: 5, desc: '+5 Tráfico por click' },
  { id: 'mkt_3', name: 'SEO On-Page', area: 'mkt', cost: 200, effect_type: 'trafico_ps', effect_value: 2, desc: '+2 Tráfico/s' },
  { id: 'mkt_4', name: 'SEO Suite Completa', area: 'mkt', cost: 1000, effect_type: 'trafico_ps', effect_value: 10, desc: '+10 Tráfico/s' },
  { id: 'mkt_5', name: 'Embudo Automatizado', area: 'mkt', cost: 5000, effect_type: 'trafico_ps', effect_value: 50, desc: '+50 Tráfico/s' },
  { id: 'mkt_6', name: 'AI Marketing', area: 'mkt', cost: 25000, effect_type: 'trafico_ps', effect_value: 200, desc: '+200 Tráfico/s' },
];

export const PROYECTOS: Project[] = [
  { id: 'proj_1',  name: 'Landing Page',       desc: 'Página web simple para un negocio local',    costo_dinero: 15,     loc_required: 100,    pd_required: 50,     trafico_required: 0,     work_required: 10,  reward_dinero: 23,      reward_reputacion: 5 },
  { id: 'proj_2',  name: 'Blog Corporativo',   desc: 'Blog con CMS para empresa',                  costo_dinero: 40,     loc_required: 250,    pd_required: 120,    trafico_required: 70,    work_required: 15,  reward_dinero: 60,      reward_reputacion: 8 },
  { id: 'proj_3',  name: 'Tienda Online',       desc: 'E-commerce con carrito de compras',          costo_dinero: 120,    loc_required: 600,    pd_required: 300,    trafico_required: 200,   work_required: 21,  reward_dinero: 180,     reward_reputacion: 11 },
  { id: 'proj_4',  name: 'SaaS Platform',       desc: 'Plataforma como servicio completa',          costo_dinero: 400,    loc_required: 2000,   pd_required: 800,    trafico_required: 500,   work_required: 31,  reward_dinero: 600,     reward_reputacion: 17 },
  { id: 'proj_5',  name: 'App Móvil + Web',     desc: 'Aplicación móvil con backoffice web',        costo_dinero: 1500,   loc_required: 6000,   pd_required: 2500,   trafico_required: 1500,  work_required: 45,  reward_dinero: 2250,    reward_reputacion: 25 },
  { id: 'proj_6',  name: 'API REST',            desc: 'Backend escalable para servicios web',       costo_dinero: 6000,   loc_required: 20000,  pd_required: 9000,   trafico_required: 5500,  work_required: 65,  reward_dinero: 9000,    reward_reputacion: 38 },
  { id: 'proj_7',  name: 'Dashboard Analytics', desc: 'Panel de datos con visualizaciones',          costo_dinero: 26000,  loc_required: 80000,  pd_required: 35000,  trafico_required: 22000, work_required: 94,  reward_dinero: 39000,   reward_reputacion: 57 },
  { id: 'proj_8',  name: 'Sistema CRM',         desc: 'Gestión de clientes con automatización',     costo_dinero: 120000,  loc_required: 350000, pd_required: 150000, trafico_required: 100000, work_required: 137, reward_dinero: 180000,  reward_reputacion: 85 },
  { id: 'proj_9',  name: 'Marketplace',         desc: 'Plataforma multi-vendedor',                   costo_dinero: 600000,  loc_required: 1.5e6,  pd_required: 700000, trafico_required: 450000, work_required: 198, reward_dinero: 900000,  reward_reputacion: 128 },
  { id: 'proj_10', name: 'Red Social',          desc: 'Red social con feeds y mensajería',           costo_dinero: 3e6,     loc_required: 7e6,    pd_required: 3e6,    trafico_required: 2e6,   work_required: 287, reward_dinero: 4.5e6,    reward_reputacion: 192 },
  { id: 'proj_11', name: 'Juego Online',        desc: 'MMO con microtransacciones',                 costo_dinero: 15e6,    loc_required: 35e6,   pd_required: 15e6,   trafico_required: 10e6,  work_required: 417, reward_dinero: 22.5e6,   reward_reputacion: 288 },
  { id: 'proj_12', name: 'Metaverso',           desc: 'Experiencia inmersiva 3D en la nube',        costo_dinero: 80e6,    loc_required: 180e6,  pd_required: 80e6,   trafico_required: 50e6,  work_required: 604, reward_dinero: 120e6,    reward_reputacion: 432 },
  // ── Ascendidos ───────────────────────────────────────
  { id: 'proj_13', name: 'Clúster Cuántico',     desc: 'Infraestructura cuántica distribuida',       costo_dinero: 500e6,   loc_required: 1e9,    pd_required: 500e6,  trafico_required: 250e6,  work_required: 900, reward_dinero: 750e6,    reward_reputacion: 1000, requiredAscended: true },
  { id: 'proj_14', name: 'Red Neuronal Global', desc: 'IA interconectada a escala planetaria',       costo_dinero: 3.5e9,   loc_required: 7e9,    pd_required: 3.5e9,  trafico_required: 2e9,    work_required: 1200, reward_dinero: 5.25e9,   reward_reputacion: 2000, requiredAscended: true },
  { id: 'proj_15', name: 'Simulador de Realidades', desc: 'Motor de simulación de universos',     costo_dinero: 30e9,    loc_required: 60e9,   pd_required: 30e9,   trafico_required: 15e9,   work_required: 1500, reward_dinero: 45e9,     reward_reputacion: 5000, requiredAscended: true },
];

export const PRESTIGIO_UPGRADES: PrestigeUpg[] = [
  // ── Producción (7) ──────────────────────────────────
  { id: 'prod_1', name: 'Sinergia',         desc: 'Generación global +25%',          cost: 1,  effect_type: 'multiplier',           effect_value: 1.25,  branch: 'Producción', tier: 1 },
  { id: 'prod_2', name: 'Optimización',     desc: 'Generación global +50%',          cost: 3,  effect_type: 'multiplier',           effect_value: 1.5,   branch: 'Producción', tier: 2, requires: ['prod_1'] },
  { id: 'prod_3', name: 'Automatización',   desc: 'Generación global +100%',         cost: 6,  effect_type: 'multiplier',           effect_value: 2,     branch: 'Producción', tier: 3, requires: ['prod_2'] },
  { id: 'prod_4', name: 'IA Avanzada',      desc: 'Generación global +200%',         cost: 10, effect_type: 'multiplier',           effect_value: 3,     branch: 'Producción', tier: 4, requires: ['prod_3'] },
  { id: 'prod_5', name: 'Robótica',         desc: 'Generación global +400%',         cost: 15, effect_type: 'multiplier',           effect_value: 4,     branch: 'Producción', tier: 5, requires: ['prod_4'] },
  { id: 'prod_6', name: 'Singularidad',     desc: 'Generación global +800%',         cost: 22, effect_type: 'multiplier',           effect_value: 6,     branch: 'Producción', tier: 6, requires: ['prod_5'] },
  { id: 'prod_7', name: 'Infinito',         desc: 'Generación global +1600%',        cost: 30, effect_type: 'multiplier',           effect_value: 10,    branch: 'Producción', tier: 7, requires: ['prod_6'] },

  // ── Talento (7) ─────────────────────────────────────
  { id: 'talent_1', name: 'Reclutador',     desc: 'Empiezas con 1 dev',              cost: 1,  effect_type: 'free_devs',           effect_value: 1,     branch: 'Talento', tier: 1 },
  { id: 'talent_2', name: 'Cazatalentos',   desc: 'Empiezas con 1 diseñador',        cost: 2,  effect_type: 'free_designers',      effect_value: 1,     branch: 'Talento', tier: 2, requires: ['talent_1'] },
  { id: 'talent_3', name: 'Headhunter',     desc: 'Empiezas con 1 marketero',        cost: 3,  effect_type: 'free_marketers',      effect_value: 1,     branch: 'Talento', tier: 3, requires: ['talent_2'] },
  { id: 'talent_4', name: 'Depto. RRHH',    desc: 'Empiezas con +2 de cada rol',     cost: 7,  effect_type: 'free_all_roles',      effect_value: 2,     branch: 'Talento', tier: 4, requires: ['talent_3'] },
  { id: 'talent_5', name: 'Networking',     desc: 'Contratar cuesta -20%',           cost: 10, effect_type: 'hire_cost_discount',  effect_value: 0.8,   branch: 'Talento', tier: 5, requires: ['talent_4'] },
  { id: 'talent_6', name: 'Marca Empleadora', desc: 'Contratar cuesta -40%',         cost: 15, effect_type: 'hire_cost_discount',  effect_value: 0.6,   branch: 'Talento', tier: 6, requires: ['talent_5'] },
  { id: 'talent_7', name: 'Sinergia Equipo',  desc: 'Team da +0.5x speed extra',    cost: 20, effect_type: 'project_speed_bonus', effect_value: 0.5,   branch: 'Talento', tier: 7, requires: ['talent_6'] },

  // ── Proyectos (7) ───────────────────────────────────
  { id: 'proj_1', name: 'Clientes Estables',  desc: 'Proyectos dan +25% dinero',    cost: 2,  effect_type: 'project_dinero_mult',  effect_value: 1.25,  branch: 'Proyectos', tier: 1 },
  { id: 'proj_2', name: 'Clientes Premium',   desc: 'Proyectos dan +50% reputación',cost: 4,  effect_type: 'bonus_reputation',    effect_value: 1.5,   branch: 'Proyectos', tier: 2, requires: ['proj_1'] },
  { id: 'proj_3', name: 'Eficiencia Total',   desc: 'Proyectos cuestan -25% dinero',cost: 6,  effect_type: 'project_cost_discount', effect_value: 0.75,  branch: 'Proyectos', tier: 3, requires: ['proj_2'] },
  { id: 'proj_4', name: 'Corporativo',        desc: 'Proyectos dan +100% dinero',   cost: 10, effect_type: 'project_dinero_mult', effect_value: 2,     branch: 'Proyectos', tier: 4, requires: ['proj_3'] },
  { id: 'proj_5', name: 'Multinacional',      desc: 'Proyectos cuestan -50% dinero',cost: 14, effect_type: 'project_cost_discount', effect_value: 0.5,   branch: 'Proyectos', tier: 5, requires: ['proj_4'] },
  { id: 'proj_6', name: 'Gobierno',           desc: 'Proyectos dan +200% dinero',   cost: 18, effect_type: 'project_dinero_mult', effect_value: 3,     branch: 'Proyectos', tier: 6, requires: ['proj_5'] },
  { id: 'proj_7', name: 'Imperio',            desc: 'Proyectos dan +500% dinero',   cost: 25, effect_type: 'project_dinero_mult', effect_value: 5,     branch: 'Proyectos', tier: 7, requires: ['proj_6'] },

  // ── Equipamiento (7) ────────────────────────────────
  { id: 'gear_1', name: 'Workstation Pro',    desc: 'Empiezas con Teclado Mecánico', cost: 2,  effect_type: 'free_upgrade_dev',   effect_value: 1,     branch: 'Equipamiento', tier: 1 },
  { id: 'gear_2', name: 'Estudio Creativo',   desc: 'Empiezas con Lápiz Digital',    cost: 2,  effect_type: 'free_upgrade_dis',   effect_value: 1,     branch: 'Equipamiento', tier: 1 },
  { id: 'gear_3', name: 'Oficina Virtual',    desc: 'Empiezas con Post Viral',       cost: 2,  effect_type: 'free_upgrade_mkt',   effect_value: 1,     branch: 'Equipamiento', tier: 1 },
  { id: 'gear_4', name: 'Monitor 4K',         desc: 'Empiezas con Monitor 4K',       cost: 4,  effect_type: 'free_upgrade_dev',   effect_value: 2,     branch: 'Equipamiento', tier: 2, requires: ['gear_1'] },
  { id: 'gear_5', name: 'Tablet Gráfica',     desc: 'Empiezas con Figma Básico',     cost: 4,  effect_type: 'free_upgrade_dis',   effect_value: 2,     branch: 'Equipamiento', tier: 2, requires: ['gear_2'] },
  { id: 'gear_6', name: 'Anuncios Premium',   desc: 'Empiezas con Google Ads',       cost: 4,  effect_type: 'free_upgrade_mkt',   effect_value: 2,     branch: 'Equipamiento', tier: 2, requires: ['gear_3'] },
  { id: 'gear_7', name: 'Inversión Ángel',    desc: 'Empiezas con $10000',           cost: 8,  effect_type: 'bonus_money',        effect_value: 10000, branch: 'Equipamiento', tier: 3, requires: ['gear_4', 'gear_5', 'gear_6'] },

  // ── Seguidores (6) ──────────────────────────────────
  { id: 'fol_1', name: 'Community Manager',   desc: '+0.5 seguidores/s',              cost: 2,  effect_type: 'seg_ps',             effect_value: 0.5,   branch: 'Seguidores', tier: 1 },
  { id: 'fol_2', name: 'Contenido Viral',     desc: 'Seguidores dan +50% tráfico',    cost: 4,  effect_type: 'seg_trafico_mult',   effect_value: 1.5,   branch: 'Seguidores', tier: 2, requires: ['fol_1'] },
  { id: 'fol_3', name: 'Influencers',         desc: '+1.5 seguidores/s',              cost: 6,  effect_type: 'seg_ps',             effect_value: 1.5,   branch: 'Seguidores', tier: 3, requires: ['fol_2'] },
  { id: 'fol_4', name: 'Tendencia Global',    desc: 'Seguidores dan +100% tráfico',   cost: 9,  effect_type: 'seg_trafico_mult',   effect_value: 2,     branch: 'Seguidores', tier: 4, requires: ['fol_3'] },
  { id: 'fol_5', name: 'Ejército Digital',    desc: '+3 seguidores/s',                cost: 12, effect_type: 'seg_ps',             effect_value: 3,     branch: 'Seguidores', tier: 5, requires: ['fol_4'] },
  { id: 'fol_6', name: 'Fenómeno Mundial',    desc: 'Seguidores dan +300% tráfico',   cost: 16, effect_type: 'seg_trafico_mult',   effect_value: 3,     branch: 'Seguidores', tier: 6, requires: ['fol_5'] },

  // ── Click (6) ───────────────────────────────────────
  { id: 'click_1', name: 'Teclado Lite',      desc: '+1 recurso por click',           cost: 2,  effect_type: 'click_power',        effect_value: 1,     branch: 'Click', tier: 1 },
  { id: 'click_2', name: 'Macro',             desc: '+2 recursos por click',          cost: 4,  effect_type: 'click_power',        effect_value: 2,     branch: 'Click', tier: 2, requires: ['click_1'] },
  { id: 'click_3', name: 'Automatización',    desc: 'Clicks dan +$0.20 extra',        cost: 6,  effect_type: 'click_dinero_mult',  effect_value: 2,     branch: 'Click', tier: 3, requires: ['click_2'] },
  { id: 'click_4', name: 'Turbo',             desc: '+5 recursos por click',          cost: 9,  effect_type: 'click_power',        effect_value: 5,     branch: 'Click', tier: 4, requires: ['click_3'] },
  { id: 'click_5', name: 'Overdrive',         desc: 'Clicks dan +$0.50 extra',        cost: 13, effect_type: 'click_dinero_mult',  effect_value: 3,     branch: 'Click', tier: 5, requires: ['click_4'] },
  { id: 'click_6', name: 'Máquina Total',     desc: '+15 recursos por click',         cost: 18, effect_type: 'click_power',        effect_value: 15,    branch: 'Click', tier: 6, requires: ['click_5'] },

  // ── Prestige (6) ──────────────────────────────────────
  { id: 'pres_1', name: 'Experiencia',        desc: 'Ganas +25% PP al hacer rebrand', cost: 3,  effect_type: 'pp_gain_mult',       effect_value: 1.25,  branch: 'Prestige', tier: 1 },
  { id: 'pres_2', name: 'Maestría',           desc: 'Ganas +50% PP al hacer rebrand', cost: 6,  effect_type: 'pp_gain_mult',       effect_value: 1.5,   branch: 'Prestige', tier: 2, requires: ['pres_1'] },
  { id: 'pres_3', name: 'Descuento',          desc: 'Prestige cuesta -15% reputación',cost: 8,  effect_type: 'prestige_cost_discount', effect_value: 0.85, branch: 'Prestige', tier: 3, requires: ['pres_2'] },
  { id: 'pres_4', name: 'Sabiduría',          desc: 'Ganas +100% PP al hacer rebrand',cost: 11, effect_type: 'pp_gain_mult',       effect_value: 2,     branch: 'Prestige', tier: 4, requires: ['pres_3'] },
  { id: 'pres_5', name: 'Gran Descuento',     desc: 'Prestige cuesta -30% reputación',cost: 14, effect_type: 'prestige_cost_discount', effect_value: 0.7,  branch: 'Prestige', tier: 5, requires: ['pres_4'] },
  { id: 'pres_6', name: 'Leyenda',            desc: 'Ganas +200% PP al hacer rebrand',cost: 18, effect_type: 'pp_gain_mult',       effect_value: 3,     branch: 'Prestige', tier: 6, requires: ['pres_5'] },

  // ── Recursos (6) ─────────────────────────────────────
  { id: 'res_1', name: '+10% Generación',     desc: 'Generación global +10%',         cost: 2,  effect_type: 'multiplier',         effect_value: 1.1,   branch: 'Recursos', tier: 1 },
  { id: 'res_2', name: '+25% Generación',     desc: 'Generación global +25%',         cost: 4,  effect_type: 'multiplier',         effect_value: 1.25,  branch: 'Recursos', tier: 2, requires: ['res_1'] },
  { id: 'res_3', name: '+50% Generación',     desc: 'Generación global +50%',         cost: 6,  effect_type: 'multiplier',         effect_value: 1.5,   branch: 'Recursos', tier: 3, requires: ['res_2'] },
  { id: 'res_4', name: '+100% Generación',    desc: 'Generación global +100%',        cost: 9,  effect_type: 'multiplier',         effect_value: 2,     branch: 'Recursos', tier: 4, requires: ['res_3'] },
  { id: 'res_5', name: '+200% Generación',    desc: 'Generación global +200%',        cost: 13, effect_type: 'multiplier',         effect_value: 3,     branch: 'Recursos', tier: 5, requires: ['res_4'] },
  { id: 'res_6', name: '+500% Generación',    desc: 'Generación global +500%',        cost: 18, effect_type: 'multiplier',         effect_value: 5,     branch: 'Recursos', tier: 6, requires: ['res_5'] },

  // ── Ascensión: Poder (5) ─────────────────────────────
  { id: 'asc_pow_1', name: 'Fuerza I',       desc: 'Generación global +100%',          cost: 3,  effect_type: 'multiplier',         effect_value: 2,     branch: 'Asc Poder', tier: 1, requiredAscended: true },
  { id: 'asc_pow_2', name: 'Fuerza II',      desc: 'Generación global +200%',          cost: 5,  effect_type: 'multiplier',         effect_value: 3,     branch: 'Asc Poder', tier: 2, requires: ['asc_pow_1'], requiredAscended: true },
  { id: 'asc_pow_3', name: 'Fuerza III',     desc: 'Generación global +400%',          cost: 8,  effect_type: 'multiplier',         effect_value: 5,     branch: 'Asc Poder', tier: 3, requires: ['asc_pow_2'], requiredAscended: true },
  { id: 'asc_pow_4', name: 'Fuerza IV',      desc: 'Generación global +800%',          cost: 13, effect_type: 'multiplier',         effect_value: 9,     branch: 'Asc Poder', tier: 4, requires: ['asc_pow_3'], requiredAscended: true },
  { id: 'asc_pow_5', name: 'Fuerza V',       desc: 'Generación global +2000%',         cost: 20, effect_type: 'multiplier',         effect_value: 20,    branch: 'Asc Poder', tier: 5, requires: ['asc_pow_4'], requiredAscended: true },

  // ── Ascensión: Sabiduría (5) ─────────────────────────
  { id: 'asc_wis_1', name: 'Sabiduría I',    desc: 'Ganas +25% PP al hacer rebrand',   cost: 3,  effect_type: 'pp_gain_mult',       effect_value: 1.25,  branch: 'Asc Sabiduría', tier: 1, requiredAscended: true },
  { id: 'asc_wis_2', name: 'Sabiduría II',   desc: 'Prestige cuesta -15% reputación',  cost: 6,  effect_type: 'prestige_cost_discount', effect_value: 0.85, branch: 'Asc Sabiduría', tier: 2, requires: ['asc_wis_1'], requiredAscended: true },
  { id: 'asc_wis_3', name: 'Sabiduría III',  desc: 'Ganas +75% PP al hacer rebrand',   cost: 10, effect_type: 'pp_gain_mult',       effect_value: 1.75,  branch: 'Asc Sabiduría', tier: 3, requires: ['asc_wis_2'], requiredAscended: true },
  { id: 'asc_wis_4', name: 'Sabiduría IV',   desc: 'Prestige cuesta -30% reputación',  cost: 15, effect_type: 'prestige_cost_discount', effect_value: 0.7,  branch: 'Asc Sabiduría', tier: 4, requires: ['asc_wis_3'], requiredAscended: true },
  { id: 'asc_wis_5', name: 'Sabiduría V',    desc: 'Ganas +200% PP al hacer rebrand',  cost: 22, effect_type: 'pp_gain_mult',       effect_value: 3,     branch: 'Asc Sabiduría', tier: 5, requires: ['asc_wis_4'], requiredAscended: true },

  // ── Ascensión: Proyectos (5) ─────────────────────────
  { id: 'asc_proj_1', name: 'Proyectos I',   desc: 'Proyectos dan +50% dinero',        cost: 4,  effect_type: 'project_dinero_mult', effect_value: 1.5,   branch: 'Asc Proyectos', tier: 1, requiredAscended: true },
  { id: 'asc_proj_2', name: 'Proyectos II',  desc: 'Proyectos cuestan -25% dinero',    cost: 7,  effect_type: 'project_cost_discount', effect_value: 0.75, branch: 'Asc Proyectos', tier: 2, requires: ['asc_proj_1'], requiredAscended: true },
  { id: 'asc_proj_3', name: 'Proyectos III', desc: '+0.5 team speed bonus',           cost: 11, effect_type: 'project_speed_bonus',  effect_value: 0.5,   branch: 'Asc Proyectos', tier: 3, requires: ['asc_proj_2'], requiredAscended: true },
  { id: 'asc_proj_4', name: 'Proyectos IV',  desc: 'Proyectos dan +200% dinero',       cost: 16, effect_type: 'project_dinero_mult', effect_value: 3,     branch: 'Asc Proyectos', tier: 4, requires: ['asc_proj_3'], requiredAscended: true },
  { id: 'asc_proj_5', name: 'Proyectos V',   desc: 'Proyectos cuestan -50% dinero',    cost: 22, effect_type: 'project_cost_discount', effect_value: 0.5,   branch: 'Asc Proyectos', tier: 5, requires: ['asc_proj_4'], requiredAscended: true },

  // ── Ascensión: Recursos (5) ──────────────────────────
  { id: 'asc_res_1', name: 'Recursos I',     desc: '+1 recurso por click',             cost: 3,  effect_type: 'click_power',        effect_value: 1,     branch: 'Asc Recursos', tier: 1, requiredAscended: true },
  { id: 'asc_res_2', name: 'Recursos II',    desc: 'Generación global +100%',           cost: 6,  effect_type: 'multiplier',         effect_value: 2,     branch: 'Asc Recursos', tier: 2, requires: ['asc_res_1'], requiredAscended: true },
  { id: 'asc_res_3', name: 'Recursos III',   desc: '+3 recursos por click',            cost: 10, effect_type: 'click_power',        effect_value: 3,     branch: 'Asc Recursos', tier: 3, requires: ['asc_res_2'], requiredAscended: true },
  { id: 'asc_res_4', name: 'Recursos IV',    desc: 'Generación global +300%',           cost: 15, effect_type: 'multiplier',         effect_value: 4,     branch: 'Asc Recursos', tier: 4, requires: ['asc_res_3'], requiredAscended: true },
  { id: 'asc_res_5', name: 'Recursos V',     desc: '+10 recursos por click',           cost: 22, effect_type: 'click_power',        effect_value: 10,    branch: 'Asc Recursos', tier: 5, requires: ['asc_res_4'], requiredAscended: true },
];


