import styles from './listItem.module.css';

export default function ListItem() {
    return (
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
    )
}
