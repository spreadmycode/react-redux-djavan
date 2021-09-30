import { compose, pure, withPropsOnChange, withHandlers } from 'recompose';
import { string, func } from 'prop-types';

import css from './style.css';

const propTypes = {
  url: string,
  type: string,

  onFileChange: func.isRequired,
};

const propsEnhancer = withPropsOnChange(['assetsData', 'input'], ({ assetsData, input: { value } }) => ({
  url: value && assetsData[value] ? assetsData[value].file : null,
}));

const handlersEnhancer = withHandlers({
  onFileChange: ({ input: { onChange }, onUpload }) => async ({ target }) => {
    const file = target.files[0];
    const file_name = file.name;
    const mime_type = file.type;

    const { response } = await onUpload({
      file,
      file_name,
      mime_type,
    });

    const { id } = response.data.asset;

    onChange(id);
  },
});

const enhance = compose(
  propsEnhancer,
  handlersEnhancer,
  pure,
);

const ReduxAsset = ({
  url,
  type,

  onFileChange,
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

    <input type="file" onChange={onFileChange} />
  </div>
);

ReduxAsset.propTypes = propTypes;

export default enhance(ReduxAsset);
