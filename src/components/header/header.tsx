import styles from './header.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import BurgerMenu from '../burgerMenu/burgerMenu';


export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(innerWidth <= 745);

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
                                {isMobile && <BurgerMenu />}
                            </div>
                        </> :
                        <>
                            <div className={styles.loginPanel}>
                                <Link to={"/register"} className={`${styles.authLink} ${styles.registerLink}`}>Зарегистрироваться</Link>
                                <div className={styles.divider}></div>
                                <Link to={"/login"} className={styles.authLink}>Войти</Link>
                            </div>
                            {isMobile && <BurgerMenu />}
                        </>}
                </div>
            </div>
        </header>
    )
}
