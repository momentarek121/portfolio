import { getProjects, getSettings, getClients } from '../../lib/store'
import AdminClient from './AdminClient'

export default function AdminPage() {
  const projects = getProjects()
  const settings = getSettings()
  const clients = getClients()
  return <AdminClient projects={projects} settings={settings} clients={clients} />
}
