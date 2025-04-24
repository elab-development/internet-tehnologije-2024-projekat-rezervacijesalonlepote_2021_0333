import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UslugaCard from "./UslugeCard";
import axiosClient from "../../axios/axios-client";
import { useStateContext } from "../../context/ContextProvider";
import Breadcrumb from 'react-bootstrap/Breadcrumb';


export default function TipUsluga() {
    const [usluge, setUsluge] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useStateContext();
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]); 

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


    return (
        <div className="usluge-container">
            <Breadcrumb>
                <Breadcrumb.Item href="/auth/pocetna" className="link1">Početna</Breadcrumb.Item>
                <Breadcrumb.Item active>Usluge</Breadcrumb.Item>
            </Breadcrumb>
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
                    <button className="btn1" onClick={handleClick}>
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

