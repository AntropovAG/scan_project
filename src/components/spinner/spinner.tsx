import styles from './spinner.module.css';

interface SpinnerProps {
    isBig?: boolean;
}

export default function Spinner({isBig}: SpinnerProps) {
    return (
        <div className={styles.container}>
            <img className={styles.spinner} src="./spinner.svg" alt="loading..." />
            {isBig && <p className={styles.text}>Загружаем данные...</p>}
        </div>
    )
}
