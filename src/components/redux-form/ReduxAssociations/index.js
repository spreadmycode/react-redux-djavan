import { omit } from 'lodash';
import { compose, pure } from 'recompose';
import { string, oneOfType, arrayOf } from 'prop-types';

import { Associations, FieldError } from 'src/components';
import { selectOptionsType, reduxFormInputType } from 'src/prop-types';

const propTypes = {
  input: reduxFormInputType.isRequired,
  options: selectOptionsType.isRequired,
  wrapperClassName: string,
  error: oneOfType([string, arrayOf(string)]),
};

const enhance = compose(
  pure,
);

const ReduxAssociations = ({
  input: { value, onChange },
  options,
  error,
  wrapperClassName,

  ...props
}) => (
  <div className={wrapperClassName || ''}>
    <Associations
      onChange={onChange}
      values={value}
      options={options}
      {...omit(props, 'meta')}
    />
    <FieldError error={error} />
  </div>
);

ReduxAssociations.propTypes = propTypes;

export default enhance(ReduxAssociations);
