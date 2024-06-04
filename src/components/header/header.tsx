import styles from './header.module.css'

export default function Header() {
    return (
        <header className={styles.container}>
            <div className={styles.imgContainer}>
                <img className={styles.image} src="./logo.svg" alt="logo" />
            </div>

            <nav className={styles.navigation}>
                <ul className={styles.navList}>
                    <li><a className={styles.link} href="#">Главная</a></li>
                    <li><a className={styles.link} href="#">Тарифы</a></li>
                    <li><a className={styles.link} href="#">FAQ</a></li>
                </ul>
            </nav>

            <div className={styles.panelContainer}>
                <div></div>
                <div className={styles.loginPanel}>
                    <button className={`${styles.button} ${styles.registerButton}`}>Зарегистрироваться</button>
                    <div className={styles.divider}></div>
                    <button className={styles.button}>Войти</button>
                </div>
            </div>

        </header>
    )
}
