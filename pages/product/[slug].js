import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaShoppingCart } from "react-icons/fa"

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

    const handleBuyNow = () => {
        setShowCart(true);
    }

    return (
        <>
            <h5>
                <span>
                    Qo'shimcha ma'lumotlar uchun:
                </span>
                <br />
                Telegram: @Cossmo_uz
                <br />
                <a href="tel:+99894392-06-02">
                    +99894392-06-02
                </a>
            </h5>
            <div>
                <div className="product-detail-container">
                    <div>
                        <div className="image-container">
                            <img src={urlFor(image && image[index])} className="product-detail-image" />
                        </div>
                        <div className="small-images-container">
                            {image?.map((item, i) => (
                                <img
                                    alt='product'
                                    key={i}
                                    src={urlFor(item)}
                                    className={i === index ? 'small-image selected-image' : 'small-image'}
                                    onMouseEnter={() => setIndex(i)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="product-detail-desc">
                        <h1>{name}</h1>
                        <div className="reviews">
                            <div>
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <AiOutlineStar />
                            </div>
                            <p>
                                (20)
                            </p>
                        </div>
                        <h4>Ma'lumot: </h4>
                        <p>{details}</p>
                        <p className="price">{price} so'm</p>
                        <div className="quantity">
                            <h3>Miqdor:</h3>
                            <p className="quantity-desc">
                                <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
                                <span className="num">{qty}</span>
                                <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
                            </p>
                        </div>
                        <div className="buttons">
                            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Qutiga qo'shish</button>
                            <button type="button" className="buy-now" onClick={handleBuyNow}><FaShoppingCart /></button>
                        </div>
                    </div>
                </div>

                <div className="maylike-products-wrapper">
                    <h2>Sizga yoqishi mumkin</h2>
                    <div className="marquee">
                        <div className="maylike-products-container track">
                            {products.map((item) => (
                                <Product key={item._id} product={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);



    return {
        props: { products, product }
    }
}

export default ProductDetails