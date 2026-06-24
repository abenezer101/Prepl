import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // If credentials are empty or still using placeholder values, simulate success for easy testing
    if (
      !botToken ||
      !chatId ||
      botToken === 'your_telegram_bot_token_here' ||
      chatId === 'your_telegram_chat_id_here'
    ) {
      console.warn('Telegram Bot Token or Chat ID is not configured. Simulating submission.');
      return NextResponse.json({ success: true, simulated: true });
    }

    // Clean inputs for Telegram Markdown compatibility
    const cleanInline = (str: string) => str.replace(/`/g, "'");
    const cleanPre = (str: string) => str.replace(/```/g, "'''");
    const escapeMarkdown = (str: string) => str.replace(/([*_`\[])/g, '\\$1');

    // Format the message template in Markdown
    const formattedText = `*📬 New Contact Message*\n\n` +
      `*Name:* \`${cleanInline(name)}\`\n` +
      `*Email:* \`${cleanInline(email)}\`\n` +
      `*Subject:* *${escapeMarkdown(subject || 'General Inquiry')}*\n\n` +
      `*Message:*\n\`\`\`\n${cleanPre(message)}\n\`\`\``;

    // Post to Telegram Bot API
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: formattedText,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Telegram bot response error:', errorText);
      return NextResponse.json(
        { error: 'Failed to deliver message. try again' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact submit endpoint error:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred while sending the message.' },
      { status: 500 }
    );
  }
}
