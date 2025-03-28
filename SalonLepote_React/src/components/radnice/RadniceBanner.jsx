import { Fragment, useState, useEffect } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import axiosClient from "./../../axios/axios-client";

export default function RadniceBanner() {
  const [radnice, setRadnice] = useState([]);
  const [filterIme, setFilterIme] = useState("");
  const [loading, setLoading] = useState(true);

  // Paginacija
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Učitavanje liste radnica
  useEffect(() => {
    fetchRadnice();
  }, [currentPage]); // Poziva API kada se stranica menja

  const fetchRadnice = async (ime = "") => {
    setLoading(true); // Aktivira se prilikom svakog učitavanja
    try {
      const response = await axiosClient.get(
        `/radnice?page=${currentPage}&include=user${ime ? `&ime=${ime}` : ""}`
      );
      console.log(response.data);
      setTotalPages(response.data.meta.last_page); // Postavljamo ukupan broj stranica
      setRadnice(response.data.data); // Postavljamo podatke o radnicama
    } catch (error) {
      console.error("Došlo je do greške prilikom učitavanja radnica.", error);
    } finally {
      setLoading(false); // Deaktivira loading stanje
    }
  };

  const handleFilterChange = (e) => {
    setFilterIme(e.target.value);
  };

  const handleFilterSubmit = () => {
    setCurrentPage(1); // Resetujemo na prvu stranicu prilikom filtriranja
    fetchRadnice(filterIme);
  };

  const obrisiFilter = () => {
    setFilterIme("");
    setCurrentPage(1); // Resetujemo na prvu stranicu prilikom brisanja filtera
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

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
              <th>Ime</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center">
                  Učitavanje...
                </td>
              </tr>
            ) : radnice.length > 0 ? (
              radnice.map((radnica, index) => (
                <tr key={radnica.id}>
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

        {/* Paginacija */}
        <div className="pagination mt-4 d-flex justify-content-center">
          <Button
            variant="secondary"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Prethodna
          </Button>
          <span className="mx-3">
            {currentPage} od {totalPages}
          </span>
          <Button
            variant="secondary"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Sledeća
          </Button>
        </div>
      </Container>
    </Fragment>
  );
}
