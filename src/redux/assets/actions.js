import * as c from './constants';

const endpoint = 'assets/';

export const createAsset = ({
  file,
  ...data
}) => ({
  types: [c.CREATE_ASSET, c.CREATE_ASSET_SUCCESS, c.CREATE_ASSET_FAIL],
  api: ({ post }) => {
    const body = new window.FormData();

    body.append('file', file);
    body.append('data', JSON.stringify(data));
    body.append('commit', true);

    return post(endpoint, {
      body,
      jsonContentType: false,
    });
  },
});
