import Head from 'next/head';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = ( props ) => {
    return (
        <div>
            <Head>
                <title>Woocommerce React</title>
                <link rel="stylesheet" type="text/css" href="style.css" />
            </Head>
            <Header />


            <Footer />
            { props.children }
        </div>
    );
};

export default Layout;