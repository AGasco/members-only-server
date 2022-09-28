import { auth } from 'firebase-admin';
import { createGroup } from '../db';

export const createGroupRoute = {
  method: 'post',
  path: '/groups',
  handler: async (req, res) => {
    const token = req.headers.authtoken;
    const { name } = req.body;

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Must be authenticated to create a group' });
    }

    const user = await auth().verifyIdToken(token);
    const newGroupId = await createGroup(name, user.user_id);
    res.status(200).json({ newGroupId });
  }
};
