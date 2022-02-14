import { useContext } from 'react'

// Estado global
import AuthContext from 'context/AuthContext'

// Componentes
import MenuLink from 'components/MenuLink/'

import './styles.css'

const ExpedientesJudicialesMenu = ({ showMenu, setShowMenu }) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const { listaDerechos } = useContext(AuthContext)

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleClickMenu = () => {
        setShowMenu(!showMenu)
    }

    if (!listaDerechos || listaDerechos.length === 0) {
        return (
            <nav className={`nav ${showMenu ? 'nav--show' : ''}`}>
                <div className='toggle-menu' onClick={handleClickMenu}>
                    <i className='fas fa-bars toggle-menu__icon'></i>
                </div>
            </nav>
        )
    }

    /* ------------------------------------------------------------------- */
    /* --------------------------- RENDERIZADO --------------------------- */
    /* ------------------------------------------------------------------- */
    return (
        <nav className={`nav ${showMenu ? 'nav--show' : ''}`}>
            <div className='toggle-menu' onClick={handleClickMenu}>
                <i className='fas fa-bars toggle-menu__icon'></i>
            </div>
            <ul className={`main-menu ${showMenu ? 'main-menu--show' : ''}`}>
                {listaDerechos.map(registro => (
                    <MenuLink registro={registro} key={registro.NUMREG} />
                ))}
                {/* <li name='shopping-lists' className='main-menu__item'>
                    <NavLink
                        className='nav-link'
                        to='/expeju/lista'
                        activeClassName='active'
                    >
                        <i
                            className='far fa-list-alt main-menu__icon'
                            title='Lista de expedientes'
                        ></i>
                        <span>Lista</span>
                    </NavLink>
                </li>
                <li className='main-menu__item'>
                    <NavLink
                        className='nav-link'
                        to='/exjute'
                        exact
                        activeClassName='active'
                    >
                        <i
                            className='far fa-comment-dots main-menu__icon'
                            title='Temas'
                        ></i>
                        <span className='main-menu__label' title='Formulario'>
                            Temas
                        </span>
                    </NavLink>
                </li>
                <li className='main-menu__item'>
                    <NavLink
                        className='nav-link'
                        to='/exjuab'
                        exact
                        activeClassName='active'
                    >
                        <i
                            className='fas fa-gavel main-menu__icon'
                            title='Abogados'
                        ></i>
                        <span className='main-menu__label' title='Formulario'>
                            Abogados
                        </span>
                    </NavLink>
                </li> */}
            </ul>
        </nav>
    )
}

export default ExpedientesJudicialesMenu
