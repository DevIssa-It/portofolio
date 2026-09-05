import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { inquiryRepository } from '@/lib/repositories/inquiry.repository'

async function dispatchWebhookNotification(payload: {
  name: string
  email: string
  company?: string
  roleType?: string
  message: string
}) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL
  if (!webhookUrl) return

  try {
    const textMessage = `[Portfolio Inquiry] From: ${payload.name} (${payload.email})${
      payload.company ? ` | Company: ${payload.company}` : ''
    }${payload.roleType ? ` | Role: ${payload.roleType}` : ''}\n\nMessage:\n${payload.message}`

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: textMessage,
        text: textMessage,
      }),
    })
  } catch (err) {
    console.error('Webhook notification dispatch failed:', err)
  }
}

// GET - List inquiries (admin only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const inquiries = await inquiryRepository.findAll()
    return NextResponse.json(inquiries)
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 })
  }
}

// POST - Submit new contact/hire inquiry (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, roleType, message } = body

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'A valid email address is required' }, { status: 400 })
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const inquiry = await inquiryRepository.create({
      name: name.trim(),
      email: email.trim(),
      company: company?.trim() || '',
      roleType: roleType?.trim() || '',
      message: message.trim(),
    })

    // Non-blocking webhook dispatch
    dispatchWebhookNotification({
      name: inquiry.name,
      email: inquiry.email,
      company: inquiry.company,
      roleType: inquiry.roleType,
      message: inquiry.message,
    })

    return NextResponse.json({ success: true, inquiry }, { status: 201 })
  } catch (error) {
    console.error('Error submitting inquiry:', error)
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 })
  }
}
