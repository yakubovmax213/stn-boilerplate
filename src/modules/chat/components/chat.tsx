'use client';

import React, { FC } from 'react';
import { MessageForm } from '@stn-ui/forms';
import { MessageList, MessageItem } from '@stn-ui/messages';
import { useChats } from '../hooks';
import { ChatMessage } from '../types';

interface Props {
  messages: ChatMessage[];
}

export const Chat: FC<Props> = ({ messages }) => {
  const { messages: chatMessages, sendMessage } = useChats(messages);

  return (
    <>
      <MessageList data-testid="messageList">
        {chatMessages.map(
          ({ id, role, createdAt, author, content, isLoading }) => {
            const type = role === 'assistant' ? 'received' : 'sent';

            return (
              <div data-testid={`message-${type}`}>
                <MessageItem
                  key={id}
                  time={createdAt}
                  type={type}
                  author={author?.name}
                  isLoading={isLoading}
                >
                  {content}
                </MessageItem>
              </div>
            );
          }
        )}
      </MessageList>
      <MessageForm onSubmit={sendMessage} />
    </>
  );
};
