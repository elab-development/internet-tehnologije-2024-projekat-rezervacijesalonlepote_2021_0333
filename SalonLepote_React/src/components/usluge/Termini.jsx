import { Fragment, useEffect, useState } from "react"
import axiosClient from "../../axios/axios-client";
import { useStateContext } from "../../context/ContextProvider";


export default function Termini() {

    const [termini, setTermini] = useState([]);
    const { user } = useStateContext();

    const [radnica, setRadnica] = useState();
    const [klijent, setKlijent] = useState();

    const apiEndpoint = `/termini?include=${user.role}`;
    const axiosEndpoint = user.role == "klijent" ? `/klijentForUser/${user.id}` : `/radnicaForUser/${user.id}`;
    console.log(axiosEndpoint);

    useEffect(() => {
        const fetchTermini = async () => {
            const response = await axiosClient.get(apiEndpoint);
            setTermini(response.data.data);
        }
        const fetchKorisnik = async () => {
            const response = await axiosClient.get(axiosEndpoint);
            user.role == "klijent" ? setKlijent(response): setRadnica(response);
            console.log(klijent);
            console.log(radnica);
        } 
        fetchTermini();
        fetchKorisnik();
    }, [])

    return (
        <Fragment>
            {user.role === "klijent" && (
                termini
                    .filter((value) => value.klijent_id === user.id) // Filtrira termine za klijenta
                    .map((value, index) => (
                        <div key={index}>
                            <p>Datum: {value.datum}</p>a
                            <p>Vreme: {value.vreme}</p>
                            <p>Trajanje: {value.trajanje} min</p>
                        </div>
                    ))
            )}

            {user.role === "radnik" && (
                termini
                    .filter((value) => value.radnik_id === user.id) // Filtrira termine za radnika
                    .map((value, index) => (
                        <div key={index}>
                            <p>Datum: {value.datum}</p>
                            <p>Vreme: {value.vreme}</p>
                            <p>Trajanje: {value.trajanje} min</p>
                            <p>Klijent ID: {value.klijent_id}</p>
                        </div>
                    ))
            )}
        </Fragment>

    )

}