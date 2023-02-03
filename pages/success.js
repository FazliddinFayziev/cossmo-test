import React, { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireworks();
    }, []);

    return (
        <div className="success-wrapper">
            <div className="success">
                <p className="icon">
                    <BsBagCheckFill />
                </p>
                <h2>Buyurtma berganingiz uchun rahmat</h2>
                <p className="email-msg">Bir oz vaqtdan so'ng siz bilan bog'lanamiz</p>
                <p className="description">
                    Qo'shimcha ma'lumotlar uchun:
                    <br />
                    Telegram: @Cossmo_uz
                    <br />
                    <a className="email" href="tel:+99894392-06-02">
                        +99894392-06-02
                    </a>
                </p>
                <Link href="/">
                    <button type="button" width="300px" className="btn">
                        Davom etish
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Success