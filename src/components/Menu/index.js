import { useEffect, useState, useContext } from 'react'

// Estado global
import AuthContext from 'context/AuthContext'

// Dependencias
import TreeView from '@mui/lab/TreeView'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TreeItem from '@mui/lab/TreeItem'
import { useHistory } from 'react-router-dom'

// Componentes

import './styles.css'

const ExpedientesJudicialesMenu = ({ showMenu, setShowMenu }) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const { listaDerechos } = useContext(AuthContext)
    const [menus, setMenus] = useState(null)
    const [submenus, setSubmenus] = useState(null)
    const [aplicaciones, setAplicaciones] = useState(null)
    const history = useHistory()

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleClickMenu = () => {
        setShowMenu(!showMenu)
    }

    const cargaMenu = () => {
        setMenus(listaDerechos.filter(menu => menu.CODSUB === 0))
        setSubmenus(
            listaDerechos.filter(
                submenu => submenu.CODSUB !== 0 && submenu.APLWEB === ''
            )
        )
        setAplicaciones(
            listaDerechos.filter(aplicacion => aplicacion.APLWEB !== '')
        )
    }

    useEffect(() => {
        if (!listaDerechos || !listaDerechos.length) return

        cargaMenu()
    }, [listaDerechos])

    if (!listaDerechos || !listaDerechos.length) {
        return (
            <nav className={`nav ${showMenu ? 'nav--show' : ''}`}>
                <div className='toggle-menu' onClick={handleClickMenu}>
                    <i className='fas fa-bars toggle-menu__icon'></i>
                </div>
            </nav>
        )
    }

    const abreMenu = rutaAplicacion => {
        history.push(rutaAplicacion)
    }

    /* ------------------------------------------------------------------- */
    /* --------------------------- RENDERIZADO --------------------------- */
    /* ------------------------------------------------------------------- */
    return (
        <nav className={`nav ${showMenu ? 'nav--show' : ''}`}>
            <div className='toggle-menu' onClick={handleClickMenu}>
                <i className='fas fa-bars toggle-menu__icon'></i>
            </div>
            <TreeView
                aria-label='file system navigator'
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{
                    height: 240,
                    flexGrow: 1,
                    maxWidth: 400,
                    overflowY: 'auto',
                }}
            >
                {menus &&
                    menus.map(menuItem => {
                        return (
                            <TreeItem
                                key={menuItem.NUMREG}
                                nodeId={menuItem.NUMREG.toString()}
                                label={menuItem.NOMBRE}
                            >
                                {submenus &&
                                    submenus.map(submenuItem => {
                                        return (
                                            submenuItem.CODMEN ===
                                                menuItem.CODMEN && (
                                                <TreeItem
                                                    nodeId={submenuItem.NUMREG.toString()}
                                                    label={submenuItem.NOMBRE}
                                                    key={submenuItem.NUMREG}
                                                >
                                                    {aplicaciones &&
                                                        aplicaciones.map(
                                                            aplicacionItem => {
                                                                return (
                                                                    aplicacionItem.CODMEN ===
                                                                        submenuItem.CODMEN &&
                                                                    aplicacionItem.CODSUB ===
                                                                        submenuItem.CODSUB && (
                                                                        <TreeItem
                                                                            nodeId={aplicacionItem.NUMREG.toString()}
                                                                            label={
                                                                                aplicacionItem.NOMBRE
                                                                            }
                                                                            key={
                                                                                aplicacionItem.NUMREG
                                                                            }
                                                                            onClick={() =>
                                                                                abreMenu(
                                                                                    aplicacionItem.APLWEB
                                                                                )
                                                                            }
                                                                        />
                                                                    )
                                                                )
                                                            }
                                                        )}
                                                </TreeItem>
                                            )
                                        )
                                    })}
                            </TreeItem>
                        )
                    })}
                {/* <TreeItem nodeId='1' label='Applications'>
                    <TreeItem nodeId='2' label='Calendar' />
                </TreeItem>
                <TreeItem nodeId='5' label='Documents'>
                    <TreeItem nodeId='10' label='OSS' />
                    <TreeItem nodeId='6' label='MUI'>
                        <TreeItem nodeId='8' label='index.js' />
                    </TreeItem>
                </TreeItem> */}
            </TreeView>
        </nav>
    )
}

export default ExpedientesJudicialesMenu
