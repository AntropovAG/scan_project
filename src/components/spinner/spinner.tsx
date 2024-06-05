import styles from './spinner.module.css';

export default function spinner() {
    return (
        <>
            <img className={styles.spinner} src="./spinner.svg" alt="loading..." />
        </>
    )
}
