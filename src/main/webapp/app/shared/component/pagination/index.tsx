import React, { Component } from 'react';
import { IPagingItem } from 'app/shared/model/layout';
import ReactPaginate from 'react-paginate';
import { FontIcon } from '../icon';

interface IPaginationProps {
  containerClass?: string;
  currentPage?: number;
  perPage?: number;
  total?: number;
  lastPage?: number;
  from?: number;
  to?: number;
  handleChangePage?: (value) => void;
}

class Pagination extends Component<IPaginationProps> {
  render() {
    const { containerClass, handleChangePage, currentPage, lastPage } = this.props;
    return (
      <nav>
        <ReactPaginate
          forcePage={currentPage - 1}
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          previousLabel={<FontIcon iconName="chevron-left" className="nav-icon" />}
          nextLabel={<FontIcon iconName="chevron-right" className="nav-icon" />}
          breakLabel={'...'}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          breakClassName={'break-me'}
          pageCount={lastPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handleChangePage}
          containerClassName={`pagination pagination-circle mg-b-0 justify-content-end ${containerClass} pagination`}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </nav>
    );
  }
}

export { Pagination };
