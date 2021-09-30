// https://gist.github.com/finom/909e1162003e6b1214d907e04143d56f

import { Component } from 'react';
import { func } from 'prop-types';

import { reduxFormInputType } from 'src/prop-types';

const propTypes = {
  input: reduxFormInputType.isRequired,
  onFill: func.isRequired,
};

class ReduxFormHiddenField extends Component {
  static propTypes = propTypes;

  componentWillMount() {
    const { onFill, input } = this.props;

    if (typeof onFill === 'function') {
      onFill(input.value);
    }
  }
  componentDidUpdate(prevProps) {
    const { onFill, input } = this.props;

    if (typeof onFill === 'function' && input.value !== prevProps.input.value) {
      onFill(input.value);
    }
  }
  render() {
    return null;
  }
}

export default ReduxFormHiddenField;
