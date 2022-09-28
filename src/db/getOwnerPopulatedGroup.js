import { getMemberPopulatedGroup } from './getMemberPopulatedGroup';
import { getRequestsForGroup } from './getRequestsForGroup';

export const getOwnerPopulatedGroup = async (groupId) => {
  const group = await getMemberPopulatedGroup(groupId);
  const requestsForGroup = await getRequestsForGroup(groupId);

  const populatedGroup = { ...group, requests: requestsForGroup };
  return populatedGroup;
};
