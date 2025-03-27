import { Fragment, useState, useEffect } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import axiosClient from "./../../axios/axios-client";

export default function RadniceBanner() {
  const [radnice, setRadnice] = useState([]);
  const [filterIme, setFilterIme] = useState("");

  // Učitavanje liste radnica
  useEffect(() => {
    fetchRadnice();
  }, []);

  const fetchRadnice = async (ime = "") => {
    try {
      const response = await axiosClient.get(
        `/radnice?include=user${ime ? `&ime=${ime}` : ""}`
      );
      setRadnice(response.data.data);
    } catch (error) {
      console.error("Došlo je do greške prilikom učitavanja radnica.", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilterIme(e.target.value);
  };

  const handleFilterSubmit = () => {
    fetchRadnice(filterIme);
  };

  const obrisiFilter = () => {
    setFilterIme("");
    fetchRadnice();
  };

  const handleDelete = async (radnicaId) => {
    if (window.confirm("Da li ste sigurni da želite da obrišete ovu radnicu?")) {
      try {
        await axiosClient.delete(`/radnice/${radnicaId}`);
        setRadnice(radnice.filter((radnica) => radnica.id !== radnicaId));
      } catch (error) {
        console.error("Došlo je do greške prilikom brisanja radnice.", error);
      }
    }
  };

  return (
    <Fragment>
      <Container fluid={true} className="mainBanner pt-5">
        <h2>Lista radnica</h2>

        {/* Filter i dugme za dodavanje */}
        <div className="d-flex align-items-center mb-3 gap-3">
          <Form.Control
            type="text"
            placeholder="Pretraga po imenu"
            value={filterIme}
            onChange={handleFilterChange}
            className="me-2"
          />
          <Button variant="secondary" onClick={handleFilterSubmit}>
            Filtriraj
          </Button>
          <Button onClick={obrisiFilter}>Obriši filter</Button>
          <Button variant="success" className="ms-2" href="/dodajRadnicu">
            Dodaj radnicu
          </Button>
        </div>

        {/* Tabela radnica */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Ime</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {radnice.length > 0 ? (
              radnice.map((radnica, index) => (
                <tr key={radnica.id}>
                  <td>{index + 1}</td>
                  <td>{radnica.user?.name || "Nepoznato"}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(radnica.id)}
                    >
                      Obriši
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  Nema dostupnih radnica.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </Fragment>
  );
}
