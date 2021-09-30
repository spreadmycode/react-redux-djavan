import { mapValues, keyBy } from 'lodash';

export const validationErrorsHelper = (state, action) => {
  const { status, data: resp } = action.response;
  return status === 400 ? resp || {} : state;
};

export const choicesHelper = (state, action) => mapValues(action.response.data, value => mapValues(keyBy(value, '0'), '1'));
