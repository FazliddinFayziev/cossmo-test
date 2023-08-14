import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const formatPrice = (price) => {
    // Convert price to string to manipulate its characters
    const priceString = price.toString();

    // Split the price into parts by reversing the string, then joining them with spaces every 3 characters
    const formattedPrice = priceString.split('').reverse().join('').replace(/(\d{3}(?=\d))/g, '$1 ').split('').reverse().join('');

    return formattedPrice;
};

const Product = ({ product: { image, name, slug, price } }) => {
    return (
        <div>
            <Link href={`/product/${slug.current}`}>
                <div className="product-card">
                    <img
                        src={urlFor(image && image[0])}
                        width={250}
                        height={250}
                        alt='product'
                        className="product-image"
                    />
                    <p className="product-name">{name}</p>
                    <p className="product-price">{formatPrice(price)} so'm</p>
                </div>
            </Link>
        </div>
    )
}

export default Product