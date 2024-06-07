import styles from './searchResult.module.css';
import { useRef, useState, useEffect } from 'react';

const mockData = [
    {
        date: '10.09.2021',
        total: 5,
        risks: 0
    },
    {
        date: '10.09.2021',
        total: 5,
        risks: 0
    },
    {
        date: '10.09.2021',
        total: 5,
        risks: 0
    },
    {
        date: '10.09.2021',
        total: 5,
        risks: 0
    },
    {
        date: '10.09.2021',
        total: 5,
        risks: 0
    },
    {
        date: '10.09.2021',
        total: 5,
        risks: 0
    },
    {
        date: '10.09.2021',
        total: 5,
        risks: 0
    },
    {
        date: '10.09.2021',
        total: 5,
        risks: 0
    },
    {
        date: '10.09.2021',
        total: 5,
        risks: 0
    },
    {
        date: '10.09.2021',
        total: 5,
        risks: 0
    },
    {
        date: '10.09.2021',
        total: 5,
        risks: 0
    },
    {
        date: '10.09.2021',
        total: 5,
        risks: 0
    }

]

export default function SearchResult() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [scrollableToPrev, setscrollableToPrev] = useState<boolean>(false);
    const [scrollableToNext, setscrollableToNext] = useState<boolean>(true);


    // Добавляем листенер для возможности скролла слайдера
    useEffect(() => {

        const handleScroll = () => {
            if (sliderRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
                setscrollableToPrev(scrollLeft > 0);
                setscrollableToNext(scrollLeft < (scrollWidth - clientWidth));
            }
        };

        const slider = sliderRef.current; // помещаем ссылку на слайдер в переменную
        if (slider) {
            slider.addEventListener('scroll', handleScroll);
            handleScroll();
        }

        //Очищаем при размонтировании
        return () => {
            if (slider) {
                slider.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    // Функции для скролла слайдера, перемещают слайдер на 266px вправо или влево (примерно на два элемента)

    const scrollNext = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 266, behavior: 'smooth' });
        }
    };

    const scrollPrev = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -266, behavior: 'smooth' });
        }
    };

    return (
        <section className={styles.container}>
            <div className={styles.headingContainer}>
                <div className={styles.headingTextWrapper}>
                    <h2 className={styles.heading}>Ищем. Скоро будут результаты</h2>
                    <p className={styles.text}>Поиск может занять некоторое время, просим сохранять терпение.</p>
                </div>
                <img className={styles.image} src="./result_image.svg" alt="result image" />
            </div>

            <article className={styles.infoContainer}>
                <h3 className={styles.infoHeading}>Общая сводка</h3>
                <p className={styles.infoText}>Найдено 999 вариантов</p>
                <div className={styles.sliderContainer}>
                    <button className={`${styles.navButton} ${styles.prevButton}`} onClick={scrollPrev} disabled={!scrollableToPrev}></button>
                    <button className={`${styles.navButton} ${styles.nextButton}`} onClick={scrollNext} disabled={!scrollableToNext}></button>
                    <div className={styles.sliderTitleContainer}>
                        <h3 className={styles.sliderTitle}>Период</h3>
                        <h3 className={styles.sliderTitle}>Всего</h3>
                        <h3 className={styles.sliderTitle}>Риски</h3>
                    </div>
                    <div className={styles.slider} ref={sliderRef}>
                        {mockData.map((item, index) => {
                            return (
                                <div className={styles.resultItem} key={index}>
                                    <p className={styles.resultText}>{item.date}</p>
                                    <p className={styles.resultText}>{item.total}</p>
                                    <p className={styles.resultText}>{item.risks}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </article>

            <article className={styles.documentsListContainer}>
                <h2 className={styles.documentsListHeading}>Список документов</h2>
                <ul className={styles.documentsList}>
                    <li>
                        <div className={styles.documentsListItem}>
                            <div className={styles.documentInfoContainer}>
                                <p className={styles.documentText}>01.01.2020</p>
                                <a href='#' className={`${styles.documentText} ${styles.documentLink}`}>Комсомольская правда KP.RU</a>
                            </div>
                            <h3 className={styles.documentHeading}>Скиллфэктори - лучшая онлайн-школа для будущих айтишников</h3>
                            <div className={styles.documentTypeContainer}>
                                <p className={styles.documentType}>Технические новости</p>
                            </div>
                            <img src="./card_img.svg" alt="document image" />
                            <p className={`${styles.documentText} ${styles.documentDescription}`}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit eum iure non eaque dolore laborum, dignissimos iste autem quisquam, quidem asperiores provident earum minima quae maxime quibusdam. Perspiciatis, fugiat eius. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, repudiandae adipisci dolores quasi pariatur natus doloribus nemo! Impedit asperiores soluta minima, ipsa corrupti dolorem rem reiciendis, cum, molestias eum eos?</p>
                            <div className={styles.documentButtonContainer}>
                                <button className={styles.documentButton}>Читать в источнике</button>
                                <p className={styles.documentText}>234 слова</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className={styles.documentsListItem}>
                            <div className={styles.documentInfoContainer}>
                                <p className={styles.documentText}>01.01.2020</p>
                                <a href='#' className={`${styles.documentText} ${styles.documentLink}`}>Комсомольская правда KP.RU</a>
                            </div>
                            <h3 className={styles.documentHeading}>Скиллфэктори - лучшая онлайн-школа для будущих айтишников</h3>
                            <div className={styles.documentTypeContainer}>
                                <p className={styles.documentType}>Технические новости</p>
                            </div>
                            <img src="./card_img.svg" alt="document image" />
                            <p className={`${styles.documentText} ${styles.documentDescription}`}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit eum iure non eaque dolore laborum, dignissimos iste autem quisquam, quidem asperiores provident earum minima quae maxime quibusdam. Perspiciatis, fugiat eius. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, repudiandae adipisci dolores quasi pariatur natus doloribus nemo! Impedit asperiores soluta minima, ipsa corrupti dolorem rem reiciendis, cum, molestias eum eos?</p>
                            <div className={styles.documentButtonContainer}>
                                <button className={styles.documentButton}>Читать в источнике</button>
                                <p className={styles.documentText}>234 слова</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className={styles.documentsListItem}>
                            <div className={styles.documentInfoContainer}>
                                <p className={styles.documentText}>01.01.2020</p>
                                <a href='#' className={`${styles.documentText} ${styles.documentLink}`}>Комсомольская правда KP.RU</a>
                            </div>
                            <h3 className={styles.documentHeading}>Скиллфэктори - лучшая онлайн-школа для будущих айтишников</h3>
                            <div className={styles.documentTypeContainer}>
                                <p className={styles.documentType}>Технические новости</p>
                            </div>
                            <img src="./card_img.svg" alt="document image" />
                            <p className={`${styles.documentText} ${styles.documentDescription}`}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit eum iure non eaque dolore laborum, dignissimos iste autem quisquam, quidem asperiores provident earum minima quae maxime quibusdam. Perspiciatis, fugiat eius. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, repudiandae adipisci dolores quasi pariatur natus doloribus nemo! Impedit asperiores soluta minima, ipsa corrupti dolorem rem reiciendis, cum, molestias eum eos?</p>
                            <div className={styles.documentButtonContainer}>
                                <button className={styles.documentButton}>Читать в источнике</button>
                                <p className={styles.documentText}>234 слова</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className={styles.documentsListItem}>
                            <div className={styles.documentInfoContainer}>
                                <p className={styles.documentText}>01.01.2020</p>
                                <a href='#' className={`${styles.documentText} ${styles.documentLink}`}>Комсомольская правда KP.RU</a>
                            </div>
                            <h3 className={styles.documentHeading}>Скиллфэктори - лучшая онлайн-школа для будущих айтишников</h3>
                            <div className={styles.documentTypeContainer}>
                                <p className={styles.documentType}>Технические новости</p>
                            </div>
                            <img src="./card_img.svg" alt="document image" />
                            <p className={`${styles.documentText} ${styles.documentDescription}`}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit eum iure non eaque dolore laborum, dignissimos iste autem quisquam, quidem asperiores provident earum minima quae maxime quibusdam. Perspiciatis, fugiat eius. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, repudiandae adipisci dolores quasi pariatur natus doloribus nemo! Impedit asperiores soluta minima, ipsa corrupti dolorem rem reiciendis, cum, molestias eum eos?</p>
                            <div className={styles.documentButtonContainer}>
                                <button className={styles.documentButton}>Читать в источнике</button>
                                <p className={styles.documentText}>234 слова</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className={styles.documentsListItem}>
                            <div className={styles.documentInfoContainer}>
                                <p className={styles.documentText}>01.01.2020</p>
                                <a href='#' className={`${styles.documentText} ${styles.documentLink}`}>Комсомольская правда KP.RU</a>
                            </div>
                            <h3 className={styles.documentHeading}>Скиллфэктори - лучшая онлайн-школа для будущих айтишников</h3>
                            <div className={styles.documentTypeContainer}>
                                <p className={styles.documentType}>Технические новости</p>
                            </div>
                            <img src="./card_img.svg" alt="document image" />
                            <p className={`${styles.documentText} ${styles.documentDescription}`}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit eum iure non eaque dolore laborum, dignissimos iste autem quisquam, quidem asperiores provident earum minima quae maxime quibusdam. Perspiciatis, fugiat eius. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, repudiandae adipisci dolores quasi pariatur natus doloribus nemo! Impedit asperiores soluta minima, ipsa corrupti dolorem rem reiciendis, cum, molestias eum eos?</p>
                            <div className={styles.documentButtonContainer}>
                                <button className={styles.documentButton}>Читать в источнике</button>
                                <p className={styles.documentText}>234 слова</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className={styles.documentsListItem}>
                            <div className={styles.documentInfoContainer}>
                                <p className={styles.documentText}>01.01.2020</p>
                                <a href='#' className={`${styles.documentText} ${styles.documentLink}`}>Комсомольская правда KP.RU</a>
                            </div>
                            <h3 className={styles.documentHeading}>Скиллфэктори - лучшая онлайн-школа для будущих айтишников</h3>
                            <div className={styles.documentTypeContainer}>
                                <p className={styles.documentType}>Технические новости</p>
                            </div>
                            <img src="./card_img.svg" alt="document image" />
                            <p className={`${styles.documentText} ${styles.documentDescription}`}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit eum iure non eaque dolore laborum, dignissimos iste autem quisquam, quidem asperiores provident earum minima quae maxime quibusdam. Perspiciatis, fugiat eius. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, repudiandae adipisci dolores quasi pariatur natus doloribus nemo! Impedit asperiores soluta minima, ipsa corrupti dolorem rem reiciendis, cum, molestias eum eos?</p>
                            <div className={styles.documentButtonContainer}>
                                <button className={styles.documentButton}>Читать в источнике</button>
                                <p className={styles.documentText}>234 слова</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <button className={styles.button}>Показать ещё</button>
            </article>
        </section>
    )
}
