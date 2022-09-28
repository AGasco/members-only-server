import { auth } from 'firebase-admin';
import {
  getGroup,
  getMemberPopulatedGroup,
  getOwnerPopulatedGroup
} from '../db';

export const getGroupRoute = {
  method: 'get',
  path: '/groups/:id',
  handler: async (req, res) => {
    const token = req.headers.authtoken;
    const { id } = req.params;

    const user = await auth().verifyIdToken(token);

    if (!user || !token) {
      return res
        .status(401)
        .json({ message: 'Must be logged in to request group info' });
    }

    const group = await getGroup(id);

    // User is the owner of the group
    if (group.ownerId === user.user_id) {
      const ownerPopulatedGroup = await getOwnerPopulatedGroup(id);
      return res.status(200).json(ownerPopulatedGroup);
    }

    // User is member of the group
    if (group.members.includes(user.user_id)) {
      const memberPopulatedGroup = await getMemberPopulatedGroup(id);
      return res.status(200).json(memberPopulatedGroup);
    }

    // User is not member of the group
    res.status(200).json(group);
  }
};
