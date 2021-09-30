import apiCrud from '../helpers/apiCrud';
import { noty } from '../redux/app/actions';
import { logout } from '../redux/users/actions';

export const COMBINE_RELATIONSHIPS = 'djavan/COMBINE_RELATIONSHIPS';

function showError(response, next) {
  const { detail, non_field_errors, dependent_resources } = response.data || {};

  if (detail || non_field_errors) {
    return next(noty({
      type: 'error',
      text: detail || non_field_errors.join('\n'),
    }));
  }

  if (dependent_resources) {
    return next(noty({
      type: 'error',
      text: `Dependent resources: ${Object.keys(dependent_resources).join(', ')}`,
    }));
  }

  let customError;

  if (typeof response.data === 'string') {
    customError = response.data;
  } else if (response.data instanceof Array) {
    customError = response.data.join('\n');
  } else if (!response.data) {
    customError = 'Unknown error';
  }

  if (customError) {
    return next(noty({
      type: 'error',
      text: customError,
    }));
  }

  return undefined;
}

export default function apiMiddleware() {
  return () => next => async (action) => {
    const { api, types, ...rest } = action;

    if (!api) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;

    next({ ...rest, type: REQUEST });

    try {
      const response = await api(apiCrud);

      // UNAUTHORIZED
      if (response.status === 401) {
        showError(response, next);
        next({ ...rest, response, type: FAILURE });

        return next(logout());
      }

      if (response.status < 200 || response.status > 299) {
        showError(response, next);

        return next({ ...rest, response, type: FAILURE });
      }

      next({ response: response.data, type: COMBINE_RELATIONSHIPS });

      return next({ ...rest, response, type: SUCCESS });
    } catch (error) {
      next(noty({
        type: 'error',
        text: error.message,
      }));

      console.error(error); // eslint-disable-line no-console

      return next({ ...rest, response: {}, error, type: FAILURE });
    }
  };
}
