import { Fragment } from "react";
import NavBar from "../components/common/NavBar"
import Footer from "../components/common/Footer"
import TipUsluga from "../components/usluge/TipUsluga"

export default function UslugePage() {

    return (
        <Fragment>
            <NavBar></NavBar>
            <TipUsluga></TipUsluga>
            <Footer></Footer>
        </Fragment>
);


}