import { compose, pure, withPropsOnChange, withHandlers } from 'recompose';
import { string, func, bool } from 'prop-types';

import css from './style.css';

const propTypes = {
  url: string,
  type: string,
  disabled: bool,

  onChange: func.isRequired,
};

const host = process.env.API_URL.replace(/(https?:\/\/.*?)\/.*/, '$1');

const propsEnhancer = withPropsOnChange(['assetsData', 'value'], ({ assetsData, value }) => ({
  url: value && assetsData[value] ? host + assetsData[value].download : null,
}));

const handlersEnhancer = withHandlers({
  onChange: ({ onChange, onUpload }) => async ({ target }) => {
    const file = target.files[0];
    if (file) {
      const file_name = file.name;
      const mime_type = file.type;

      const { response } = await onUpload({
        file,
        file_name,
        mime_type,
      });

      const { id } = response.data.asset;

      onChange(id);
    }
  },
});

const enhance = compose(
  propsEnhancer,
  handlersEnhancer,
  pure,
);

const Asset = ({
  url,
  type,
  disabled,

  onChange,
}) => (
  <div>
    <Base
      exists={type === 'image'}
      component="img"
      src={url}
      className={css.image}
    />

    <Base
      exists={type !== 'image'}
      component="a"
      target="_blank"
      href={url}
    >{url}</Base>

    <input disabled={disabled} type="file" onChange={onChange} />
  </div>
);

Asset.propTypes = propTypes;

export default enhance(Asset);
