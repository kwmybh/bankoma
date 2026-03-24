import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY!
      },
      body: JSON.stringify({
        email,
        listIds: [3], // replace 3 with your actual Brevo list ID
        updateEnabled: true
      })
    });

    if (response.ok || response.status === 204) {
      return NextResponse.json({ success: true });
    }

    const data = await response.json();
    return NextResponse.json({ error: data.message || 'Brevo error' }, { status: 500 });

  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}