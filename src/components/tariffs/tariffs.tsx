import styles from './tariffs.module.css';
import { tariffs } from '../../utils/constants';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

export default function Tariffs() {
    const [activeTariff, setActiveTariff] = useState<string | undefined | null>(null);

    useEffect(() => {
        setActiveTariff('Pro')
    }, [])

    return (
        <section className={styles.tariffs}>
            <h2 className={styles.heading}>наши тарифы</h2>
            <div className={styles.container}>
                {tariffs.map((tariff, index) => {
                    const isActive = activeTariff === tariff.name;
                    return (
                        <div className={clsx(
                            styles.item,
                            { [styles.blackBorder]: isActive && tariff.color === 'black' },
                            { [styles.blueBorder]: isActive && tariff.color === 'blue' },
                            { [styles.orangeBorder]: isActive && tariff.color === 'orange' },
                            )} key={index}>

                            <div className={ clsx(
                                styles.itemTitleContainer,
                                { [styles.blueBackground]: tariff.color === 'blue' },
                                { [styles.blackBackground]: tariff.color === 'black' },
                                { [styles.orangeBackground]: tariff.color === 'orange' },
                            )}>
                                <div className={clsx(styles.itemTitle,
                                    { [styles.whiteText]: tariff.color === 'black'}
                                )}>
                                    <h3 className={styles.title}>{tariff.name}</h3>
                                    <p className={styles.text}>{tariff.description}</p>
                                </div>
                                <img className={styles.icon} src={tariff.icon} alt="tariff icon" />
                            </div>

                            <div className={styles.infoContainer}>
                                {isActive && <p className={styles.currentTariff}>Текущий тариф</p>}
                                <div className={styles.priceContainer}>
                                    <p className={styles.currentPrice}>{tariff.currentPrice} &#x20bd; <span className={styles.prevPrice}>{tariff.oldPrice} &#x20bd;</span></p>
                                    <p className={styles.text}>{tariff.discountDescription}</p>
                                </div>
                                <div className={styles.descriptionContainer}>
                                    <h3 className={styles.descriptionHeading}>В тариф входит:</h3>
                                    <ul className={styles.descriptionList}>
                                        {tariff.included.map((item, index) => {
                                            return (
                                                <li className={`${styles.text} ${styles.listItem}`} key={index}>{item}</li>
                                            )
                                        })}
                                    </ul>
                                </div>

                            </div>
                            <button className={clsx(
                                styles.button,
                                { [styles.buttonDisabled]: isActive },
                                )} disabled={isActive}>{isActive ? 'Перейти в личный кабинет' : 'Подробнее'}</button>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
