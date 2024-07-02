import classes from './Pagination.module.css';

function Pagination({ currPage, setCurrPage, totalPages }) {
  let startPage = Math.max(currPage - 2, 1);
  let endPage = Math.min(currPage + 2, totalPages);

  if (currPage - 2 < 1) {
    endPage = Math.min(5, totalPages);
  }
  if (currPage + 2 > totalPages) {
    startPage = Math.max(totalPages - 4, 1);
  }

  const shiftPages = (direction) => {
    if (direction === 'prev') {
      setCurrPage(Math.max(1, startPage - 5));
    } else {
      setCurrPage(Math.min(totalPages, endPage + 5));
    }
  };

  return (
    totalPages > 0 ? 
    <div className={classes.Pagination}>
      <button 
        className={classes.PaginationButton} 
        onClick={() => setCurrPage(1)}
        disabled={currPage === 1}
      >
        {'<<'}
      </button>
      {startPage > 1 && (
        <button
          className={classes.PaginationButton}
          onClick={() => shiftPages('prev')}
        >
          {'...'}
        </button>
      )}
      {Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i).map(pageNumber => (
        <button
          key={pageNumber}
          className={pageNumber === currPage ? `${classes.PaginationButton} ${classes.PaginationButtonActive}` : classes.PaginationButton}
          onClick={() => setCurrPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      {endPage < totalPages && (
        <button
          className={classes.PaginationButton}
          onClick={() => shiftPages('next')}
        >
          {'...'}
        </button>
      )}
      <button 
        className={classes.PaginationButton} 
        onClick={() => setCurrPage(totalPages)}
        disabled={currPage === totalPages}
      >
        {'>>'}
      </button>
    </div> : <div className={classes.Pagination}></div>
  );
}

export default Pagination;
