import React, { useState } from "react";
import axiosClient from "../../axios/axios-client";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";

export default function KreirajUslugu() {
    const [naziv, setNaziv] = useState(""); // Naziv usluge
    const [opis, setOpis] = useState(""); // Opis usluge
    const [cena, setCena] = useState(); // Cena usluge
    const [trajanje, setTrajanje] = useState(); // Cena usluge

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useStateContext(); // Token korisnika, proveriti da li je ulogovan
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!naziv || !opis || !cena || !trajanje) {
            setError("Sva polja moraju biti popunjena!");
            return;
        }

        setLoading(true);
        setError(null);

        const cenaInt = parseInt(cena);
        const trajanjeInt = parseInt(trajanje);
        try {
            const response = await axiosClient.post(
                "/tipUsluga",
                { naziv, opis, cena:cenaInt, trajanje:trajanjeInt },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            // Ako je usluga uspešno kreirana, možemo preusmeriti korisnika
            navigate("/uslugeadmin"); // Ovisno o tvojoj strukturi rute
        } catch (error) {
            setError("Greška pri kreiranju usluge: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="kreiraj-uslugu-container">
            <h1 className="title">Kreirajte novu uslugu</h1>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="azurirajForma mt-5">
                <div className="form-group">
                    <label htmlFor="naziv">Naziv usluge</label>
                    <input
                        type="text"
                        id="naziv"
                        className="form-control"
                        value={naziv}
                        onChange={(e) => setNaziv(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="opis">Opis usluge</label>
                    <textarea
                        id="opis"
                        className="form-control"
                        value={opis}
                        onChange={(e) => setOpis(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cena">Cena</label>
                    <input
                        type="number"
                        id="cena"
                        className="form-control"
                        value={cena}
                        onChange={(e) => setCena(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="trajanje">Trajanje</label>
                    <input
                        type="number"
                        id="trajanje"
                        className="form-control"
                        value={trajanje}
                        onChange={(e) => setTrajanje(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Učitavanje..." : "Kreiraj uslugu"}
                </button>
            </form>
        </div>
    );
}
