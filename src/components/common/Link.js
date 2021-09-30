import { Link } from 'react-router';
import { compose, pure, withPropsOnChange, mapProps } from 'recompose';
import { connect } from 'react-redux';
import { omit } from 'lodash';

const reduxConnect = connect(
  state => ({ reachedLocations: state.app.reachedLocations }),
  null,
  null,
  { pure: true },
);
const propsEnhancer = withPropsOnChange(['to', 'reachedLocations'], ({ to, reachedLocations }) => {
  if (to) {
    const escapedTo = to.replace(/\//g, '');

    if (escapedTo in reachedLocations) {
      return { to: `${to}${reachedLocations[escapedTo].search}` };
    }
  }

  return undefined;
});

const omitPropsEnhancer = mapProps(props => omit(props, ['reachedLocations', 'dispatch']));

const enhance = compose(
  reduxConnect,
  propsEnhancer,
  omitPropsEnhancer,
  pure,
);

export default enhance(Link);
