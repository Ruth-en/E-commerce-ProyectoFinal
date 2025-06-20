import styles from "./Header.module.css";
import LoginRegister from "../LoginRegister/LoginRegister";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import carrito from "../../assets/svg/shop.svg";
import { FaRegUser, FaUserCheck } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import logo from "../../assets/images/myb.png";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const [openFormUser, setOpenFormUser] = useState(false); // Estado para abrir el modal
  const [menuOpen, setMenuOpen] = useState(false); // Estado para la vista de la hamburgesa
  const { userActive } = useAuth();
  const navigate = useNavigate();

  return (
    <header className={styles.containerHeader}>
      <img src={logo} className={styles.headerLogo} />
      <nav className={styles.headerOptions}>
        <div
          className={`${styles.headerNavSearch} ${
            menuOpen ? styles.showMenu : ""
          }`}
        >
          <Link to="/">Inicio</Link>
          <Link to="/catalogo/mujer">Mujer</Link>
          <Link to="/catalogo/hombre">Hombre</Link>
          {userActive?.rol === "ADMIN" && (
            <Link to="/administrador/usuarios">Administrador</Link>
          )}
        </div>
        <div className={styles.headerBuyLogin}>
          <Link to="/carrito">
            <img src={carrito} alt="Carrito de compras" />
          </Link>
          {userActive ? (
            <button
              className={styles.headerUser}
              onClick={() => navigate("/perfil")}
            >
              <span>
                <FaUserCheck size={30} />
              </span>
              {userActive.nombre}
            </button>
          ) : (
            <button onClick={() => setOpenFormUser(true)}>
              <FaRegUser size={25} />
            </button>
          )}
          <button
            className={styles.burgerButton}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <IoMenu />
          </button>
        </div>
      </nav>
      {openFormUser && <LoginRegister onClose={() => setOpenFormUser(false)} />}
    </header>
  );
};

export default Header;
