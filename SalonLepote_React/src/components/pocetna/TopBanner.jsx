import { Fragment, useState, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap"
import studioSlika from "../../assets/images/Studio.jpg";
import 'animate.css'

export default function TopBanner() {


    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <Fragment>
            <Container fluid className="topBanner">
                <Row>
                    <Col lg={6} md={12} sm={12} className={`topBannerText ${animate ? "animate__animated animate__fadeInLeft" : ""}`}>
                        <h1>Dobrodošli u NP Nails, salon lepote gde svaki nokat postaje umetničko delo!</h1>
                        <p>Naša priča počela je [godina osnivanja], iz ljubavi prema nezi noktiju i želje da svako pronađe svoj savršeni stil. Od malog, toplog kutka za manikir, brzo smo rasli zahvaljujući vašem poverenju i predanosti našem timu.</p>
                        <p>Naša misija je da spojimo kreativnost, kvalitet i vrhunsku uslugu, pružajući nezaboravno iskustvo svakom klijentu. Koristimo najkvalitetnije proizvode, pratimo najnovije trendove i stalno unapređujemo svoje tehnike.</p>
                    </Col>
                    <Col lg={6} md={12} sm={12} className={animate ? "animate__animated animate__fadeInRight" : ""}>
                        <div className="w-100">
                            <img src={studioSlika} alt="Studio.jpg" className="topBannerImage"/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}