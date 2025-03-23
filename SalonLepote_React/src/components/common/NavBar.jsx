import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import "../../assets/css/custom.css";

export default function NavBar() {
  const [navBarBackground, setNavBarBackground] = useState("navBackground");
  const [navBarItem, setNavBarItem] = useState("navItem");
  const [navBarTitle, setNavBarTitle] = useState("navTitle");
  const { token, user, setUser, setToken } = useStateContext();

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
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [user]);

  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" className={`py-3 shadow ${navBarBackground}`}>
      <Container>
        <Navbar.Brand href="/" className={`fw-bold fs-4 ${navBarTitle}`}>
          NP Nails
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto gap-3 align-items-center">
            {!token ? (
              <>
             
                <NavLink to="/tipusluge" className={`${navBarItem} px-3 py-2 rounded`}>
                  Usluge
                </NavLink>
                <NavLink to="/login" className={`${navBarItem} px-3 py-2 rounded`}>
                  Prijavi se
                </NavLink>
                <NavLink to="/register" className={`${navBarItem} px-3 py-2 rounded`}>
                  Registruj se
                </NavLink>

              </>
            ) : (
              <>
              {<h1>Dobrodosli {user.name}</h1>}
                {user.role === "radnik"(
                  <>
                    <NavLink to={`/radnice/${user.id}`} className={`${navBarItem} px-3 py-2 rounded`}>
                      Moji podaci
                    </NavLink>
                    <NavLink to={`/termini`} className={`${navBarItem} px-3 py-2 rounded`}>
                      Termini
                    </NavLink>
                    <NavLink to={`/check-availability`} className={`${navBarItem} px-3 py-2 rounded`}>
                      Zakazi termin
                    </NavLink>
                  </>
                )}
                
                {user.role === "klijent" && (
                  <>
                    <NavLink to={`/klijent/${user.id}`} className={`${navBarItem} px-3 py-2 rounded`}>
                      Moji podaci
                    </NavLink>
                    <NavLink to={`/termini`} className={`${navBarItem} px-3 py-2 rounded`}>
                      Termini
                    </NavLink>
                    <NavLink to={`/check-availability`} className={`${navBarItem} px-3 py-2 rounded`}>
                      Zakazi termin
                    </NavLink>
                  </>
                )}
                {user.role === "admin" && (
                  <>
                    <NavLink to="/radnice" className={`${navBarItem} px-3 py-2 rounded`}>
                      Radnice
                    </NavLink>
                    <NavLink to="/tipUsluga" className={`${navBarItem} px-3 py-2 rounded`}>
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
