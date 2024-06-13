import styles from './listItem.module.css';
import { formatDate } from '../../utils/supportFunctions';
import { Link } from 'react-router-dom';
import { parceText, normalizeCountText } from '../../utils/supportFunctions';
import { wordsArray, articlesImage } from '../../utils/constants';
import DOMPurify from 'dompurify'

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
    const sanitizedText = DOMPurify.sanitize(text);

    const parsedText = parceText(sanitizedText);
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
            <img src={articlesImage.src} alt={articlesImage.alt} />
            <p className={`${styles.documentText} ${styles.documentDescription}`} dangerouslySetInnerHTML={{__html: parsedText}}></p>
            <div className={styles.documentButtonContainer}>
                <Link to={url} target='_blank' className={styles.documentButton}>Читать в источнике</Link>
                <p className={styles.documentText}>{`${attributes.wordCount} ${normalizeCountText(attributes.wordCount, wordsArray)}`}</p>
            </div>
        </div>
    )
}
