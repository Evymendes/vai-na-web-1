import React, { useState, useEffect } from "react";
import styled from 'styled-components';

//Component
import PostList from '../blog/postList';

// styles
const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Content = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 768px) {
		width: 100%;
	}
`;

const Figure = styled.figure`
	display: ${props => props.mob ? 'none' : 'flex'};
	width: 2.5rem;

	@media (max-width: 768px) {
		display: ${props => props.mob ? 'flex' : 'none'};
		/* width: .792rem; */
	}
`;

const Arrow = styled.p`
	font-size: 5rem;
	font-weight: 200;
	color: #00145D;
	cursor: pointer;

	@media (max-width: 768px) {
		font-size: 2.3rem;
	}
`;

const ContainerPagination = styled.div`
	display: flex;
	align-items: center;

	@media (max-width: 768px) {
		width: 100%;
		justify-content: space-between;
	}
`;

const ContentPagination = styled.div`
	display: flex;
	align-items: center;
`;

const PaginationButton = styled.button`
	padding: 1.3125rem;
	width: 3.375rem;
	height: 3.375rem;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.25rem;
	color: #0F2B92;
	background: ${props => props.isSelected && '#FDE7A9'};
	border-radius: 50%;

	@media (max-width: 425px) {
		padding: 0;
    width: 2.375rem;
    height: 2.375rem;
    font-size: .938rem;
	}
`;

const Text = styled.button`
	display: none;

	@media (max-width: 768px) {
		padding-top: 4.737rem;
		display: flex;
		font-size: 1rem;
		color: #0F2B92;
		text-decoration: underline;
	}

	@media (max-width: 425px) {
		font-size: .688rem;
	}
`;

const Slider = ({ data }) => {
	const [current, setCurrent] = useState(6);
	const [dataList, setDataList] = useState([]);
	const [page, setPage] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		let isData = data && data;
		setDataList(isData);

		let arrayPages = [];
		let totalPages = Math.ceil(isData.length / 6);

		for (var i = 1; i <= totalPages; ++i) {
			arrayPages.push(i);
		}

		setPage(arrayPages);
	}, []);

	const handleScrollTo =  () => {
		window.scrollTo(0, 0);
	};

	const handlePrevious = () => {
		let handleSlide = current - 6;
		let renderPage = currentPage - 1;

		setCurrentPage(renderPage);
		setCurrent(handleSlide);
	}

	const handleNext = () => {
		let handleSlide = current + 6;
		let renderPage = currentPage + 1;

		setCurrentPage(renderPage);
		setCurrent(handleSlide);
	}

	const handlePagination = (number) => {
		let handleSlide = number * 6;

		setCurrentPage(number);
		setCurrent(handleSlide);
	}

	const renderSlider = (item) => {
		const listItem = item ? item : [];
		const sliderQuantity = 6;
		let startNumber = current - sliderQuantity;
		let endNumber = current;
		const renderList = listItem.slice(startNumber, endNumber);

		return (
			<Content>
				<Figure>
					{current >= 7 && <Arrow onClick={handlePrevious}>{'<'}</Arrow>}
				</Figure>
				<PostList data={renderList} />
				<Figure>
					{current <= item.length && <Arrow onClick={handleNext}>{'>'}</Arrow>}
				</Figure>
			</Content>
		)
	}

	const renderPagination = () => (
		<ContainerPagination>
			<Figure mob>
				{current >= 7 && <Arrow onClick={handlePrevious}>{'<'}</Arrow>}
			</Figure>
			<ContentPagination>
				{page.map(i => (
					<PaginationButton
						key={i}
						isSelected={i === currentPage}
						onClick={() => handlePagination(i)}
					>
						{i}
					</PaginationButton>
				))}
			</ContentPagination>
			<Figure mob>
				{current <= data.length && <Arrow onClick={handleNext}>{'>'}</Arrow>}
			</Figure>
		</ContainerPagination>
	)

	return (
		<Container>
			{renderSlider(data)}
			{renderPagination()}
			<Text onClick={handleScrollTo}>Voltar para o Topo</Text>
		</Container>
	)
}

export default Slider;

