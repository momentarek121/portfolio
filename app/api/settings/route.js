import { NextResponse } from 'next/server'
import { saveSettings } from '../../../lib/store'

export async function POST(req) {
  try {
    const { settings } = await req.json()
    saveSettings(settings)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
