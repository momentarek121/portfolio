import { getClients, getProjects, getSettings } from '../../../lib/store'
import ClientPageView from './ClientPageView'
import { notFound } from 'next/navigation'

export default function ClientPage({ params }) {
  const clients = getClients()
  const client = clients.find(c => c.slug === params.slug)
  if (!client) return notFound()

  const allProjects = getProjects()
  const projects = allProjects.filter(p => client.projectIds?.includes(p.id))
  const settings = getSettings()

  return <ClientPageView client={client} projects={projects} settings={settings} />
}
