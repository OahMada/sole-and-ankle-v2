import React from 'react';
import styled from 'styled-components';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({ slug, name, imageSrc, price, salePrice, releaseDate, numOfColors }) => {
	// There are 3 variants possible, based on the props:
	//   - new-release
	//   - on-sale
	//   - default
	//
	// Any shoe released in the last month will be considered
	// `new-release`. Any shoe with a `salePrice` will be
	// on-sale. In theory, it is possible for a shoe to be
	// both on-sale and new-release, but in this case, `on-sale`
	// will triumph and be the variant used.
	// prettier-ignore
	const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

	let priceFlag = {};

	switch (variant) {
		case 'on-sale':
			priceFlag.text = 'Sale';
			priceFlag.backgroundColor = COLORS.primary;
			break;
		case 'new-release':
			priceFlag.text = 'Just Released!';
			priceFlag.backgroundColor = COLORS.secondary;
			break;

		default:
			priceFlag = undefined;
			break;
	}

	let onSale = variant === 'on-sale';

	return (
		<Link href={`/shoe/${slug}`}>
			<Wrapper>
				<ImageWrapper>
					<Image alt='' src={imageSrc} />
					{priceFlag && <PriceFlag style={{ '--backgroundColor': priceFlag.backgroundColor }}>{priceFlag.text}</PriceFlag>}
				</ImageWrapper>
				<Spacer size={12} />
				<Row>
					<Name>{name}</Name>
					<Price style={{ '--color': onSale ? COLORS.gray[700] : undefined, '--text-decoration': onSale ? 'line-through' : 'none' }}>
						{formatPrice(price)}
					</Price>
				</Row>
				<Row>
					<ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
					{onSale && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
				</Row>
			</Wrapper>
		</Link>
	);
};

const Link = styled.a`
	text-decoration: none;
	color: inherit;
	flex: 1 0 340px;
`;

const Wrapper = styled.article`
	margin-bottom: 30px;
`;

const ImageWrapper = styled.div`
	position: relative;
`;

const Image = styled.img`
	width: 100%;
	border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
	font-size: 1rem;
	display: flex;
	justify-content: space-between;
`;

const Name = styled.h3`
	font-weight: ${WEIGHTS.medium};
	color: ${COLORS.gray[900]};
`;

const Price = styled.span`
	color: var(--color);
	text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
	color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
	font-weight: ${WEIGHTS.medium};
	color: ${COLORS.primary};
`;

var PriceFlag = styled.span`
	display: block;
	color: ${COLORS.white};
	background-color: var(--backgroundColor);
	/* width: max-content; this is unnecessary */
	font-size: ${14 / 16}rem;
	font-weight: ${WEIGHTS.bold};
	padding: 0 9px;
	height: ${32 / 16}rem;
	line-height: ${32 / 16}rem;
	border-radius: 2px;
	position: absolute;
	top: 12px;
	right: -4px;
`;

export default ShoeCard;
