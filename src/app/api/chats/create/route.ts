import { NextResponse } from 'next/server';
import { createChat, getCategoryById } from '@/lib/api/db';
import { withSessionHandler } from '@/modules/auth/server/with-session-handler';

export const POST = withSessionHandler(
  async ({ req, currentUser }): Promise<NextResponse> => {
    try {
      const body = await req.json();

      const category = await getCategoryById(body?.categoryId);

      const chat = await createChat(
        {
          title: body?.name ?? 'New Chat',
          icon: body?.icon ?? '🤖',
          creativity: body?.creativity ?? 'medium',
          content:
            body?.content ??
            'Act like my best friend, with jokes advices and support. I will do the same for you. We can talk about anything. Be yourself.',
        },
        currentUser.id,
        category?.id
      );

      return NextResponse.json(chat, { status: 200 });
    } catch (e) {
      return NextResponse.json({ error: e });
    }
  }
);
