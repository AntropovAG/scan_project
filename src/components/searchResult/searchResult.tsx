import styles from './searchResult.module.css';
import { useRef, useState, useEffect } from 'react';
import ListItem from '../listItem/listItem';

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
    const [scrollAmount, setScrollAmount] = useState<number>(266);

    const handleSliderScrollResize = () => {
        const innerWidth = window.innerWidth;
        if (innerWidth <= 745) {
            setScrollAmount(298);
        } else {
            setScrollAmount(266);
        }
    };

    useEffect(() => {
        handleSliderScrollResize();

        window.addEventListener('resize', handleSliderScrollResize);

        return () => {
            window.removeEventListener('resize', handleSliderScrollResize);
        }
    }, []);


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
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const scrollPrev = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -(scrollAmount), behavior: 'smooth' });
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
                        <ListItem />
                    </li>
                    <li>
                        <ListItem />
                    </li>
                </ul>
                <button className={styles.button}>Показать ещё</button>
            </article>
        </section>
    )
}
