import styles from './carousel.module.css'
import { carouselItems } from '../../utils/constants'
import { useState } from 'react'

export default function Carousel() {
    const [startIndex, setStartIndex] = useState<number>(0)
    const [endIndex, setEndIndex] = useState<number>(3)

    const displayedCarouselItems = carouselItems.slice(startIndex, endIndex); 

    const handleNext = () => {
        if (endIndex < carouselItems.length) {
            setStartIndex(startIndex + 1)
            setEndIndex(endIndex + 1)
        }
        if (endIndex === carouselItems.length) {
            setStartIndex(0)
            setEndIndex(3)
        }
    }

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1)
            setEndIndex(endIndex - 1)
        }
        if (startIndex === 0) {
            setStartIndex(carouselItems.length - 3)
            setEndIndex(carouselItems.length)
        }
    }

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
