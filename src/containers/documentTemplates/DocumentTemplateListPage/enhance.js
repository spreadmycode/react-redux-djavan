import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { compose, pure, withPropsOnChange } from 'recompose';

// actions
import { loadDocumentTemplates, loadDocumentTemplateChoices, listFiltersChange } from 'src/redux/documentTemplates/actions';
import { loadIssuers } from 'src/redux/issuers/actions';

// selectors
import { getDocumentTemplates } from 'src/redux/documentTemplates/selectors';
import { getIssuers } from 'src/redux/issuers/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: async ({
    store: { dispatch },
    location: { query: { issuer, is_default, category } },
  }) => {
    const { response } = await dispatch(loadIssuers());
    const { issuers } = response.data;
    const defaultIssuer = issuers.find(({ is_default: d }) => d);
    const filter = {};

    if (defaultIssuer && !issuer) {
      issuer = defaultIssuer.id; // eslint-disable-line no-param-reassign
    }

    if (issuer && issuer !== 'all') {
      filter.issuer = { eq: +issuer };
    }

    if (category) {
      filter.category = { eq: category };
    }

    if (!is_default) {
      filter.is_default = { eq: true };
    }

    if (is_default === 'non-default') {
      filter.is_default = { eq: false };
    }

    await Promise.all([
      dispatch(loadDocumentTemplateChoices()),
      dispatch(loadDocumentTemplates({
        include: ['issuer'],
        filter,
      })),
    ]);
  },
}]);

const reduxConnect = connect(
  state => ({
    choices: state.documentTemplates.choices,
    documentTemplates: getDocumentTemplates(state),
    issuers: getIssuers(state),
  }),
  {
    onLoadDocumentTemplates: loadDocumentTemplates,
    onFiltersChange: listFiltersChange,
  },
  null,
  { pure: true },
);


const propsEnhancer = withPropsOnChange(['location'], ({
  location: { query: { issuer, category, is_default } },
}) => ({ filters: { issuer, category, is_default } }));

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  propsEnhancer,
  pure,
);
