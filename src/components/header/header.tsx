import styles from './header.module.css'

export default function Header() {
    return (
        <header className={styles.container}>
            <img className={styles.image} src="./logo.svg" alt="logo" />
            <nav>
                <ul>
                    <li><a href="#">Главная</a></li>
                    <li><a href="#">Тарифы</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </nav>
            <div>
                <button>Зарегистрироваться</button>
                <button>Войти</button>
            </div>
        </header>
    )
}
