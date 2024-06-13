import styles from './home.module.css'
import { Link } from 'react-router-dom'
import Carousel from '../carousel/carousel'
import Tariffs from '../tariffs/tariffs'

export default function Home() {
    return (
        <>
            <section className={styles.intro}>
                <div className={styles.container}>
                    <h1 className={styles.heading}>сервис по поиску 
                        <span> публикаций</span> 
                        <span>о компании </span>
                        <span>по его ИНН</span>
                    </h1>
                    <p className={styles.text}>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
                    <Link className={styles.link} to={"/search"}>Запросить данные</Link>
                </div>
                <img className={styles.image} src="./intro_img.svg" alt="intro image" />
            </section>
            <Carousel />
            <div className={styles.divider}>
                <img className={styles.dividerImage}  src="./home_img.svg" alt="divider image" />
            </div>
            <Tariffs />
        </>

    )
}
