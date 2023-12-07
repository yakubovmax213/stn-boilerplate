import { NextResponse } from 'next/server';
import { createMessage, getChatById } from '@/lib/api/db';
import { withSessionHandler } from '@/modules/auth/server/with-session-handler';

export const POST = withSessionHandler(
  async ({ req, currentUser }): Promise<NextResponse> => {
    const body = await req.json();

    const chat = await getChatById(body?.chatId);

    const message = await createMessage(
      {
        content: body?.content,
        role: 'user',
      },
      chat?.id,
      currentUser.id
    );

    return NextResponse.json(message);
  }
);
