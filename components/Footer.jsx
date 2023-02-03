import React from 'react';
import { AiFillInstagram } from 'react-icons/ai';
import { BsTelegram } from "react-icons/bs"

const Footer = () => {
    return (
        <div className="footer-container">
            <p>copyright &copy; cossmo <span>2023</span></p>
            <p className="icons">
                <a href="https://www.instagram.com/cossmo_uz/">
                    <AiFillInstagram />
                </a>
                <a href="https://t.me/Cossmo_uz">
                    <BsTelegram />
                </a>
            </p>
        </div>
    )
}

export default Footer