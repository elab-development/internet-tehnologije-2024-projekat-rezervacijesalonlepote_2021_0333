import React, { useEffect, useState } from "react";
import UslugaCard from "./UslugeCard";
import axiosClient from "../../axios/axios-client";
const UslugaPage = () => {
    const [usluge, setUsluge] = useState([]); // Držimo usluge u stanju
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {

        const fetchUsluge = async () => {
            try {
                const response = await axiosClient.get("/tipUsluga");

                console.log(response.data.data);
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

    return (
        <div className="usluge-container">
            <h1>Naša ponuda usluga</h1>
            <div className="usluge-list">
                {usluge && usluge.length > 0 ? (
                    usluge.map((value, index) => (
                       <UslugaCard usluga={value}></UslugaCard>
                    ))
                ) : (
                    <p className="alert-message">Nema usluga</p>
                )}
            </div>
        </div>
    );
};

export default UslugaPage;
