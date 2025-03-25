import { Fragment } from "react";
import Footer from "../components/common/Footer.jsx";
import NavBar from "../components/common/NavBar.jsx";
import MojiPodaciBanner from "../components/podaci/MojiPodaci.jsx";
import Termini from "../components/usluge/Termini.jsx";

export default function MojiPodaciPage() {
    return (
        <Fragment>
            <NavBar></NavBar>
            <Termini></Termini>
            <Footer></Footer>
        </Fragment>
    );
}