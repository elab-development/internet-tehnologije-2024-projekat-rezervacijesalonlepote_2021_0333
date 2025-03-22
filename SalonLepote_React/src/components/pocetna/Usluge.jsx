import { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import service1 from "../../assets/images/Manikir.jpg";
import service2 from "../../assets/images/Pedikir.jpg";
import service3 from "../../assets/images/MedPedikir.jpg";
 
export default function Usluge() {
  return (
    <Fragment>
      <Container>
        <Row>
          <Col lg={4} md={12} sm={12}>
            <div className="serviceCard text-center">
              <img src={service1}/>
              <h3 className="title">Manikir - Lepota na dohvat ruke</h3>
              <p className="text">
              Ruke su ogledalo nege i stila, a savršen manikir je njihov najbolji ukras. U našem salonu nudimo širok spektar manikir tretmana – od klasične nege noktiju, preko gel laka, do nadogradnje i unikatnog nail arta. 
              </p>
            </div>
          </Col>
          <Col lg={4} md={12} sm={12}>
            <div className="serviceCard text-center">
              <img src={service2}/>
              <h3 className="title">Pedikir - Nega i opuštanje za vaša stopala</h3>
              <p className="text">
              Stopala su često zapostavljena, ali zaslužuju jednaku pažnju kao i ruke. Kvalitetan pedikir ne samo da poboljšava izgled noktiju već i doprinosi zdravlju i udobnosti vaših stopala.
              </p>
            </div>
          </Col>
          <Col lg={4} md={12} sm={12}>
            <div className="serviceCard text-center">
              <img src={service3}/>
              <h3 className="title">Medicinski pedikir - Zdravlje vaših stopala na prvom mestu</h3>
              <p className="text">
              Medicinski pedikir je namenjen svima koji imaju specifične probleme sa stopalima, poput uraslih noktiju, zadebljanja, kurjih očiju ili ispucalih peta. Ovaj tretman se izvodi uz posebnu pažnju i korišćenje sterilnih instrumenata.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}