import { useContext } from 'react';
import Header from './Header';
import CheckoutSection from './CheckoutSection';
import Footer from './Footer';

function CheckoutPage() {
    return (
        <>
            <Header />
            <CheckoutSection />
            <Footer />
        </>
    );
}

export default CheckoutPage;