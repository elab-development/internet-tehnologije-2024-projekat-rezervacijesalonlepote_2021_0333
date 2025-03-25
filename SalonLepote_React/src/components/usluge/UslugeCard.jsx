import React from "react";
import { useStateContext } from "../../context/ContextProvider";


const UslugaCard = ({ usluga }) => {

  const { token } = useStateContext();

  return (
    <div className="usluga-card">
      <div className="usluga-naziv">{usluga.naziv}</div>
      <div className="usluga-opis">{usluga.opis}</div>
      <div className="usluga-trajanje">{usluga.trajanje} min</div>
      <div className="usluga-cena">{usluga.cena} din</div>
    </div>
  );
};

export default UslugaCard;
