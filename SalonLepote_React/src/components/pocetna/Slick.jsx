import manikirImg from "../../assets/images/Manikir.jpg";
import pedikirImg from "../../assets/images/Pedikir.jpg";
import medPedikirImg from "../../assets/images/MedPedikir.jpg";
import sl1 from "../../assets/images/sl1.jpeg";
import sl2 from "../../assets/images/sl2.jpeg";
import sl3 from "../../assets/images/sl3.jpeg";
import sl4 from "../../assets/images/sl4.jpeg";
import sl5 from "../../assets/images/sl5.jpeg";
import sl6 from "../../assets/images/sl6.jpeg";
import sl7 from "../../assets/images/sl7.jpeg";
import sl8 from "../../assets/images/sl8.jpeg";
import sl9 from "../../assets/images/sl9.jpeg";
import sl14 from "../../assets/images/sl14.jpeg";




export default function ImageCarousel() {
    
    return (
      <>
        <div className="wrapper">
          <div className="carousel">
            <img src={sl1} alt="Slika 17" draggable="false" />
            <img src={sl2} alt="Slika 17" draggable="false" />
            <img src={sl3} alt="Slika 17" draggable="false" />
            <img src={sl4} alt="Slika 17" draggable="false" />
            <img src={sl5} alt="Slika 17" draggable="false" />
            <img src={sl6} alt="Slika 17" draggable="false" />
            <img src={sl7} alt="Slika 17" draggable="false" />
            <img src={sl8} alt="Slika 17" draggable="false" />
            <img src={sl9} alt="Slika 17" draggable="false" />
            <img src={sl14} alt="Slika 17" draggable="false" />
          </div>
        </div>
      </>
    );
  }
  