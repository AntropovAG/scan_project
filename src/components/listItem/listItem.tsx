import styles from './listItem.module.css';
import { formatDate } from '../../utils/supportFunctions';
import { Link } from 'react-router-dom';

interface ListItemProps {
    data: {
        attributes: {
            wordCount: number,
            isDigest: boolean,
            isTechNews: boolean,
            isAnnouncement: boolean,
        },
        date: string,
        source: string,
        text: string,
        title: string,
        url: string
    }
}

export default function ListItem({data}: ListItemProps) {
    const { attributes, date, source, text, title, url} = data;


    return (
        <div className={styles.documentsListItem}>
            <div className={styles.documentInfoContainer}>
                <p className={styles.documentText}>{formatDate(date)}</p>
                <a href='#' className={`${styles.documentText} ${styles.documentLink}`}>{source}</a>
            </div>
            <h3 className={styles.documentHeading}>{title}</h3>
            <div className={styles.documentTypeContainer}>
                {attributes.isDigest && <p className={styles.documentType}>Дайджест</p>}
                {attributes.isAnnouncement && <p className={styles.documentType}>Анонс</p>}
                {attributes.isTechNews && <p className={styles.documentType}>Технические новости</p>}
            </div>
            <div dangerouslySetInnerHTML={{__html: text}} />
            {/* <img src="./card_img.svg" alt="document image" />
            <p className={`${styles.documentText} ${styles.documentDescription}`}>{text}</p> */}
            <div className={styles.documentButtonContainer}>
                <Link to={url} target='_blank' className={styles.documentButton}>Читать в источнике</Link>
                <p className={styles.documentText}>{attributes.wordCount} слова</p>
            </div>
        </div>
    )
}
