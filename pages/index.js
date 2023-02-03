import React from 'react';
import { useState } from 'react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ products, bannerData, bannerData2 }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h5>BIZNING MAXSULOTLARIMIZ</h5>
        <p>Arzon va sifatli maxsulotlar</p>
      </div>

      <div>
        <div className='search-div'>
          <input
            className='search'
            type="text"
            placeholder='Search'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>


      <div className="products-container">
        {products?.filter((product) => {
          if (searchTerm === "") {
            return <Product key={product._id} product={product} />
          }
          else if (product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
            return <Product key={product._id} product={product} />
          }
        }).map((product) =>
          <Product key={product._id} product={product} />
        )}
      </div>

      <FooterBanner footerBanner={bannerData2 && bannerData2[0]} />
    </div>
  )
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const bannerQuery2 = '*[_type == "banner2"]';
  const bannerData2 = await client.fetch(bannerQuery2);

  return {
    props: { products, bannerData, bannerData2 }
  }
}

export default Home;