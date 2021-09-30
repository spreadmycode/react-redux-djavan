import {
    number,
    func,
} from 'prop-types';
import ReactPaginate from 'react-paginate';

import { compose, defaultProps, withHandlers, pure } from 'recompose';

import css from './style.css';

const propTypes = {
  pageCount: number,
  page: number,
  onChange: func,
    // privatePropTypes
};

const breakLabel = <a className="page-link">...</a>;

const getDefaultPropsEnhancer = defaultProps({
  pageCount: 0,
  page: 0,
});

const handlersEnhancer = withHandlers({
  onChange: ({ onChange }) => (value) => {
    onChange(value.selected + 1);
  },
});

const pageLinkClassName = `page-link ${css.pageLink}`;

const enhance = compose(
    getDefaultPropsEnhancer,
    handlersEnhancer,
    pure,
);

const Paginate = ({
    pageCount,
    page,
    onChange,
    ...props
}) =>
    (<Base
      component={ReactPaginate}
      exists={pageCount > 1}
      onPageChange={onChange}
      pageCount={pageCount}
      forcePage={page - 1}
      previousLabel="«"
      nextLabel="»"
      breakLabel={breakLabel}
      breakClassName={'page-item'}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      containerClassName={`pagination pagination-no-border ${css.pagination}`}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
      pageClassName="page-item"
      previousClassName="page-item"
      nextClassName="page-item"
      pageLinkClassName={pageLinkClassName}
      previousLinkClassName={pageLinkClassName}
      nextLinkClassName={pageLinkClassName}
      {...props}
    />)
;

Paginate.propTypes = propTypes;

export default enhance(Paginate);
