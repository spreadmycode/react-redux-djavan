import { createSelector } from 'reselect';
import { getIssuersData } from 'src/redux/issuers/selectors';

const getDocumentTemplatesIds = state => state.documentTemplates.ids;
const getCurrentDocumentTemplateId = state => state.documentTemplates.id;
const getDocumentTemplatesData = state => state.documentTemplates.data;

export const getDocumentTemplates = createSelector(
    [getDocumentTemplatesIds, getDocumentTemplatesData, getIssuersData],
    (ids, data, issuersData) => ids.map(id => ({
      ...data[id],
      issuer: issuersData[data[id].issuer],
    })),
);

export const getCurrentDocumentTemplate = createSelector(
  [getCurrentDocumentTemplateId, getDocumentTemplatesData],
  (id, data) => data[id],
);
