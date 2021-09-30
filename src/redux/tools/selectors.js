import { createSelector } from 'reselect';

const getToolsIds = state => state.tools.ids;
const getCurrentToolId = state => state.tools.id;
const getToolsData = state => state.tools.data;

export const getTools = createSelector(
  [getToolsIds, getToolsData],
  (ids, data) => ids.map(id => data[id]),
);

export const getCurrentTool = createSelector(
  [getCurrentToolId, getToolsData],
  (id, data) => data[id],
);
