import { Fragment } from "react";
import Footer from "../components/common/Footer.jsx";
import NavBar from "../components/common/NavBar.jsx";
import RadniceBanner from "../components/radnice/RadniceBanner.jsx"

export default function Pocetna() {
    return (
        <Fragment>
            <NavBar></NavBar>
            <RadniceBanner></RadniceBanner>
            <Footer></Footer>
        </Fragment>
    );
}