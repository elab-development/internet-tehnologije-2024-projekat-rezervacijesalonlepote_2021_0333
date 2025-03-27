import { Fragment } from "react";
import Footer from "../components/common/Footer.jsx";
import NavBar from "../components/common/NavBar.jsx";
import KreirajTipUsluge from "../components/usluge/KreirajTipUsluge.jsx"

export default function Pocetna() {
    return (
        <Fragment>
            <NavBar></NavBar>
            <KreirajTipUsluge></KreirajTipUsluge>
            <Footer></Footer>
        </Fragment>
    );
}