import styles from './carousel.module.css'
import { carouselItems } from '../../utils/constants'
import { useState } from 'react'

export default function Carousel() {
    const [startIndex, setStartIndex] = useState<number>(0);
    const totalCarouselItems = carouselItems.length;

    //Количество отображаемых карточек в карусели
    const carouselItemsToDisplay = 3;

    //Инициализируем массив карточек для отображения
    const displayedCarouselItems = [
        //Через slice и спрэд оператор берём карточки, которые будут отображаться в карусели
        ...carouselItems.slice(startIndex, startIndex + carouselItemsToDisplay),
        //Если индекс первой карточки + количество карточек для отображения больше общего количества карточек, то берём карточки с начала массива
        ...carouselItems.slice(0, Math.max(0, startIndex + carouselItemsToDisplay - totalCarouselItems))
    ];

    const handleNext = () => setStartIndex((prevIndex) => (prevIndex + 1) % totalCarouselItems);
    const handlePrev = () => setStartIndex((prevIndex) => (prevIndex - 1 + totalCarouselItems) % totalCarouselItems);

    return (
        <section className={styles.carousel}>
            <h2 className={styles.heading}>почему именно мы</h2>
            <div className={styles.container}>
                <button className={`${styles.button} ${styles.buttonPrev}`} onClick={handlePrev}></button>
                {displayedCarouselItems.map((item, index) => {
                    return (
                        <div key={index} className={styles.item}>
                            <img className={styles.image} src={item.img} alt={item.alt} />
                            <p className={styles.text}>{item.text}</p>
                        </div>
                    )
                })}
                <button className={`${styles.button} ${styles.buttonNext}`} onClick={handleNext}></button>
            </div>

        </section>
    )
}
