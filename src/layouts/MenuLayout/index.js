import { useState } from 'react'

// Componentes
import Menu from 'components/Menu'
import Header from 'components/Header'

import './styles.css'

const MenuLayout = ({ children }) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [showMenu, setShowMenu] = useState(false)

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <Header />
            <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
            <main className={`layout ${showMenu ? 'menu--show' : ''}`}>
                {children}
            </main>
        </>
    )
}

export default MenuLayout
