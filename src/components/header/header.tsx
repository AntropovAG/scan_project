import styles from './header.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'
import './burgerMenu.css';

interface BurgerMenu {
    isOpen: boolean;
}

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(innerWidth <= 745);

    const handleBurgerMenu = (state:BurgerMenu) => {
        setIsBurgerMenuOpen(state.isOpen);
    }

    const closeBurgerMenu = () => {
        setIsBurgerMenuOpen(false);
    }

    const handleLogin = () => {
        setIsLoggedIn(true);
        setIsBurgerMenuOpen(false);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
    }

    const handleMobileSize = () => {
        setIsMobile(innerWidth <= 745);
    
    }

    useEffect(() => {
        handleMobileSize();
    
        window.addEventListener('resize', handleMobileSize);
    
        return () => {
            window.removeEventListener('resize', handleMobileSize);
        }
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.container}>

                <div className={styles.imgContainer}>
                    <img className={styles.image} src="./logo.svg" alt="logo" />
                </div>

                <nav className={styles.navigation}>
                    <ul className={styles.navList}>
                        <li><Link className={styles.link} to={"/"}>Главная</Link></li>
                        <li><Link className={styles.link} to={"/tariffs"}>Тарифы</Link></li>
                        <li><Link className={styles.link} to={"/faq"}>FAQ</Link></li>
                    </ul>
                </nav>

                <div className={styles.panelContainer}>
                    {isLoggedIn ?
                        <>
                            <div className={styles.userInfoContainer}>
                                <div className={styles.infoPanel}>
                                    {/* <div className={styles.info}> */}
                                        <p className={`${styles.text} ${styles.usedText}`}>Использовано компаний</p>
                                        <p className={`${styles.text} ${styles.limitText}`}>Лимит по компаниям</p>
                                    {/* </div> */}
                                    {/* <div className={styles.info}> */}
                                        <p className={`${styles.numbers} ${styles.used}`}>34</p>
                                        <p className={`${styles.numbers} ${styles.limit}`}>100</p>
                                    {/* </div> */}
                                </div>
                                <div className={styles.logoutGroup}>
                                    <div className={styles.wrapper}>
                                        <p className={styles.username}>Антон А.</p>
                                        <button className={styles.logoutButton} onClick={handleLogout}>Выйти</button>
                                    </div>
                                    <img className={styles.userImg} src="./photo_sample.svg" alt="user image" />
                                </div>
                                {isMobile && 
                                <Menu right width={'100%'} isOpen={isBurgerMenuOpen} onStateChange={handleBurgerMenu}>
                                    <div className={'burgerMenuLogo'}>
                                        <img className={'image'} src="./logo_burger_menu.svg" alt="logo" />
                                    </div>
                                    <ul className={'burgerMenuList'} >
                                        <li className={'burgerMenuListItem'} onClick={closeBurgerMenu}><Link className={'burgerMenuLink'} to={"/"}>Главная</Link></li>
                                        <li className={'burgerMenuListItem'} onClick={closeBurgerMenu}><Link className={'burgerMenuLink'} to={"/tariffs"}>Тарифы</Link></li>
                                        <li className={'burgerMenuListItem'} onClick={closeBurgerMenu}><Link className={'burgerMenuLink'} to={"/faq"}>FAQ</Link></li>
                                    </ul>
                                    <div className={`burgerMenuButtons`}>
                                        <Link to={"/register"} className={'burgerMenuRegisterLink'} onClick={closeBurgerMenu}>Зарегистрироваться</Link>
                                        <Link to={"/login"} className={'burgerMenuLoginLink'} onClick={handleLogin}>Войти</Link>
                                    </div>
                                </Menu>}
                            </div>
                        </> :
                        <>
                            <div className={styles.loginPanel}>
                                <Link to={"/register"} className={`${styles.authLink} ${styles.registerLink}`}>Зарегистрироваться</Link>
                                <div className={styles.divider}></div>
                                <Link to={"/login"} className={styles.authLink} onClick={handleLogin}>Войти</Link>
                            </div>
                            {isMobile &&
                            <Menu right width={'100%'} isOpen={isBurgerMenuOpen} onStateChange={handleBurgerMenu}>
                                <div className={'burgerMenuLogo'}>
                                    <img className={'image'} src="./logo_burger_menu.svg" alt="logo" />
                                </div>
                                <ul className={'burgerMenuList'}>
                                    <li className={'burgerMenuListItem'} onClick={closeBurgerMenu}><Link className={'burgerMenuLink'} to={"/"}>Главная</Link></li>
                                    <li className={'burgerMenuListItem'} onClick={closeBurgerMenu}><Link className={'burgerMenuLink'} to={"/tariffs"}>Тарифы</Link></li>
                                    <li className={'burgerMenuListItem'} onClick={closeBurgerMenu}><Link className={'burgerMenuLink'} to={"/faq"}>FAQ</Link></li>
                                </ul>
                                <div className={`burgerMenuButtons`}>
                                    <Link to={"/register"} className={'burgerMenuRegisterLink'} onClick={closeBurgerMenu}>Зарегистрироваться</Link>
                                    <Link to={"/login"} className={'burgerMenuLoginLink'} onClick={handleLogin}>Войти</Link>
                                </div>
                            </Menu>}
                        </>}
                </div>
            </div>
        </header>
    )
}
