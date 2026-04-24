// lib/store.js
// Simple JSON-based store — works on Vercel with /tmp for writes
// For production persistence use Vercel KV (free tier)

import fs from 'fs'
import path from 'path'

const DATA_DIR = process.env.NODE_ENV === 'production' ? '/tmp' : path.join(process.cwd(), 'data')
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json')
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json')
const CLIENTS_FILE = path.join(DATA_DIR, 'clients.json')

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

// ── Default data ──────────────────────────
const DEFAULT_SETTINGS = {
  name: 'Momen Tarek',
  title: 'Designer',
  titleAr: 'مصمم',
  email: 'momen@design.com',
  phone: '',
  stats: { years: '5+', projects: '50+', clients: '30+' },
  available: true,
  heroTagline: 'Available for projects · 2025',
  heroTaglineAr: 'متاح للمشاريع · 2025',
  heroDesc: 'Brand Identity · UI/UX · Social Media\nCreating visual experiences that connect brands with people.',
  heroDescAr: 'هوية بصرية · تجربة المستخدم · سوشيال ميديا\nبصمم تجارب بصرية تربط البراندات بالناس.',
  adminPassword: 'momen2025'
}

const DEFAULT_PROJECTS = [
  { id: '1', title: 'Nova Brand System', titleAr: 'نظام هوية نوفا', category: 'brand', year: '2024', image: '', link: '', visible: true, clientVisible: false },
  { id: '2', title: 'E-Commerce App UI', titleAr: 'واجهة تطبيق تجارة', category: 'ui', year: '2024', image: '', link: '', visible: true, clientVisible: false },
  { id: '3', title: 'Campaign Series', titleAr: 'سلسلة حملات', category: 'social', year: '2024', image: '', link: '', visible: true, clientVisible: false },
]

// ── Projects ──────────────────────────────
export function getProjects() {
  ensureDir()
  try {
    if (fs.existsSync(PROJECTS_FILE)) return JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf8'))
  } catch {}
  return DEFAULT_PROJECTS
}

export function saveProjects(projects) {
  ensureDir()
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2))
}

// ── Settings ──────────────────────────────
export function getSettings() {
  ensureDir()
  try {
    if (fs.existsSync(SETTINGS_FILE)) return { ...DEFAULT_SETTINGS, ...JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8')) }
  } catch {}
  return DEFAULT_SETTINGS
}

export function saveSettings(settings) {
  ensureDir()
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2))
}

// ── Clients ───────────────────────────────
export function getClients() {
  ensureDir()
  try {
    if (fs.existsSync(CLIENTS_FILE)) return JSON.parse(fs.readFileSync(CLIENTS_FILE, 'utf8'))
  } catch {}
  return []
}

export function saveClients(clients) {
  ensureDir()
  fs.writeFileSync(CLIENTS_FILE, JSON.stringify(clients, null, 2))
}
