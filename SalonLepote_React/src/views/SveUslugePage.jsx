import { Fragment } from "react";
import Footer from "../components/common/Footer.jsx";
import NavBar from "../components/common/NavBar.jsx";
import SveUsluge from "../components/usluge/SveUsluge.jsx"

export default function Pocetna() {
    return (
        <Fragment>
            <NavBar></NavBar>
            <SveUsluge></SveUsluge>
            <Footer></Footer>
        </Fragment>
    );
}