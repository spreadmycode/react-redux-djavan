import { compose, pure, withPropsOnChange } from 'recompose';
import sanitizeHtml from 'sanitize-html';
import { string, bool, func, oneOfType, shape } from 'prop-types';

import css from './style.css';

const propTypes = {
  html: shape({
    __html: string.isRequired,
  }).isRequired,
  exists: bool.isRequired,
  component: oneOfType([string, func]).isRequired,
};

const propsEnhancer = withPropsOnChange(
  ['html', 'component'], ({ html, component }) => ({
    html: {
      __html: sanitizeHtml(html, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedSchemesByTag: {
          img: ['data', 'http', 'https'],
        },
      }),
    },
    exists: !!html,
    component: component || 'div',
  }),
);

const enhance = compose(
  propsEnhancer,
  pure,
);

const SafeHTML = ({
  html,
  exists,
  component,
  ...props
}) => (
  <Base
    component={component}
    className={css.safeHTML}
    exists={exists}
    dangerouslySetInnerHTML={html}
    {...props}
  />
);

SafeHTML.propTypes = propTypes;

export default enhance(SafeHTML);
