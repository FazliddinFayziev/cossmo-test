import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useRouter } from 'next/router'

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';

const formatPrice = (price) => {
    // Convert price to string to manipulate its characters
    const priceString = price.toString();

    // Split the price into parts by reversing the string, then joining them with spaces every 3 characters
    const formattedPrice = priceString.split('').reverse().join('').replace(/(\d{3}(?=\d))/g, '$1 ').split('').reverse().join('');

    return formattedPrice;
};

const Cart = () => {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [address, setAddress] = useState("");
    const cartRef = useRef();
    const router = useRouter();
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();

    const handleCheckout = async () => {
        const myData = {
            items: {
                cartItems,
                totalPrice
            },
            user: {
                userName: { name },
                userNumber: { number },
                userAddress: { address }
            }
        }

        if (cartItems.length >= 1 && name !== "" && number !== "" && address !== "") {
            const result = await fetch('https://ecommerce-admin-daec0-default-rtdb.firebaseio.com/items.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(myData),
            });

            if (result.status === 500) {
                // Handle the error condition here if needed
                return;
            }

            // Sending data to Telegram Bot
            const telegramBotToken = '6680532739:AAFUSiCSI_i7myJr6wBxnRhemE7fE1i6REM';
            const chatId = '-755477822';

            const features = cartItems[0]?.features;
            const featuresText = features && Array.isArray(features) ? features.join('\n') : '';

            const message = `
                👤 **Customer:** ${name}

                ### User Information
                👤 **Customer Name:**  
                ${name}
                📞 **Customer PhN:**  
                ${number}
                🏠 **Customer Address:**  
                ${address}


                ### Delivery Information
                📦 **Product Name:**  
                ${cartItems[0]?.name} 
                💲 **Each product Price:**  
                ${formatPrice(cartItems[0]?.price)} uzs
                🔢 **Product Quantity:**  
                ${cartItems[0]?.quantity}
                💰 **Total Price:**  
                ${formatPrice(totalPrice)} uzs


                ### Product Details
                🔍 **Product Code:**  
                ${cartItems[0]?.productCode}
                🔌 **Features:**  
                ${featuresText}
                `;


            const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
            const telegramResult = await fetch(telegramApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown',
                }),
            });

            if (telegramResult.status === 200) {
                console.log('Message sent to Telegram successfully');
            }

            const resultJson = await result.json();

            router.push('/success');
            setShowCart(false);
        } else {
            alert(`Iltimos ma'lumot to'ldiring!!!`)
        }
        setName("");
        setNumber("");
        setAddress("");
    }


    return (
        <div className="cart-wrapper" ref={cartRef}>
            <div className="cart-container">
                <button
                    type="button"
                    className="cart-heading"
                    onClick={() => setShowCart(false)}>
                    <AiOutlineLeft />
                    <span className="heading">Sizning Buyurtmalaringiz</span>
                    <span className="cart-num-items">({totalQuantities} ta maxsulot)</span>
                </button>

                {cartItems.length < 1 && (
                    <div className="empty-cart">
                        <AiOutlineShopping size={150} />
                        <h3>Siz hech qanday mahsulotni tanlamadingiz</h3>
                        <Link href="/">
                            <button
                                type="button"
                                onClick={() => setShowCart(false)}
                                className="btn"
                            >
                                Davom etish
                            </button>
                        </Link>
                    </div>
                )}

                {/* Customer Information */}
                <div className="product-container">
                    {cartItems.length >= 1 &&
                        <div className='customer'>
                            <div className='customer-form'>
                                <form action="">
                                    <h4>Ismingiz:</h4>
                                    <input value={name} placeholder="Fazliddin..." type="text" onChange={(e) => setName(e.target.value)} required />
                                    <h4>Telefon raqamingiz:</h4>
                                    <input value={number} placeholder="(99)019-45-..." type="number" onChange={(e) => setNumber(e.target.value)} required />
                                    <h4>Manzil:</h4>
                                    <input value={address} placeholder="Sergeli tumani" type="text" onChange={(e) => setAddress(e.target.value)} required />
                                </form>
                            </div>
                        </div>
                    }
                    {cartItems.length >= 1 && cartItems.map((item) => (
                        <div className="product" key={item?._id}>
                            <img alt='product' src={urlFor(item?.image[0])} className="cart-product-image" />
                            <div className="item-desc">
                                <div className="flex top">
                                    <h5>{item.name}</h5>
                                    <h4>{formatPrice(item.price)} so'm</h4>
                                </div>
                                <div className="flex bottom">
                                    <div>
                                        <p className="quantity-desc">
                                            <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec')}>
                                                <AiOutlineMinus />
                                            </span>
                                            <span className="num">{item.quantity}</span>
                                            <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc')}><AiOutlinePlus /></span>
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="remove-item"
                                        onClick={() => onRemove(item)}
                                    >
                                        <TiDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length >= 1 && (
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Umumiy hisob:</h3>
                            <h3>{formatPrice(totalPrice)} so'm</h3>
                        </div>
                        <div className="btn-container">
                            <button type="button" className="btn" onClick={handleCheckout}>
                                Buyurtma Berish
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart