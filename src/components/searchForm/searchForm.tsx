import styles from './searchForm.module.css'
import { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { validateInnNumber, formRequestData } from '../../utils/supportFunctions';
import { NumberFormatValues, PatternFormat } from 'react-number-format';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { ErrorStates } from '../../interfaces/generalInterfaces';

export default function SearchForm() {
    const [startDate, setStartDate] = useState<null | Date>(null);
    const [endDate, setEndDate] = useState<null | Date>(null);
    const [inn, setInn] = useState('');
    const [innIsValid, setInnIsValid] = useState<boolean>(false);
    const [documentNumberIsValid, setDocumentNumberIsValid] = useState<boolean>(false);
    const [datesAreValid, setDatesAreValid] = useState<boolean>(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const [errorStates, setErrorStates] = useState<ErrorStates>({
        inn: { error: false, message: '' },
        documentNumber: { error: false, message: '' },
        dates: { error: false, message: '' }
    });
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const data = formRequestData(formData, startDate, endDate, inn);
        navigate('/result', { state: { data } });
        
        // Как альтернатива - можно загружать данные внутри текущего компонента и переходить в результаты поиска только после успешного получения данных (кроме статей)
        // Пока будет загрузка - установить спиннер или надпись на кнопке формы и заблокировать её

        // Promise.all([dispatch(fetchOverviewData(data)), dispatch(fetchDocumentsIds(data))])
        //     .then(([overviewResult, documentsResult ]) => {
        //         if (fetchOverviewData.fulfilled.match(overviewResult) && fetchDocumentsIds.fulfilled.match(documentsResult)) {
        //             // Переход на страницу с результатами поиска только в случае успешного получения данных
        //             navigate('/result');
        //         } else {
        //             console.log('Ошибка при получении данных');
        //         }
        //     })
        //     .catch((error) => {
        //         console.log('Ошибка получения данных: ', error);
        //     });
    }

        const validateInn = (value: string) => {
            const isValid = validateInnNumber(value);
            setInnIsValid(isValid);
            if (!isValid) {
                setErrorStates(prevState => ({
                    ...prevState, inn: {
                        error: true,
                        message: 'Введите корректные данные'
                    }
                }));
            }
            else {
                setErrorStates(prevState => ({
                    ...prevState, inn: {
                        error: false,
                        message: ''
                    }
                }));
            }
        }

        const validateDocumentNumber = (value: string) => {
            const isValid = parseInt(value) > 0 && parseInt(value) <= 1000;
            setDocumentNumberIsValid(isValid);
            if (!isValid) {
                setErrorStates(prevState => ({
                    ...prevState, documentNumber: {
                        error: true,
                        message: 'Введите корректные данные'
                    }
                }));
            }
            else {
                setErrorStates(prevState => ({
                    ...prevState, documentNumber: {
                        error: false,
                        message: ''
                    }
                }));
            }
        }

        const validateDates = (startDate: Date | null, endDate: Date | null) => {
            const currentDate = new Date();
            const isValid = (startDate && endDate) ? (startDate <= endDate && endDate <= currentDate) : false;
            setDatesAreValid(isValid);
            if (!isValid) {
                setErrorStates(prevState => ({
                    ...prevState, dates: {
                        error: true,
                        message: 'Введите корректные данные'
                    }
                }));
            }
            else {
                setErrorStates(prevState => ({
                    ...prevState, dates: {
                        error: false,
                        message: ''
                    }
                }));
            }
        }

        const handleInnChange = (values: NumberFormatValues) => {
            const { value } = values;
            setInn(value);
            validateInn(value);
        }

        const handleDocumentNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            validateDocumentNumber(value);
        }

        const handleStartDateChange = (date: Date | null) => {
            setStartDate(date);
            if (endDate) validateDates(date, endDate);
        };

        const handleEndDateChange = (date: Date | null) => {
            setEndDate(date);
            if (startDate) validateDates(startDate, date);
        };

        useEffect(() => {
            setFormIsValid(innIsValid && documentNumberIsValid && datesAreValid);
        }, [innIsValid, documentNumberIsValid, datesAreValid]);


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
                                <label className={styles.label} htmlFor="inn">ИНН компании <span className={clsx({ [styles.errorIndicator]: errorStates.inn.error })}>*</span></label>
                                <PatternFormat format='## ### ### ##' className={clsx(styles.input, { [styles.errorInput]: errorStates.inn.error })} type="text" id="inn" name="inn" placeholder='10 цифр' onValueChange={(values) => handleInnChange(values)} required />
                                <span className={styles.errorMessage}>{errorStates.inn.message}</span>
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label} htmlFor="tonality">Тональность</label>
                                <select className={`${styles.input} ${styles.select}`} name="tonality" id="tonality">
                                    <option value="any">Любая</option>
                                    <option value="negative">Негативная</option>
                                    <option value="positive">Положительная</option>
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label} htmlFor="documentNumber">Количество документов в выдаче <span className={clsx({ [styles.errorIndicator]: errorStates.documentNumber.error })}>*</span></label>
                                <input className={clsx(styles.input, { [styles.errorInput]: errorStates.documentNumber.error })} type="text" id="documentNumber" name="documentNumber" placeholder='от 1 до 1000' onChange={handleDocumentNumberChange} required />
                                <span className={styles.errorMessage}>{errorStates.documentNumber.message}</span>
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label} htmlFor="range">Диапозон поиска <span className={clsx({ [styles.errorIndicator]: errorStates.dates.error })}>*</span></label>
                                <div className={styles.datesInputs}>
                                    <DatePicker
                                        className={clsx(`${styles.input} ${styles.select} ${styles.dateInput}`, { [styles.errorInput]: errorStates.dates.error })}
                                        name='startDate'
                                        selected={startDate}
                                        onChange={(date) => handleStartDateChange(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat='yyyy-MM-dd'
                                        placeholderText='Дата начала'
                                    />
                                    <DatePicker
                                        className={clsx(`${styles.input} ${styles.select} ${styles.dateInput}`, { [styles.errorInput]: errorStates.dates.error })}
                                        name='endDate'
                                        dateFormat='yyyy-MM-dd'
                                        selected={endDate}
                                        onChange={(date) => handleEndDateChange(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate}
                                        placeholderText='Дата конца'
                                    />
                                </div>
                                <span className={styles.errorMessage}>{errorStates.dates.message}</span>
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
                                <button className={styles.submitButton} type="submit" disabled={!formIsValid}>Поиск</button>
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
