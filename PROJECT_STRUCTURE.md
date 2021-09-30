# Project structure and architecture

A project of such size needs to be built with strict conventions to keep it healthy every moment of time. To solve that every programmer of a team needs to know where and how to implement one or another feature. Every programmer who knows the basics of React/Redux asks a question "OK, but what if I need to do X? Where and how should I do that?". The new structure gives a answer on 99.9% of all questions of this kind.

## The Redux store

We use flat structure for the store splitted into entities: users, clients, reports, ... the only exception from this rule is `app` store branch which contains "global" data. Every entity branch includes `data` key-value object: keys are entity ids, values are entities themselves.

```js
{
  users: {
    data: {
      1: { ... },
      2: { ... },
      3: { ... }
    }
  },
  clients: {
    data: {
      1: { ... },
      2: { ... },
      3: { ... }
    }
  }
}
```

`data` is filled up automatically by the API and special reducer which recursively unfolds objects with `entity_type` field into the store. This allows us to get an entity change everywhere in the app by simple response from the server.

## File structure

Client-side of the application is stored at `/src` folder.

`/components` contains components which are:

1. Not connected to the store.
2. They are common and can be imported.

Examples: `SuperButton`, `ClientsForm`, `PageHeader`.

The folder contains smaller categorizing folders like `/clients` (contains components for clients like `ClientFullDescription`) or `/forms` (contains custom form fields).

All the components need to be exported from `/components/index.js` and must be imported only from there.

Explanation:

1. It allows to change component path any time. For example if you want to move FooBar.js from `/baz`  to `/qux` you need to change index.js only and no application file.
2. It makes possible to nicely import needed components `import { Foo, Bar, Baz } from 'client/components'`.


`/containers` contains components which *are connected to the store* (like `ClientsPage`). An exception is `MainLayout` which just contains a wrapper for entire application.

`/legacy` contains messy stuff created earlier.

`/helpers` contains helpful functions.

`/configureStore` is a store configuration.

`/middlewares` contains custom middlewares.

- `apiMiddleware` allows to nicely call API methods. See below.

`/prop-types` contains custom project-specific prop types like client object or breadcrumbs array. It allows us to not copy-paste complex prop types from file to file.

`/redux` folder is described at next section.

## Redux

All the manipulations with store (reducers, actions etc) live there. Every folder named as a corresponding entity (users, customers, unicorns, `/app` is the only exception).

`constants.js` exports constants (note that they need to be prefixed).

`reducer.js` contains reducer created with `combineReducers` which takes all sub-reducers named as data key they responsible for.

`actions.js` contains action creators. They must contain as less logic as possible (you mustn't add extra features like "make this then dispatch that"). Note "api" actions which are powered by `apiMiddleware` making HTTP requests look and behave nice.

Just for example look at an action which loads clients.

```js
export const loadClients = ({ contains }) => ({
  types: [c.LOAD_CLIENTS, c.LOAD_CLIENTS_SUCCESS, c.LOAD_CLIENTS_FAIL],
  api: ({ get }) => get('clients/', { // get, post, del, put, patch
    // the second parameter is request options which can include everything what
    // fetch function accepts like "headers" or "body"
    // there are two custom keys: "params" and "data"
    params: { // params are serialized to query string
      include: ['departments', 'umbrella'],
      page: 1,
      per_page:10,
      sort: ['id'],
      filter: {
        'name.icontains': contains
      }
    }
  }),
  // also there can be "data" key for post request which will be stringified to JSON
  // and sent as request body
});
```

`selector.js` contains selectors for given entity. See [reselect](https://github.com/reactjs/reselect).

`sagas.js` contains so-called sagas which can be interpreted as custom logic when an action is called. For example call X when `c.SOMETHING` is dispatched. Think of them as of reducers but which can do any side effect (like call other actions) and shouldn't return new  state.

## Components

At this section "components" and "containers" mean the same.

For every component we're going to use stateless (non-class) components improved by so-called enhancers. Enhancer is a function which returns high order component (please google about HOC first). We use them to extend component features vertically and put extra properties there.

For as enhancers we're going to use already known `connect` from 'react-redux', `asyncConnect` from [redux-connect](https://github.com/makeomatic/redux-connect), various enhancers created by helpers exported from [recompose](https://github.com/acdlite/recompose), `UserAuthWrapper` from [redux-auth-wrapper](https://github.com/mjrussell/redux-auth-wrapper) (rarely), `reduxForm` from [redux-form](https://github.com/erikras/redux-form) and other.

For example we need to render a list of users and call `chooseUser(id)` when an user is clicked


```js
// Users.js
const reduxConnect = connect(
  store => ({
    users: getUsers(store) // getUsers is a selector
  }),
  {
    onChooseUser: chooseUser
  }
);

const Users = ({ users, onChooseUser }) => <div>
  (users.map(({ name, id }) => (<User
    name={name}
    key={id}
    id={id}
    onChooseUser={onChooseUser}
  />)))
</div>;


// we enhance stateless Users component by props "users" and onChooseUser""
export default reduxConnect(Users);
```

```js
// User.js
import { withHandlers } from 'recompose';

// since onChooseUser needs and ID of a clicked user we override onChooseUser
// read docs for withHandlers helper from recompose
const handlersEnhancer = withHandlers({
  onChooseUser: ({ onChooseUser, id }) => onChooseUser(id)
});

const User = ({ name, onChooseUser }) => (
  <div onClick={onChooseUser}>{name}</div>
);

export default handlersEnhancer(User)
```

This is very basic example. In real life there will be more ehnahcers. The difference between class components and this approach is that class approach makes components grow in breadth and forces to think about how to add more logic and to not break what's already done. Enhancers approach allows to add logic vertically which doesn't conflict with other things.

```js
reduxConnect(addExtraProperty(addExtraHandler(callAnotherHandlerWithArg(Component))))
```

These handlers can be combined using `compose` function from 'recompose'

```js
const enhance = compose(
  reduxConnect,
  addExtraProperty,
  addExtraHandler,
  callAnotherHandlerWithArg
);

export default enhance(Component);

```

## Conventions

Props need to be distructed and put to clearly:

```js
const Users = ({ users, onChooseUser }) => <div>
  (users.map(({ name, id }) => (<User
    name={name}
    key={id}
    id={id}
    onChooseUser={onChooseUser}
  />)))
</div>;
```

Instead of:
```js
const Users = (props) => <div>
  (props.users.map((userProps) => (<User
    key={id}
    onChooseUser={onChooseUser}
    {...userProps}
  />)))
</div>;
```

Disabled rules at .eslintrc must be explained.
