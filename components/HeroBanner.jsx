import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const HeroBanner = ({ heroBanner }) => {
    return (
        <div className="hero-banner-container">
            <div>
                <p className="beats-solo">{heroBanner.smallText}</p>
                <h3>{heroBanner.midText}</h3>
                <h1>{heroBanner.largeText1}</h1>
                <img src={urlFor(heroBanner.image)} alt="first-banner" className="hero-banner-image" />

                <div>
                    <div className="desc">
                        <h5>Ma'lumot:</h5>
                        <p>{heroBanner.desc}</p>
                        <Link href={`/product/${heroBanner.product}`}>
                            <button type="button">{heroBanner.buttonText}</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroBanner