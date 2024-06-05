import styles from './header.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
    }

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
                    <div></div>
                    {isLoggedIn ?
                        <>
                            <div className={styles.userInfoContainer}>
                                <div className={styles.infoPanel}>
                                    <div className={styles.info}>
                                        <p className={styles.text}>Использовано компаний</p>
                                        <p className={styles.text}>Лимит по компаниям</p>
                                    </div>
                                    <div className={styles.info}>
                                        <p className={styles.used}>34</p>
                                        <p className={styles.limit}>100</p>
                                    </div>
                                </div>
                                <div className={styles.logoutGroup}>
                                    <div className={styles.wrapper}>
                                        <p className={styles.username}>Антон А.</p>
                                        <button className={styles.logoutButton} onClick={handleLogout}>Выйти</button>
                                    </div>
                                    <img className={styles.userImg} src="./photo_sample.svg" alt="user image" />
                                </div>
                            </div>
                        </> :
                        <>
                            <div className={styles.loginPanel}>
                                <button className={`${styles.button} ${styles.registerButton}`}>Зарегистрироваться</button>
                                <div className={styles.divider}></div>
                                <button className={styles.button} onClick={handleLogin}>Войти</button>
                            </div>
                        </>}

                </div>
            </div>
        </header>
    )
}
