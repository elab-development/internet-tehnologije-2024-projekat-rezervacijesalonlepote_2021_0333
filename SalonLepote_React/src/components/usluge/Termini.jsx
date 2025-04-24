import { Fragment, useEffect, useState } from "react";
import axiosClient from "../../axios/axios-client";
import { useStateContext } from "../../context/ContextProvider";
import { Container } from "react-bootstrap";

export default function Termini() {
    const [termini, setTermini] = useState([]);
    const { user } = useStateContext();

    const [radnica, setRadnica] = useState(null); // Početno postavljamo kao null
    const [klijent, setKlijent] = useState(null); // Početno postavljamo kao null

    // Dinamički odredi endpoint na osnovu uloge
    const axiosEndpoint = user.role === "klijent" ? `/klijentForUser/${user.id}?include=user` : `/radnicaForUser/${user.id}?include=user`;
    console.log(axiosEndpoint);

    // Koristi useEffect za pozivanje API-ja za korisničke podatke
    useEffect(() => {
        const fetchKorisnik = async () => {
            const response = await axiosClient.get(axiosEndpoint);
            if (user.role === "klijent") {
                setKlijent(response.data.data);
            } else {
                setRadnica(response.data.data);
            }
        };

        fetchKorisnik();
    }, [user.id, axiosEndpoint]); // Ovaj useEffect zavisi od user.id, tako da će se pozivati svaki put kad se menja

    // Logika za praćenje kada se radnica ili klijent postave
    useEffect(() => {
        console.log("Radnica:", radnica);
        console.log("Klijent:", klijent);
    }, [radnica, klijent]);

    // Funkcija za dobijanje termina na osnovu korisnika
    const fetchTermini = async () => {
        if (user.role === "klijent" && klijent) {
            const apiEndpoint = `/termini?klijent=${klijent.id}&include=radnica.user`;
            const response = await axiosClient.get(apiEndpoint);
            setTermini(response.data.data);
            console.log(response);

        } else if (user.role === "radnik" && radnica) {
            const apiEndpoint = `/termini?radnica=${radnica.id}&include=klijent.user`;
            const response = await axiosClient.get(apiEndpoint);
            setTermini(response.data.data);
            console.log(response);
        }

    };

    const handleDelete = (param) => {
        try {
            const response = axiosClient.delete(`/termini/${param}`);
            window.alert("Uspesno obrisan termin!");
            fetchTermini();
        } catch (err) {
            console.log(err);
        }
    }



    // Pozovi fetchTermini kada su klijent ili radnica postavljeni
    useEffect(() => {
        if (klijent || radnica) {
            fetchTermini();
        }
    }, [klijent, radnica]); // Ovaj useEffect zavisi od klijent i radnica, pa će se pozvati svaki put kad se promene

    return (
        <Fragment>
            <div className="sviTermini">
                {termini.length == 0 && (
                    <div className="bez-termina">
                        <p>Nemate termina!</p>
                    </div>
                )

                }
                {user.role === "klijent" && (
                    termini.map((value, index) => (
                        <div key={index} className="termin">
                            <div className="termin-row">
                                <p className="key">Vreme:</p>
                                <p className="value">{value.vreme}</p>
                            </div>
                            <div className="termin-row">
                                <p className="key">Ukupna cena:</p>
                                <p className="value">{value.ukupnaCena}</p>
                            </div>
                            <div className="termin-row">
                                <p className="key">Trajanje:</p>
                                <p className="value">{value.trajanje} min</p>
                            </div>
                            <div className="termin-row">
                                <p className="key">Radnica:</p>
                                <p className="value">{value.radnica.user.name}</p>
                            </div>
                        </div>
                    ))
                )}

                {user.role === "radnik" && (
                    termini.map((value, index) => (
                        <div key={index} className="termin">
                            <div className="termin-row">
                                <p className="key">Vreme:</p>
                                <p className="value">{value.vreme}</p>
                            </div>
                            <div className="termin-row">
                                <p className="key">Ukupna cena:</p>
                                <p className="value">{value.ukupnaCena}</p>
                            </div>
                            <div className="termin-row">
                                <p className="key">Trajanje:</p>
                                <p className="value">{value.trajanje} min</p>
                            </div>
                            <div className="termin-row">
                                <p className="key">Klijent:</p>
                                <p className="value">{value.klijent.user.name}</p>
                            </div>
                            <div className="termin-row">
                                <p className="key">Kontakt:</p>
                                <p className="value">{value.klijent.telefon}</p>
                            </div>

                            {/* Dugme za brisanje */}
                            <div className="termin-row">
                                <button
                                    className="btn1"
                                    onClick={() => handleDelete(value.id)}
                                >
                                    Obriši termin
                                </button>
                            </div>
                        </div>
                    ))
                )}



            </div>
        </Fragment>


    );
}
