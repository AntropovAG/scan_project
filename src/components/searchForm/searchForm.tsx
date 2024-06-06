import styles from './searchForm.module.css'
import { useState, useEffect } from 'react'

export default function SearchForm() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.currentTarget.type = 'date'
    }

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>, placeholder: string) => {
        if (!e.currentTarget.value) {
            e.currentTarget.type = 'text';
            e.currentTarget.placeholder = placeholder;
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
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
                            <label className={styles.label} htmlFor="inn">ИНН компании *</label>
                            <input className={styles.input} type="text" id="inn" name="inn" placeholder='10 цифр' required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="tone">Тональность</label>
                            <select className={`${styles.input} ${styles.select}`} name="tone" id="tone">
                                <option value="any">Любая</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="documentNumber">Количество документов в выдаче *</label>
                            <input className={styles.input} type="text" id="documentNumber" name="documentNumber" placeholder='от 1 до 1000' required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="range">Диапозон поиска *</label>
                            <div className={styles.datesInputs}>
                                <input className={`${styles.input} ${styles.select} ${styles.dateInput}`} type="text" id="startDate" placeholder='Дата начала' onFocus={handleOnFocus} onBlur={(e)=>handleOnBlur(e, 'Дата начала')} onChange={(e)=>setStartDate(e.target.value)} value={startDate} required />
                                <input className={`${styles.input} ${styles.select} ${styles.dateInput}`} type="text" id="endDate" placeholder='Дата конца' onFocus={handleOnFocus} onBlur={(e)=>handleOnBlur(e, 'Дата конца')} onChange={(e)=>setEndDate(e.target.value)} value={endDate} required />
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
