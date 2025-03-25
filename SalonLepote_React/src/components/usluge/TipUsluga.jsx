import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UslugaCard from "./UslugeCard";
import axiosClient from "../../axios/axios-client";
import { useStateContext } from "../../context/ContextProvider";

const UslugaPage = () => {
    const [usluge, setUsluge] = useState([]); // Držimo usluge u stanju
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useStateContext();
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]); // Čuva indekse odabranih usluga

    useEffect(() => {
        const fetchUsluge = async () => {
            try {
                const response = await axiosClient.get("/tipUsluga");
                setUsluge(response.data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsluge();
    }, []);

    if (loading) {
        return <div>Učitavanje...</div>;
    }

    if (error) {
        return <div>Greška: {error}</div>;
    }

    const handleClick = () => {
        navigate("/auth/login");
    };

    // Funkcija za dodavanje/uklanjanje usluge iz liste selected
    const handleCheckboxChange = (index) => {
        setSelected((prevSelected) =>
            prevSelected.includes(index)
                ? prevSelected.filter((i) => i !== index) // Ako je već izabran, ukloni ga
                : [...prevSelected, index] // Ako nije, dodaj ga
        );
        console.log(selected);
    };

    return (
        <div className="usluge-container">
            <h1 className="title">Naša ponuda usluga</h1>
            <div className="usluge-list">
                {usluge && usluge.length > 0 ? (
                    usluge.map((value, index) => (
                        <div key={index} className="usluga-item d-flex align-items-center">
                            <UslugaCard usluga={value} />
                        </div>
                    ))
                ) : (
                    <p className="alert-message">Nema usluga</p>
                )}
            </div>

            {!token && (
                <div>
                    <button className="btn btn-primary" onClick={handleClick}>
                        Napravite rezervaciju
                    </button>
                </div>
            )}

            {/* Prikaz odabranih usluga */}
            {token && selected.length > 0 && (
                <div className="selected-list mt-3">
                    <h3>Odabrane usluge:</h3>
                    <ul>
                        {selected.map((index) => (
                            <li key={index}>{usluge[index].naziv}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UslugaPage;
