import { mapKeys } from 'lodash';
import pluralize from 'pluralize';
import camelCase from 'camelcase';


function place(object, result) {
  if (object && typeof object === 'object' && object.entity_type) {
    const { id, entity_type: entityType } = object;

    result[entityType] = result[entityType] || {}; // eslint-disable-line no-param-reassign
    result[entityType][id] = result[entityType][id] // eslint-disable-line no-param-reassign
      ? Object.assign(result[entityType][id], object)
      : object;

    return object.id;
  }

  return object;
}

function normalizer(object, result) {
  if (object instanceof Array) {
    const ids = [];
    for (const item of object) {
      ids.push(normalizer(item, result));
    }
    return ids;
  }

  if (object && typeof object === 'object') {
    const clone = {};

    for (const [key, value] of Object.entries(object)) {
      clone[key] = normalizer(value, result);
    }

    return place(clone, result);
  }

  return object;
}

function normalize(data = {}) {
  const result = {};
  normalizer(data, result);
  return result;
}

function pluralizeKeys(object) {
  return mapKeys(object, (value, key) => camelCase(
    // TODO: This is tmp hotfix before server fix
    pluralize(key.replace('documenttemplate', 'document_template')),
  ));
}

export function combineRelationships(state, response) {
  const normalized = pluralizeKeys(normalize(response));
  const newState = Object.assign({}, state);


  for (const [key, branch] of Object.entries(newState)) {
    if (key in normalized) {
      const newBranch = Object.assign({}, branch);
      newState[key] = newBranch;
      newBranch.data = Object.assign({}, branch.data);

      for (const [id, entity] of Object.entries(normalized[key])) {
        if (id in newBranch.data) {
          newBranch.data[id] = Object.assign({}, branch.data[id], entity);
        } else {
          newBranch.data[id] = entity;
        }
      }
    }
  }

  return newState;
}
