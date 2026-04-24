import { getProjects, getSettings } from '../lib/store'
import PortfolioClient from './PortfolioClient'

export default function Home() {
  const projects = getProjects().filter(p => p.visible)
  const settings = getSettings()
  return <PortfolioClient projects={projects} settings={settings} />
}
