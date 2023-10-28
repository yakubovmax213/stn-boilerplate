/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import axios from 'axios';
import { ChatRow } from '@stn-ui/chat-row';
import { Heading } from '@stn-ui/heading';
import { TBody, THead, Table, Td, Tr } from '@stn-ui/table';
import styles from '../home.module.scss';
import { HomeActions } from './home-actions';

export const dynamic = 'force-dynamic';

const Home: NextPage = async () => {
  const { data: chats } = await axios.get(`${process.env.APP_HOST}/api/chats`);

  return (
    <>
      <div className={styles.toolbar}>
        <Heading variant="h5">Chats list</Heading>
        <HomeActions />
      </div>
      <Table>
        <THead>
          <Td colSpan={6}>Chat</Td>
          <Td colSpan={2} hidden="tablet">
            Created At
          </Td>
          <Td colSpan={2} hidden="mobile">
            Category
          </Td>
          <Td colSpan={2}>Messages</Td>
        </THead>
        <TBody>
          {!chats.length && (
            <Tr>
              <Td colSpan={12}>No chats yet</Td>
              <Td />
            </Tr>
          )}
          {(chats as any[]).map(
            ({
              id,
              title,
              lastMessage = 'default',
              icon,
              color = '#FF0000',
              tag = 'Default',
              counter,
              createdAt,
            }) => (
              <ChatRow
                key={id}
                title={title}
                lastMessage={lastMessage}
                icon={icon}
                color={color}
                tag={tag}
                counter={counter}
                createdAt={createdAt}
                linkAs={Link}
                href={`/chat/${id}`}
              />
            ),
          )}
        </TBody>
      </Table>
    </>
  );
};

export default Home;
