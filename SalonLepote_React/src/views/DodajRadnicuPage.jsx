import { Fragment } from "react";
import Footer from "../components/common/Footer.jsx";
import NavBar from "../components/common/NavBar.jsx";
import DodajRadnicu from "../components/radnice/DodajRadnicu.jsx"

export default function MojiPodaciPage() {
    return (
        <Fragment>
            <NavBar></NavBar>
            <DodajRadnicu></DodajRadnicu>
            <Footer></Footer>
        </Fragment>
    );
}