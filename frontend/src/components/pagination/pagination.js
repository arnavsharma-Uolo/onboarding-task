import classes from './Pagination.module.css';

function Pagination({ currPage, setcurrPage, totalPages }) {
  return (
    <div className={classes.Pagination}>
      <button 
        className={classes.PaginationButton} 
        onClick={() => setcurrPage(currPage > 1 ? currPage - 1 : 1)}
        disabled={totalPages === 0}
      >
        {'<'}
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={index+1 === currPage ? `${classes.PaginationButton} && ${classes.PaginationButtonActive}` : classes.PaginationButton}
          onClick={() => setcurrPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button 
        className={classes.PaginationButton} 
        onClick={() => setcurrPage(currPage < totalPages ? currPage + 1 : totalPages)}
        disabled={totalPages === 0}
      >
        {'>'}
      </button>
    </div>
  );
}

export default Pagination;
