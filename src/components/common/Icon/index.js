import classNames from 'classnames';
import { compose, pure, withPropsOnChange, mapProps } from 'recompose';
import { omit } from 'lodash';
import { string } from 'prop-types';

const propTypes = {
  className: string.isRequired,
};

const propsEnhancer = withPropsOnChange(['wb', 'fa', 'className'], ({ wb, fa, className }) => ({
  className: classNames({
    icon: true,
    [className]: !!className,
    [`wb-${wb}`]: !!wb,
    [`fa-${fa}`]: !!fa,
  }),
}));

const omitPropsEnhancer = mapProps(props => omit(props, ['wb', 'fa']));

const enhance = compose(
  propsEnhancer,
  omitPropsEnhancer,
  pure,
);

const Icon = props => (
  <i {...props} />
);

Icon.propTypes = propTypes;

export default enhance(Icon);
