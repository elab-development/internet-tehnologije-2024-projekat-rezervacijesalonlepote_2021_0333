/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios/axios-client";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Registracija() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [password, setPassword] = useState("");
    const [telefon, setTelefon] = useState("");
    const [error, setError] = useState("");
    const navigate=useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const telefonRegex = /^\+381 \d{9}$/;

        if (
            !email ||
            !password ||
            !name ||
            !passwordConfirm ||
            !telefon
        ) {
            setError("Molimo popunite sva polja");
            return;
        }

        if (!emailRegex.test(email)) {
            setError("Neispravan email format");
            return;
        }

        if (password !== passwordConfirm || password.length < 8) {
            console.log(password);
            console.log(passwordConfirm);
            setError("Lozinka mora imati najmanje 8 karaktera");
            return;
        }


        if (!telefonRegex.test(telefon)) {
            setError("Telefon mora biti u formatu +381 xxxxxxxxx");
            return;
        }

        try {
            const response = await axiosClient.post("/register", {
                name,
                email,
                password,
                telefon
            });
            navigate("/auth/login"); on
        } catch (err) {
            console.log(err);
            setError("Neuspešna registracija, proverite podatke");
        }
    };

    return (
        <Fragment>
            <Container fluid={true} className="guestBackground">
                <form className="loginForm" onSubmit={handleSubmit}>
                    <div className="formGrid">
                        <div className="formColumn">
                            <label htmlFor="imePrezime">Ime i prezime</label>
                            <input
                                type="text"
                                id="imePrezime"
                                name="imePrezime"
                                placeholder="Ime i prezime"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label htmlFor="lozinka">Lozinka</label>
                            <input
                                type="password"
                                id="lozinka"
                                name="lozinka"
                                placeholder="Lozinka"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <label htmlFor="potvrdLozinke">Potvrda lozinke</label>
                            <input
                                type="password"
                                id="potvrdLozinke"
                                name="potvrdLozinke"
                                placeholder="Potvrda lozinke"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                            />

                            <label htmlFor="telefon">Broj telefona</label>
                            <input
                                type="text"
                                id="telefon"
                                name="telefon"
                                placeholder="+381 xx xxx xxxx"
                                value={telefon}
                                onChange={(e) => setTelefon(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="errorBox">{error}</div>

                    <button className="formButton" type="submit">Registracija</button>
                    <div>
                        <p className="pt-2">
                            Imaš nalog? <Link className="link1" to="/auth/login">Prijavi se</Link>
                        </p>
                            <p className="pt-2">Nazad na početnu? <Link to="/auth/pocetna" className="link1">Odustani</Link></p>

                    </div>
                </form>
            </Container>
        </Fragment>

    );
}