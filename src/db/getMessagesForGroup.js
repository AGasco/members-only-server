import { db } from './db';
import { getUser } from './getUser';

export const getMessagesForGroup = async (groupId) => {
  const connection = db.getConnection();
  const messages = await connection
    .collection('messages')
    .find({ groupId })
    .toArray();

  const messagesAuthors = await Promise.all(
    messages.map((message) => getUser(message.userId))
  );

  const populatedMessages = messages.map((message, i) => ({
    ...message,
    userName: messagesAuthors[i]
  }));

  return populatedMessages;
};
