import { db } from './db';
import { getUser } from './getUser';

export const getRequestsForGroup = async (groupId) => {
  const connection = db.getConnection();
  const requests = await connection
    .collection('requests')
    .find({ groupId })
    .toArray();

  const requestsAuthors = await Promise.all(
    requests.map((request) => getUser(request.userId))
  );

  const populatedRequests = requests.map((request, i) => ({
    ...request,
    userName: requestsAuthors[i].fullName
  }));

  return populatedRequests;
};
