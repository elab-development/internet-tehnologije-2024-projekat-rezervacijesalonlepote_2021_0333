import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import "../../assets/css/custom.css";

export default function NavBar() {
  const [navBarBackground, setNavBarBackground] = useState("navBackground");
  const [navBarItem, setNavBarItem] = useState("navItem");
  const [navBarTitle, setNavBarTitle] = useState("navTitle");
  const { token, user, setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  const onScroll = () => {
    if (window.scrollY > 50) {
      setNavBarBackground("navBackgroundScroll");
      setNavBarItem("navItemScroll");
      setNavBarTitle("navTitleScroll");
    } else {
      setNavBarBackground("navBackground");
      setNavBarItem("navItem");
      setNavBarTitle("navTitle");
    }
  };

  const handleLogout = () => {
    navigate("/auth/pocetna");
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [user]);

  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" className={`py-1 shadow ${navBarBackground}`}>
      <Container>
        <Navbar.Brand href="/" className={`fw-bold fs-4 ${navBarTitle}`}>
          NP Nails
          {
            token && (
              <>
                {<h1 className="navAuthName">Korisnik: {user.name}</h1>}
              </>
            )
          }
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto gap-3 align-items-center">
            {!token ? (
              <>

                <NavLink to="/auth/tipusluge" className={`${navBarItem} px-3 py-2 rounded`}>
                  Usluge
                </NavLink>
                <NavLink to="/auth/login" className={`${navBarItem} px-3 py-2 rounded`}>
                  Prijavi se
                </NavLink>
                <NavLink to="/auth/register" className={`${navBarItem} px-3 py-2 rounded`}>
                  Registruj se
                </NavLink>

              </>
            ) : (
              <>
                {(user.role === "radnik" || user.role == "klijent") && (
                  <>
                    <NavLink to={`/mojiPodaci`} className={`${navBarItem} px-3 py-2 rounded`}>
                      Moji podaci
                    </NavLink>
                    <NavLink to={`/mojiTermini`} className={`${navBarItem} px-3 py-2 rounded`}>
                      Moji termini
                    </NavLink>
                    <NavLink to={`/zakaziTermin`} className={`${navBarItem} px-3 py-2 rounded`}>
                      Zakazi termin
                    </NavLink>
                  </>
                )}
                {user.role === "admin" && (
                  <>
                    <NavLink to="/radnice" className={`${navBarItem} px-3 py-2 rounded`}>
                      Radnice
                    </NavLink>
                    <NavLink to="/uslugeadmin" className={`${navBarItem} px-3 py-2 rounded`}>
                      Tip usluga
                    </NavLink>
                  </>
                )}
                <NavLink onClick={handleLogout} className={`${navBarItem} px-3 py-2 rounded bg-danger text-white`}>
                  Odjavi se
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
