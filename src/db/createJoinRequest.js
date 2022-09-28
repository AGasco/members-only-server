import { db } from './db';
import { v4 as uuid } from 'uuid';

export const createJoinRequest = async (groupId, userId) => {
  const connection = db.getConnection();
  await connection
    .collection('requests')
    .insertOne({ id: uuid(), groupId, userId });
};
