import styles from './searchForm.module.css'
import { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from '../../utils/supportFunctions';


export default function SearchForm() {
    const [startDate, setStartDate] = useState<null | Date>(null);
    const [endDate, setEndDate] = useState<null | Date>(null);
    const [isValid, setIsValid] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        formData.append('startDate', formatDate(startDate));
        formData.append('endDate', formatDate(endDate));
        const data = Object.fromEntries(formData.entries());
        console.log(data);
    }

    useEffect(() => {
        if (startDate && endDate) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [startDate, endDate])


    return (
        <section className={styles.container}>
            <div className={styles.headingContainer}>
                <h2 className={styles.heading}>Найдите необходимые данные в пару кликов.</h2>
                <p className={styles.text}>Задайте параметры поиска. <br />Чем больше заполните, тем точнее поиск</p>
                <img className={styles.documentIcon} src="./document_icon.svg" alt="document icon" />
                <img className={styles.foldersIcon} src="./folders_icon.svg" alt="folders icon" />
            </div>
            <div className={styles.formWrapper}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputsContainer}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="inn">ИНН компании <span style={{ color: 'red' }}>*</span></label>
                            <input className={styles.input} type="text" id="inn" name="inn" placeholder='10 цифр' required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="tone">Тональность</label>
                            <select className={`${styles.input} ${styles.select}`} name="tone" id="tone">
                                <option value="any">Любая</option>
                                <option value="negative">Негативная</option>
                                <option value="positive">Положительная</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="documentNumber">Количество документов в выдаче *</label>
                            <input className={styles.input} type="text" id="documentNumber" name="documentNumber" placeholder='от 1 до 1000' required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="range">Диапозон поиска *</label>
                            <div className={styles.datesInputs}>
                                <DatePicker
                                    className={`${styles.input} ${styles.select} ${styles.dateInput}`}
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat='yyyy-MM-dd'
                                    placeholderText='Дата начала'
                                />
                                <DatePicker
                                    className={`${styles.input} ${styles.select} ${styles.dateInput}`}
                                    dateFormat='yyyy-MM-dd'
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    placeholderText='Дата конца'
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.checkboxsContainer}>
                        <ul className={styles.checkboxList}>
                            <li className={styles.checkboxGroup}>
                                <input className={styles.checkbox} type="checkbox" id="fullness" name="fullness" />
                                <label className={styles.label} htmlFor="fullness">Признак максимальной полноты</label>
                            </li>
                            <li className={styles.checkboxGroup}>
                                <input className={styles.checkbox} type="checkbox" id="context" name="context" />
                                <label className={styles.label} htmlFor="context">Упоминания в бизнес-контексте</label>
                            </li>
                            <li className={styles.checkboxGroup}>
                                <input className={styles.checkbox} type="checkbox" id="role" name="role" />
                                <label className={styles.label} htmlFor="role">Главная роль в публикации</label>
                            </li>
                            <li className={styles.checkboxGroup}>
                                <input className={styles.checkbox} type="checkbox" id="riskFactors" name="riskFactors" />
                                <label className={styles.label} htmlFor="riskFactors">Публикации только с риск-факторами</label>
                            </li>
                            <li className={styles.checkboxGroup}>
                                <input className={styles.checkbox} type="checkbox" id="techNews" name="techNews" />
                                <label className={styles.label} htmlFor="techNews">Включать технические новости рынков</label>
                            </li>
                            <li className={styles.checkboxGroup}>
                                <input className={styles.checkbox} type="checkbox" id="announcement" name="announcement" />
                                <label className={styles.label} htmlFor="announcement">Включать анонсы и календари</label>
                            </li>
                            <li className={styles.checkboxGroup}>
                                <input className={styles.checkbox} type="checkbox" id="summary" name="summary" />
                                <label className={styles.label} htmlFor="summary">Включать сводки новостей</label>
                            </li>
                        </ul>
                        <div className={styles.buttonGroup}>
                            <button className={styles.submitButton} type="submit" disabled={!isValid}>Поиск</button>
                            <p className={styles.disclaimerText}>* Обязательные к заполнению поля</p>
                        </div>

                    </div>

                </form>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src="./search_form_image.svg" alt="search image" />
                </div>
            </div>

        </section>
    )
}
