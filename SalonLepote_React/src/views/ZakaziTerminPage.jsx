import { Fragment } from "react";
import Footer from "../components/common/Footer.jsx";
import NavBar from "../components/common/NavBar.jsx";
import TipUsluga from "../components/usluge/TipUsluga.jsx";

export default function MojiPodaciPage() {
    return (
        <Fragment>
            <NavBar></NavBar>
            <TipUsluga></TipUsluga>
            <Footer></Footer>
        </Fragment>
    );
}