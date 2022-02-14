import { useEffect, useState, useContext } from 'react'

// Estado global
import AuthContext from 'context/AuthContext'

// Componentes
import MenuLink from 'components/MenuLink/'

// Treeview
import {
    UncontrolledTreeEnvironment,
    Tree,
    StaticTreeDataProvider,
} from 'react-complex-tree'

import './styles.css'

const ExpedientesJudicialesMenu = ({ showMenu, setShowMenu }) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const { listaDerechos } = useContext(AuthContext)
    const [treeView, setTreeView] = useState(null)

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleClickMenu = () => {
        setShowMenu(!showMenu)
    }

    const readTemplate = (template, data = { items: {} }) => {
        for (const [key, value] of Object.entries(template)) {
            data.items[key] = {
                index: key,
                canMove: false,
                hasChildren: value !== null,
                children: value !== null ? Object.keys(value) : undefined,
                data: key,
                canRename: false,
                onFocusItem: null,
            }

            console.log(key, value)

            if (value !== null) {
                readTemplate(value, data)
            }
        }
        return data
    }

    const cargaMenu = () => {
        const longTreeTemplate = {
            root: {
                Fruit: {
                    Apple: null,
                    Orange: null,
                    Lemon: null,
                    Berries: {
                        Strawberry: null,
                        Blueberry: null,
                    },
                    Banana: null,
                },
                Meals: {
                    America: {
                        SmashBurger: null,
                        Chowder: null,
                        Ravioli: null,
                        MacAndCheese: null,
                        Brownies: null,
                    },
                    Europe: {
                        Risotto: null,
                        Spaghetti: null,
                        Pizza: null,
                        Weisswurst: null,
                        Spargel: null,
                    },
                    Asia: {
                        Curry: null,
                        PadThai: null,
                        Jiaozi: null,
                        Sushi: null,
                    },
                    Australia: {
                        PotatoWedges: null,
                        PokeBowl: null,
                        LemonCurd: null,
                        KumaraFries: null,
                    },
                },
                Desserts: {
                    Cookies: null,
                    IceCream: null,
                },
                Drinks: {
                    PinaColada: null,
                    Cola: null,
                    Juice: null,
                },
            },
        }

        const myTemplate = {}
        myTemplate.root = {}

        const menus = listaDerechos.filter(menu => menu.CODSUB === 0)
        const submenus = listaDerechos.filter(
            submenu => submenu.CODSUB !== 0 && submenu.APLWEB === ''
        )
        const aplicaciones = listaDerechos.filter(
            aplicacion => aplicacion.APLWEB !== ''
        )

        menus.forEach(menu => {
            myTemplate.root[menu.NOMBRE] = {}
            submenus.forEach(submenu => {
                if (menu.CODMEN === submenu.CODMEN) {
                    myTemplate.root[menu.NOMBRE][submenu.NOMBRE] = {}
                    aplicaciones.forEach(aplicacion => {
                        if (
                            aplicacion.CODMEN === menu.CODMEN &&
                            aplicacion.CODSUB === submenu.CODSUB
                        ) {
                            myTemplate.root[menu.NOMBRE][submenu.NOMBRE][
                                aplicacion.NOMBRE
                            ] = null
                        }
                    })
                }
            })
        })

        setTreeView(readTemplate(myTemplate))

        // listaDerechos.forEach(derecho => {
        //     if (derecho.CODSUB === 0) {
        //         myTemplate.root[derecho.NOMBRE] = ''
        //     }
        // })

        // listaDerechos.forEach(derecho => {
        //     if (derecho.CODSUB !== 0 && derecho.APLWEB === '') {
        //         myTemplate.root[derecho.NOMBRE] = ''
        //     }
        // })

        // console.log(myTemplate)
        //longTree = readTemplate(myTemplate)

        //console.log('crea menu', longTree)
    }

    // useEffect(() => {
    //     if(!treeView || Object.keys(treeView))
    // })

    useEffect(() => {
        if (!listaDerechos || !listaDerechos.length) return

        cargaMenu()
    }, [listaDerechos])

    if (
        !treeView ||
        !Object.keys(treeView).length ||
        !listaDerechos ||
        !listaDerechos.length
    ) {
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
            <UncontrolledTreeEnvironment
                dataProvider={
                    new StaticTreeDataProvider(
                        treeView.items,
                        (item, data) => ({ ...item, data })
                    )
                }
                getItemTitle={item => item.data}
                defaultInteractionMode={{
                    mode: 'custom',
                    extends: 'click-item-to-expand',
                    createInteractiveElementProps: (
                        item,
                        treeId,
                        actions,
                        renderFlags
                    ) => ({
                        onClick: () => {
                            console.log(item)
                            actions.focusItem()
                        },
                        onFocus: () => {
                            actions.focusItem()
                        },
                    }),
                }}
                viewState={{}}
            >
                <Tree
                    treeId='tree-1'
                    rootItem='root'
                    treeLabel='Tree Example'
                />
            </UncontrolledTreeEnvironment>
        </nav>
    )
}

export default ExpedientesJudicialesMenu
