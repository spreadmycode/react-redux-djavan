import { combineRelationships } from 'src/helpers/combineRelationships';
import { COMBINE_RELATIONSHIPS } from 'src/middlewares/apiMiddleware';

export default function rootReducer(state = {}, action) {
  switch (action.type) {
    case COMBINE_RELATIONSHIPS:
      return combineRelationships(state, action.response);
    default:
      return state;
  }
}
