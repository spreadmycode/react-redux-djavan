import { compose, pure, lifecycle, toClass, withState, withPropsOnChange, withHandlers } from 'recompose';
import { bool, func, string } from 'prop-types';
import React from 'react';
import ReactQuill from 'react-quill';
import classNames from 'classnames';
import { debounce } from 'lodash';

import css from './style.css';

const propTypes = {
  value: string,
  disabled: bool,
  className: string.isRequired,

  onSetRef: func.isRequired,
  onChange: func.isRequired,
};

const modules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    [{ align: [] }, 'direction'],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'super' }, { script: 'sub' }],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const formats = [
  'font', 'size', 'align', 'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'background',
  'link', 'image', 'code-block', 'script', 'color',
];

const propsEnhancer = withPropsOnChange(
  ['className', 'disabled'], ({ className, disabled }) => ({
    className: classNames({
      [css.wrapper]: true,
      [css.disabled]: !!disabled,
      [className]: !!className,
    }),
  }),
);

const refEnhancer = withState('reference', 'onSetRef', null);

// TODO: This should be killed once ReactQuill supports onBlur prop
const lifecycleEnhancer = lifecycle({
  componentDidMount() {
    // a little delay needs to be run before ReactQuill initialized
    setTimeout(() => {
      const { reference } = this.props;
      const editor = reference.editingArea.querySelector('.ql-editor');
      const handler = () => {
        const { onBlur } = this.props;
        if (typeof onBlur === 'function') {
          setTimeout(onBlur);
        }
      };

      editor.addEventListener('blur', debounce(handler, 300));
    });
  },
});

const handlersEnhancer = withHandlers({
  onChange: ({ onChange }) => value => onChange(value),
});

const enhance = compose(
  propsEnhancer,
  refEnhancer,
  lifecycleEnhancer,
  handlersEnhancer,
  pure,
  toClass,
);

const RichText = ({
  value,
  disabled,
  className,

  onSetRef,
  onChange,
}) => (
  <ReactQuill
    className={className}
    ref={onSetRef}
    readOnly={disabled}
    onChange={onChange}
    value={value}
    modules={modules}
    formats={formats}
  />
);

RichText.propTypes = propTypes;

export default enhance(RichText);
