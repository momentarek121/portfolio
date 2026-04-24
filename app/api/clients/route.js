import { NextResponse } from 'next/server'
import { saveClients } from '../../../lib/store'

export async function POST(req) {
  try {
    const { clients } = await req.json()
    saveClients(clients)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
