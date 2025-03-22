import { Fragment } from "react";
import Footer from "../components/common/Footer.jsx";
import NavBar from "../components/common/NavBar.jsx";
import TopBanner from "../components/pocetna/TopBanner.jsx";
import Usluge from "../components/pocetna/Usluge.jsx";
import ImageCarousel from "../components/pocetna/Slick.jsx"

export default function Pocetna() {
    return (
        <Fragment>
           <NavBar></NavBar>
            <TopBanner></TopBanner>
            <Usluge></Usluge>
            <ImageCarousel></ImageCarousel>
            <Footer></Footer>
        </Fragment>
    );
}