import classes from './Pagination.module.css';

function Pagination({ currPage, setCurrPage, totalPages }) {
  return (
    <div className={classes.Pagination}>
      <button 
        className={classes.PaginationButton} 
        onClick={() => setCurrPage(currPage > 1 ? currPage - 1 : 1)}
        disabled={totalPages === 0}
      >
        {'<'}
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={index+1 === currPage ? `${classes.PaginationButton} && ${classes.PaginationButtonActive}` : classes.PaginationButton}
          onClick={() => setCurrPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button 
        className={classes.PaginationButton} 
        onClick={() => setCurrPage(currPage < totalPages ? currPage + 1 : totalPages)}
        disabled={totalPages === 0}
      >
        {'>'}
      </button>
    </div>
  );
}

export default Pagination;
