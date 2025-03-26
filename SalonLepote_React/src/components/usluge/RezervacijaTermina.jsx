import React, { useEffect, useState } from "react";
import axiosClient from "../../axios/axios-client"; // Laravel API klijent
import { useStateContext } from "../../context/ContextProvider"; // Token kontekst
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import UslugaCard from "./UslugeCard";

export default function Rezervacija() {
  const [zauzetiTermini, setZauzetiTermini] = useState([]);
  const [dostupniTermini, setDostupniTermini] = useState([]);
  const [usluge, setUsluge] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedUsluge, setSelectedUsluge] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Za radnicu ili klijenta
  const [radnice, setRadnice] = useState([]);
  const [klijenti, setKlijenti] = useState([]);
  const { token, user } = useStateContext(); // user dolazi iz ContextProvider

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const radniceRes = await axiosClient.get("/radnice?include=user");
        setRadnice(radniceRes.data.data);

        const klijentiRes = await axiosClient.get("/klijenti?include=user");
        setKlijenti(klijentiRes.data.data);

        const terminiRes = await axiosClient.get(`/termini?vreme=${selectedDate}`);
        setZauzetiTermini(terminiRes.data.data);

        const uslugeRes = await axiosClient.get("/tipUsluga");
        setUsluge(uslugeRes.data.data);
      } catch (error) {
        console.error("Greška prilikom učitavanja podataka:", error);
      }
    };

    fetchData();
  }, [selectedDate]);

  useEffect(() => {
    generisiDostupneTermine();
  }, [zauzetiTermini, selectedDate, selectedUsluge]);

  const generisiDostupneTermine = () => {
    const termini = [];
    const startHour = 9;
    const endHour = 17;

    const ukupnoTrajanje = selectedUsluge.reduce((total, uslugaId) => {
      const usluga = usluge.find((u) => u.id === uslugaId);
      return total + usluga.trajanje;
    }, 0);

    for (let hour = startHour; hour < endHour; hour++) {
      const terminPocetak = new Date(`${selectedDate} ${hour.toString().padStart(2, "0")}:00:00`);
      const terminKraj = new Date(terminPocetak.getTime() + ukupnoTrajanje * 60000);

      const isZauzet = zauzetiTermini.some((t) => {
        const zauzetPocetak = new Date(t.vreme);
        const zauzetKraj = new Date(zauzetPocetak.getTime() + t.trajanje * 60000);
        return (terminPocetak < zauzetKraj && terminKraj > zauzetPocetak); // Proveravamo da li se preklapaju
      });

      // Samo slobodni termini koji mogu da prime sve usluge
      if (!isZauzet) {
        termini.push({ vreme: `${hour}:00`, zauzet: isZauzet });
      }
    }

    setDostupniTermini(termini);
  };

  const handleUslugaChange = (id) => {
    setSelectedUsluge((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((uslugaId) => uslugaId !== id) : [...prevSelected, id]
    );
  };

  // Odabir radnice ili klijenta na osnovu user.role
  const handleUserChange = (event) => {
    setSelectedUser(parseInt(event.target.value, 10)); // Pretvori string u broj sa bazom 10
  };

  const handleRezervisi = async (vreme) => {
    if (!token) {
      alert("Morate biti prijavljeni da biste rezervisali termin.");
      return;
    }

    if (selectedUsluge.length === 0) {
      alert("Morate odabrati bar jednu uslugu.");
      return;
    }

    if (!selectedUser) {
      alert("Morate odabrati radnicu ili klijenta.");
      return;
    }

    const apiEndpoint = user.role === "klijent" ? `klijenti/${user.id}?include=user` : `radnice/${user.id}?include=user`;
    const response = await axiosClient.get(apiEndpoint);
    const korisnikId = response.data.data.id;

    try {
      // Računanje ukupne cene i trajanja
      const ukupnaCena = selectedUsluge.reduce((total, uslugaId) => {
        const usluga = usluge.find((u) => u.id === uslugaId);
        return total + usluga.cena;
      }, 0);

      const ukupnoTrajanje = selectedUsluge.reduce((total, uslugaId) => {
        const usluga = usluge.find((u) => u.id === uslugaId);
        return total + usluga.trajanje;
      }, 0);

      // Kreiranje novog termina
      const response = await axiosClient.post("/termini", {
        vreme: selectedDate+" "+vreme+":00",
        ukupnaCena,
        trajanje: ukupnoTrajanje,
        radnica_id: user.role === "klijent" ? selectedUser : korisnikId, // Ako je klijent, izaberi radnicu, inače uzmi user id
        klijent_id: user.role === "radnica" ? selectedUser : korisnikId, // Ako je radnica, izaberi klijenta, inače uzmi user id
      });

      const terminId = response.data.data.id; // Dobijamo termin_id iz odgovora

      // Upisivanje usluga u tabelu usluga
      await Promise.all(
        selectedUsluge.map((uslugaId, index) => {
          const usluga = usluge.find((u) => u.id === uslugaId);
          return axiosClient.post("/usluge", {
            redniBroj: index + 1, // Inkrementujemo redni broj
            termin_id: terminId,
            tip_usluge_id: uslugaId,
          });
        })
      );

      alert("Uspešno ste rezervisali termin!");
    } catch (error) {
      console.error("Greška pri rezervaciji:", error);
      alert("Došlo je do greške pri rezervaciji.");
    }
  };

  return (
    <div className="rezervacija-container">
      <h1 className="title">Rezervacija termina</h1>

      <div className="row">
        {/* Leva strana za usluge */}
        <div className="col-lg-6 col-md-6 col-sm-12">
          {token && (
            <div className="usluge-list">
              {usluge.map((usluga) => (
                <div key={usluga.id} className="d-flex align-items-center mb-3">
                  <input
                    type="checkbox"
                    checked={selectedUsluge.includes(usluga.id)}
                    onChange={() => handleUslugaChange(usluga.id)}
                    className="me-2"
                  />
                  <UslugaCard usluga={usluga} />
                </div>
              ))}
            </div>
          )}

          {/* Select za radnice ili klijente */}
          {user.role === "klijent" && (
            <div className="form-group mt-3">
              <label>Izaberite radnicu:</label>
              <select
                value={selectedUser}
                onChange={handleUserChange}
                className="form-control"
              >
                <option value="">Izaberite radnicu</option>
                {radnice && radnice.length > 0 ? (
                  radnice.map((radnica) => (
                    <option key={radnica.id} value={radnica.id}>
                      {radnica.user.name}
                    </option>
                  ))
                ) : (
                  <option value="">Nema dostupnih radnica</option>
                )}
              </select>
            </div>
          )}

          {user.role === "radnica" && (
            <div className="form-group mt-3">
              <label>Izaberite klijenta:</label>
              <select
                value={selectedUser}
                onChange={handleUserChange}
                className="form-control"
              >
                <option value="">Izaberite klijenta</option>
                {klijenti && klijenti.length > 0 ? (
                  klijenti.map((klijent) => (
                    <option key={klijent.id} value={klijent.id}>
                      {klijent.user.name}
                    </option>
                  ))
                ) : (
                  <option value="">Nema dostupnih klijenata</option>
                )}
              </select>
            </div>
          )}
        </div>

        {/* Desna strana za datum i termine */}
        <div className="col-lg-6 col-md-6 col-sm-12">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="form-control"
            min={new Date().toISOString().split("T")[0]} // Onemogućava odabir prošlih datuma
          />

          <div className="termini-list mt-4">
            {dostupniTermini.map((termin, index) => (
              <div key={index} className={`termin-item ${termin.zauzet ? "zauzet" : "slobodan"} mb-3`}>
                <span>{termin.vreme}</span>
                {!termin.zauzet && (
                  <Button variant="success" onClick={() => handleRezervisi(termin.vreme)}>
                    Rezerviši
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
