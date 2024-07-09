import styled from 'styled-components';
import { ReactComponent as LeftArrowSVG } from '../../assets/left_arrow.svg';
import { ReactComponent as RightArrowSVG } from '../../assets/right_arrow.svg';

const PaginationContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	margin-top: 1rem;
	padding: 1rem 0px;
`;

const PaginationButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	width: 3rem;
	height: 3rem;
	font-size: 1rem;
	border: 1px solid #e2e2e2;
	border-radius: 8px;
	background: #ffffff;
	color: #000000;
	transition: all 0.3s ease;

	&:hover {
		background: #581fe753;
		cursor: pointer;
	}

	@media screen and (max-width: 425px) {
		width: 2rem;
		height: 2rem;
		font-size: 0.8rem;
		padding: 0.8rem;
	}
`;

const RightArrowIcon = styled(RightArrowSVG)`
	width: 11px;
	height: 11px;
	@media screen and (max-width: 425px) {
		width: 8px;
		height: 8px;
	}
`;

const LeftArrowIcon = styled(LeftArrowSVG)`
	width: 11px;
	height: 11px;
	@media screen and (max-width: 425px) {
		width: 8px;
		height: 8px;
	}
`;

const PaginationButtonActive = styled(PaginationButton)`
	background: #561fe7;
	color: #ffffff;

	&:hover {
		background: #561fe7;
	}
`;

function Pagination({ currPage, setCurrPage, totalPages }) {
	let startPage = Math.max(currPage - 2, 1);
	let endPage = Math.min(currPage + 2, totalPages);

	if (currPage - 2 < 1) {
		endPage = Math.min(4, totalPages);
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

	return totalPages > 0 ? (
		<PaginationContainer>
			<PaginationButton
				onClick={() => setCurrPage(currPage - 1)}
				disabled={currPage === 1}
			>
				<LeftArrowIcon />
			</PaginationButton>
			{startPage > 1 && (
				<PaginationButton onClick={() => shiftPages('prev')}>
					{'...'}
				</PaginationButton>
			)}
			{Array.from(
				{ length: endPage - startPage + 1 },
				(_, i) => startPage + i,
			).map((pageNumber) => (
				<PaginationButton
					key={pageNumber}
					as={pageNumber === currPage ? PaginationButtonActive : undefined}
					onClick={() => setCurrPage(pageNumber)}
				>
					{pageNumber}
				</PaginationButton>
			))}
			{endPage < totalPages && (
				<PaginationButton onClick={() => shiftPages('next')}>
					{'...'}
				</PaginationButton>
			)}
			<PaginationButton
				onClick={() => setCurrPage(currPage + 1)}
				disabled={currPage === totalPages}
			>
				<RightArrowIcon />
			</PaginationButton>
		</PaginationContainer>
	) : (
		<PaginationContainer></PaginationContainer>
	);
}

export default Pagination;
