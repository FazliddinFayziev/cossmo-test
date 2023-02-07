import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';


const Layout = ({ children }) => {
    return (
        <div className='layout'>
            {/* header */}
            <Head>
                <title>Cossmo</title>
                <meta name="description"
                    content="cossmo online do'kon" />
                <meta name="keywords" content="cossmo, cossmo uz cossmo-online-do'kon cossmo-uz cossmo-uzb cossmo uzb " />
                <meta name="author" content="Fazliddin Fayziev" />
            </Head>
            {/* header */}
            <header>
                <Navbar />
            </header>
            {/* header-end */}
            {/* Main container start ====> comming from index.js(main) */}
            <main className='main-container'>
                {children}
            </main>
            {/* main part end */}
            {/* footer start */}
            <footer>
                <Footer />
            </footer>
            {/* footer-end */}
        </div>
    )
}

export default Layout
