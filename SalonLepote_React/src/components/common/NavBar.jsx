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
                <NavLink to="/login" className={`${navBarItem} px-3 py-2 rounded`}>
                  Prijavi se
                </NavLink>
                <NavLink to="/register" className={`${navBarItem} px-3 py-2 rounded`}>
                  Registruj se
                </NavLink>
              </>
            ) : (
              <>
                {user.role === "radnik" && (
                  <>
                    <NavLink to={`/pacijent/${user.id}`} className={`${navBarItem} px-3 py-2 rounded`}>
                      Moji podaci
                    </NavLink>
                    <NavLink to={`/karton/${user.id}`} className={`${navBarItem} px-3 py-2 rounded`}>
                      Karton
                    </NavLink>
                  </>
                )}
                {user.role === "klijent" && (
                  <>
                    <NavLink to="/pacijenti" className={`${navBarItem} px-3 py-2 rounded`}>
                      Pacijenti
                    </NavLink>
                    <NavLink to="/kreiraj-karton" className={`${navBarItem} px-3 py-2 rounded`}>
                      Kreiraj karton
                    </NavLink>
                  </>
                )}
                {user.role === "admin" && (
                  <>
                    <NavLink to="/doktori" className={`${navBarItem} px-3 py-2 rounded`}>
                      Doktori
                    </NavLink>
                    <NavLink to="/sestre" className={`${navBarItem} px-3 py-2 rounded`}>
                      Sestre
                    </NavLink>
                    <NavLink to="/ustanove" className={`${navBarItem} px-3 py-2 rounded`}>
                      Ustanove
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
