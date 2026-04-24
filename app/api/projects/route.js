import { NextResponse } from 'next/server'
import { saveProjects } from '../../../lib/store'

export async function POST(req) {
  try {
    const { projects } = await req.json()
    saveProjects(projects)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
