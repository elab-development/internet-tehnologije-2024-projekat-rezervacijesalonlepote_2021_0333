import { Fragment, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axiosClient from "../../axios/axios-client";

export default function DodajRadnicu() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Sva polja su obavezna!");
      return;
    }

    try {
      const response = await axiosClient.post("/radnice", {
        name,
        email,
        password,
       role: "radnik"
      });

      
      setSuccess(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.response.data.message);
      console.error(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <Container fluid={true} className="mainBanner pt-5">
        <h2 className="mt-5">Dodaj novu radnicu</h2>

        <Form onSubmit={handleSubmit} className="azurirajForma mt-3">
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

         
          <Form.Group controlId="name" className="mb-3 text-light">
            <Form.Label>Ime radnice</Form.Label>
            <Form.Control
              type="text"
              placeholder="Unesite ime radnice"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          
          <Form.Group controlId="email" className="mb-3 text-light">
            <Form.Label>Email radnice</Form.Label>
            <Form.Control
              type="email"
              placeholder="Unesite email radnice"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3 text-light">
            <Form.Label>Lozinka</Form.Label>
            <Form.Control
              type="password"
              placeholder="Unesite lozinku"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button className="w-100" variant="primary" type="submit">
            Dodaj radnicu
          </Button>
        </Form>
      </Container>
    </Fragment>
  );
}