import { Container, Button, Form } from "react-bootstrap";
import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axios/axios-client";

export default function MojiPodaciBanner() {
    const { id } = useParams();
    const { user } = useStateContext();
    const [korisnik, setKorisnik] = useState({});
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {

                const apiEndpoint = user.role === "klijent" ? `klijenti/${user.id}?include=user` : `radnice/${user.id}?include=user`;
                const response = await axiosClient.get(apiEndpoint);
                const userData = response.data.data;
                setKorisnik({
                    name: userData.user.name,
                    email: userData.user.email,
                    telefon: userData.telefon || "",
                });
            } catch (error) {
                console.error("Greška prilikom učitavanja podataka", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (key, value) => {
        setKorisnik((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const validateData = () => {
        let newErrors = {};
        if (!korisnik.name || korisnik.name.length > 100) {
            newErrors.name = "Ime ne sme biti prazno i mora imati manje od 100 karaktera.";
        }
        if (korisnik.telefon && !/^\+?\d{7,15}$/.test(korisnik.telefon)) {
            newErrors.telefon = "Unesite validan broj telefona (min 7, max 15 cifara).";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateData()) return;
    
        try {
            const updateEndpoint = user.role === "klijent" ? `klijenti/${user.id}` : `radnice/${user.id}`;
    
            const podaciZaSlanje = user.role === "radnik" 
                ? { name: korisnik.name, email: korisnik.email } 
                : korisnik; 
    
            await axiosClient.put(`/${updateEndpoint}`, podaciZaSlanje);
    
            alert("Podaci su uspešno izmenjeni!");
            setIsEditing(false);
        } catch (error) {
            console.error("Greška prilikom čuvanja podataka:", error);
            alert("Došlo je do greške prilikom čuvanja podataka.");
        }
    };
    

    return (
        <Fragment>

            <Container fluid className="mainBanner pt-5">
                <div className="d-flex flex-column p-4 azurirajForma">
                    <h1 className="text-center mb-4 title">Lični podaci</h1>
                    {loading ? (
                        <p>Učitavanje podataka...</p>
                    ) : (
                        <>
                            {/* Ime */}
                            <div className="mb-3">
                                <Form.Group className="d-flex align-items-center gap-4">
                                    <Form.Label className="title w-50">Ime</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={korisnik.name}
                                        onChange={(e) => handleInputChange("name", e.target.value)}
                                        readOnly={!isEditing}
                                        isInvalid={!!errors.name}
                                        className="text w-50"
                                        style={{ backgroundColor: !isEditing ? "transparent" : "white", border: !isEditing ? "none" : "1px solid #ced4da", color: !isEditing ? "white" : "black" }}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                </Form.Group>
                            </div>

                            {/* Email */}
                            <div className="mb-3">
                                <Form.Group className="d-flex align-items-center gap-4">
                                    <Form.Label className="title w-50">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={korisnik.email}
                                        readOnly
                                        className="text w-50 nonEditableInput"
                                        style={{ backgroundColor: "transparent", border: "none", color: "white" }}
                                    />
                                </Form.Group>
                            </div>

                            {user.role == "klijent" && (
                                <div className="mb-3">
                                    <Form.Group className="d-flex align-items-center gap-4">
                                        <Form.Label className="title w-50">Telefon</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={korisnik.telefon}
                                            onChange={(e) => handleInputChange("telefon", e.target.value)}
                                            readOnly={!isEditing}
                                            isInvalid={!!errors.telefon}
                                            className="text w-50"
                                            style={{ backgroundColor: !isEditing ? "transparent" : "white", border: !isEditing ? "none" : "1px solid #ced4da", color: !isEditing ? "white" : "black" }}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.telefon}</Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                            )}

                        </>
                    )}

                    {isEditing ? (
                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn1" onClick={handleSubmit} style={{ borderRadius: "30px" }}>
                                Sačuvaj izmene
                            </button>
                            <button className="btn1" onClick={() => setIsEditing(false)} style={{ borderRadius: "30px" }}>
                                Odustani
                            </button>
                        </div>
                    ) : (
                        <button className="btn1" onClick={() => setIsEditing(true)} style={{ borderRadius: "30px" }}>
                            Omogući izmenu
                        </button>
                    )}
                </div>
            </Container>
        </Fragment>
    );
}
