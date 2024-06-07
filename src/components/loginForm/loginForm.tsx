import styles from './loginForm.module.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import clsx from 'clsx';

export default function LoginForm() {
    const [activeButton, setActiveButton] = useState('loginButton');
    const [isValid, setIsValid] = useState(false);
    const [loginData, setLoginData] = useState({
        login: '',
        password: ''
    });

    const handleButtonChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        setActiveButton(e.currentTarget.id);
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log(data)
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        const name = input.name;
        const value = input.value;
        setLoginData({ ...loginData, [name]: value });
    }

    useEffect(() => {
        if (loginData.login.length > 0 && loginData.password.length > 0) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [loginData])

    return (
        <section className={styles.container}>

            <h2 className={styles.heading}>Для оформления подписки на тариф, необходимо авторизоваться.</h2>
            <img className={styles.image} src="./characters_image.svg" alt="characters" />

            <div className={styles.formContainer}>
                <img className={styles.icon} src="./login_form_img.svg" alt="lock" />
                <div className={styles.buttonsGroup}>
                    <button className={clsx(
                        styles.button,
                        { [styles.buttonInactive]: activeButton !== 'loginButton' }
                    )} id='loginButton' onClick={(e) => handleButtonChange(e)}>Войти</button>
                    <button className={clsx(
                        styles.button,
                        { [styles.buttonInactive]: activeButton !== 'registerButton' }
                    )} id='registerButton' onClick={(e) => handleButtonChange(e)}>Зарегистрироваться</button>
                </div>
                {activeButton === 'loginButton' ? (<>
                    <form className={styles.form} onSubmit={handleFormSubmit}>
                        <label className={styles.label} htmlFor="login">Логин или номер телефона:</label>
                        <input className={styles.input} type="text" id="login" name="login" onChange={handleOnChange} required />
                        <span className={styles.error}></span>
                        <label className={styles.label} htmlFor="password">Пароль:</label>
                        <input className={styles.input} type="password" id="password" name="password" onChange={handleOnChange} required />
                        <span className={styles.error}></span>
                        <button className={styles.submitButton} type="submit" disabled={!isValid}>Войти</button>
                    </form>
                    <Link className={styles.restoreLink} to={"/restore"}>Восстановить пароль</Link>
                    <div className={styles.alterLoginGroup}>
                        <p className={styles.label}>Войти через:</p>
                        <div className={styles.alterButtons}>
                            <button className={styles.alterLoginButton}><img src="./google_icon.svg" alt="google icon" /></button>
                            <button className={styles.alterLoginButton}><img src="./facebook_icon.svg" alt="facebook icon" /></button>
                            <button className={styles.alterLoginButton}><img src="./ya_icon.svg" alt="yandex icon" /></button>
                        </div>
                    </div> </>) :
                    (<p className={styles.registerForm}>Форма регистрации не доступна</p>)}
            </div>

        </section>
    )
}
