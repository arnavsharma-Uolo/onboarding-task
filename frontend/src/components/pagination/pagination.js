import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
  margin-top: 1em;
  padding: 1em 0px;
`;

const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  width: 3em;
  height: 3em;
  border: 1px solid #E2E2E2;
  border-radius: 8px;
  background: #FFFFFF;
  color: #000000;
  transition: all 0.3s ease;

  &:hover {
    background: #581fe753;
    cursor: pointer;
  }
`;

const PaginationButtonActive = styled(PaginationButton)`
  background: #561FE7;
  color: #ffffff;

  &:hover {
    background: #561FE7;
  }
`;

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
    <PaginationContainer>
      <PaginationButton 
        onClick={() => setCurrPage(currPage - 1)}
        disabled={currPage === 1}
      >
        {'<'}
      </PaginationButton>
      {startPage > 1 && (
        <PaginationButton
          onClick={() => shiftPages('prev')}
        >
          {'...'}
        </PaginationButton>
      )}
      {Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i).map(pageNumber => (
        <PaginationButton
          key={pageNumber}
          as={pageNumber === currPage ? PaginationButtonActive : undefined}
          onClick={() => setCurrPage(pageNumber)}
        >
          {pageNumber}
        </PaginationButton>
      ))}
      {endPage < totalPages && (
        <PaginationButton
          onClick={() => shiftPages('next')}
        >
          {'...'}
        </PaginationButton>
      )}
      <PaginationButton 
        onClick={() => setCurrPage(currPage + 1)}
        disabled={currPage === totalPages}
      >
        {'>'}
      </PaginationButton>
    </PaginationContainer> : <PaginationContainer></PaginationContainer>
  );
}

export default Pagination;
