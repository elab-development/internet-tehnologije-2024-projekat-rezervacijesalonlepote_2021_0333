import { Fragment } from "react";
import Footer from "../components/common/Footer.jsx";
import NavBar from "../components/common/NavBar.jsx";
import TipUsluga from "../components/usluge/TipUsluga.jsx";
import RezervacijaTermina from "../components/usluge/RezervacijaTermina.jsx";
import { Col, Container, Row } from "react-bootstrap";

export default function MojiPodaciPage() {
    return (
        <Fragment>
            <NavBar></NavBar>
            <RezervacijaTermina></RezervacijaTermina>
            <Footer></Footer>
        </Fragment>
    );
}