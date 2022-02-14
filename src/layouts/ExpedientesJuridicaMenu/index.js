// Dependencias
import { NavLink } from 'react-router-dom'

import './styles.css'

const ExpedientesJuridicaMenu = () => {
    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <nav className='expeju-nav'>
            <ul className='expeju-menu'>
                <li className='expeju-menu__item'>
                    <NavLink className='nav-link-expeju' to='/expeju'>
                        <i
                            className='far fa-list-alt expeju-menu__icon'
                            title='Lista de expedientes'
                        ></i>
                    </NavLink>
                </li>
                <li className='expeju-menu__item'>
                    <NavLink className='nav-link-expeju' to='/exjuab'>
                        <i
                            className='fas fa-gavel expeju-menu__icon'
                            title='Abogados'
                        ></i>
                    </NavLink>
                </li>
                <li className='expeju-menu__item'>
                    <NavLink className='nav-link-expeju' to='/exjute'>
                        <i
                            className='far fa-comment-dots expeju-menu__icon'
                            title='Temas'
                        ></i>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default ExpedientesJuridicaMenu
