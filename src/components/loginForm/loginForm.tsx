import styles from './loginForm.module.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { formatPhoneNumber, isPhoneNumber, isValidPhoneNumber } from '../../utils/supportFunctions';
import clsx from 'clsx';
import { loginUser } from '../../redux/userSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const [activeButton, setActiveButton] = useState('loginButton');
    const [isValid, setIsValid] = useState(false);
    const [loginData, setLoginData] = useState({
        login: '',
        password: ''
    });
    const [loginValue, setLoginValue] = useState('');
    const [loginError, setLoginError] = useState({
        error: false,
        message: ''
    });
    const [passwordError, setPasswordError] = useState({
        error: false,
        message: ''
    });
    const dispatch = useAppDispatch();
    const isAuthorized = useAppSelector(state => state.user.isAuthorized);
    const navigate = useNavigate();


    const handleButtonChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        setActiveButton(e.currentTarget.id);
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: {login: string, password: string} = 
        {
            login: formData.get('login') as string,
            password: formData.get('password') as string
        };
        console.log(data);
        dispatch(loginUser(data));
    }

    const validateLogin = (value: string) => {
        //Если вводится телефон (проверка на наличие цифр и длину), то форматируем его в вид +7 XXX XXX XX XX
        if (isPhoneNumber(value)) {
            if (value.length > 1 && !value.startsWith('+7')) {
                value = `+7${value.replace(/^\+?7?/, '')}`;
            }
            if (value.replace(/\s/g, '').length > 12 || !isValidPhoneNumber(value)) {
                setLoginError({ error: true, message: 'Введите корректные данные' });
            } else {
                setLoginError({ error: false, message: '' });
            }
            setLoginValue(formatPhoneNumber(value));
        } else {
            //в противном случае не форматируем введённые данные под телефон
            setLoginError({ error: false, message: '' });
            setLoginValue(value);
        }
        return value.replace(/\s/g, '');
    }

    const validatePassword = (value: string) => {
        if (value.length < 1) {
            setPasswordError({ error: true, message: 'Неправильный пароль' });
        } else {
            setPasswordError({ error: false, message: '' });
        }
        return value;
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;

        let updatedValue = value;
        if (name === 'login') {
            updatedValue = validateLogin(value);
        } else if (name === 'password') {
            updatedValue = validatePassword(value);
        }

        setLoginData({ ...loginData, [name]: updatedValue });
    };

    useEffect(() => {
        setIsValid(loginData.login.length > 0 && loginData.password.length > 0 && !loginError.error && !passwordError.error);
    }, [loginData, loginError, passwordError]);


    useEffect(() => {
        if (isAuthorized) {
            navigate('/');
        }
    }, [isAuthorized, navigate]);

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
                        <input className={clsx(styles.input, { [styles.errorInput]: loginError.error === true })} type="text" id="login" name="login" onChange={handleOnChange} value={loginValue} required />
                        <span className={styles.errorText}>{loginError.message}</span>
                        <label className={styles.label} htmlFor="password">Пароль:</label>
                        <input className={clsx(styles.input, { [styles.errorInput]: passwordError.error === true })} type="password" id="password" name="password" onChange={handleOnChange} required />
                        <span className={styles.errorText}>{passwordError.message}</span>
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
