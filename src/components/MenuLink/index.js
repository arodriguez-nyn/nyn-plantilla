// Dependencias
import { NavLink } from 'react-router-dom'

// Componentes
import iconoJuridica from 'assets/img/juridica.png'

const MenuLink = ({ registro }) => {
    let icono
    switch (registro.CODMEN) {
        case 10:
            icono = iconoJuridica
            break
        default:
            break
    }
    return (
        <li name='shopping-lists' className='main-menu__item'>
            {registro.CODSUB === 0 && (
                <NavLink className='nav-link' to={registro.APLWEB}>
                    <img
                        src={icono}
                        alt={registro.NOMBRE}
                        className='main-menu__icon'
                    />
                    <span>{registro.NOMBRE}</span>
                </NavLink>
            )}
        </li>
    )
}

export default MenuLink
