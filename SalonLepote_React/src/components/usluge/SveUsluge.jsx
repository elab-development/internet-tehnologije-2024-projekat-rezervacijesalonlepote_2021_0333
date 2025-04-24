import { Fragment, useState, useEffect } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";
import axiosClient from "../../axios/axios-client";

export default function TipUslugaBanner() {
    const [tipoviUsluga, setTipoviUsluga] = useState([]);
    const [filterNaziv, setFilterNaziv] = useState("");

    // Učitavanje liste tipova usluga
    useEffect(() => {
        fetchTipoviUsluga();
    }, []);

    const fetchTipoviUsluga = async (naziv = "") => {
        try {
            const response = await axiosClient.get(
                `/tipUsluga${naziv ? `?naziv=${naziv}` : ""}`
            );
            setTipoviUsluga(response.data.data);
        } catch (error) {
            console.error("Došlo je do greške prilikom učitavanja tipova usluga.", error);
        }
    };

    const handleFilterChange = (e) => {
        setFilterNaziv(e.target.value);
    };

    const handleFilterSubmit = () => {
        fetchTipoviUsluga(filterNaziv);
    };

    const obrisiFilter = () => {
        setFilterNaziv("");
        fetchTipoviUsluga();
    };

    const handleDelete = async (tipUslugeId) => {
        if (window.confirm("Da li ste sigurni da želite da obrišete ovaj tip usluge?")) {
            try {
                await axiosClient.delete(`/tipUsluga/${tipUslugeId}`);
                setTipoviUsluga(tipoviUsluga.filter((tip) => tip.id !== tipUslugeId));
            } catch (error) {
                console.error("Došlo je do greške prilikom brisanja tipa usluge.", error);
            }
        }
    };

    return (
        <Fragment>
            <Container fluid={true} className="mainBanner pt-5">
                <h2>Lista tipova usluga</h2>

                {/* Filter i dugme za dodavanje */}
                <div className="d-flex align-items-center mb-3 gap-3">
                    <Form.Control
                        type="text"
                        placeholder="Pretraga po nazivu"
                        value={filterNaziv}
                        onChange={handleFilterChange}
                        className="me-2"
                    />
                    <Button variant="secondary" onClick={handleFilterSubmit}>
                        Filtriraj
                    </Button>
                    <Button onClick={obrisiFilter}>Obriši filter</Button>
                    <Button variant="success" className="ms-2" href="/dodajTipUsluga">
                        Dodaj tip usluge
                    </Button>
                </div>

                {/* Tabela tipova usluga */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Naziv</th>
                            <th>Akcije</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tipoviUsluga.length > 0 ? (
                            tipoviUsluga.map((tipUsluge, index) => (
                                <tr key={tipUsluge.id}>
                                    <td>{index + 1}</td>
                                    <td>{tipUsluge.naziv || "Nepoznato"}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDelete(tipUsluge.id)}
                                        >
                                            Obriši
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">
                                    Nema dostupnih tipova usluga.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </Fragment>
    );
}
