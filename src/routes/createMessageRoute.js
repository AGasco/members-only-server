import { getGroup, addMessageToGroup, getMessagesForGroup } from '../db';
import { auth } from 'firebase-admin';

export const createMessageRoute = {
  method: 'post',
  path: '/groups/:id/messages',
  handler: async (req, res) => {
    const token = req.headers.authtoken;
    const { id } = req.params;
    const { text } = req.body;

    const user = await auth().verifyIdToken(token);
    const group = await getGroup(id);

    if (!user || !group.members.includes(user.user_id)) {
      return res.status(401).json({
        message: 'User is not authorized to post messages in this group'
      });
    }

    await addMessageToGroup(id, user.user_id, text);
    const updatedMessages = await getMessagesForGroup(id);

    res.status(200).json(updatedMessages);
  }
};
