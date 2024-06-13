import styles from './header.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import BurgerMenu from '../burgerMenu/burgerMenu';
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import { logout, getUserInfo } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import { userData } from '../../utils/constants';

export default function Header() {
    const [isMobile, setIsMobile] = useState<boolean>(innerWidth <= 745);
    const dispatch = useAppDispatch();
    const isAuthorized = useAppSelector(state => state.user.isAuthorized);
    const isLoading = useAppSelector(state => state.user.isLoading);
    const userInfo = useAppSelector(state => state.user.userInfo);
    const navigate = useNavigate();

    const handleMobileSize = () => {
        setIsMobile(innerWidth <= 745);
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    useEffect(() => {
        handleMobileSize();

        window.addEventListener('resize', handleMobileSize);

        return () => {
            window.removeEventListener('resize', handleMobileSize);
        }
    }, []);

    useEffect(() => {
        if (isAuthorized) {
            dispatch(getUserInfo());
        }
    }, [isAuthorized, dispatch]);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.imgContainer}>
                    <img className={styles.image} src="./logo.svg" alt="logo" />
                </div>
                <nav className={styles.navigation}>
                    <ul className={styles.navList}>
                        <li><Link className={styles.link} to={"/"}>Главная</Link></li>
                        <li><Link className={styles.link} to={"/tariffs"}>Тарифы</Link></li>
                        <li><Link className={styles.link} to={"/faq"}>FAQ</Link></li>
                    </ul>
                </nav>
                <div className={styles.panelContainer}>
                    {isAuthorized ?
                        <>
                            <div className={styles.userInfoContainer}>
                                <div className={styles.infoPanel}>
                                    {isLoading ? <Spinner /> :
                                        <>
                                            <p className={`${styles.text} ${styles.usedText}`}>Использовано компаний</p>
                                            <p className={`${styles.text} ${styles.limitText}`}>Лимит по компаниям</p>
                                            <p className={`${styles.numbers} ${styles.used}`}>{userInfo.usedCompanyCount}</p>
                                            <p className={`${styles.numbers} ${styles.limit}`}>{userInfo.companyLimit}</p>
                                        </>
                                    }
                                </div>
                                <div className={styles.logoutGroup}>
                                    <div className={styles.wrapper}>
                                        <p className={styles.username}>{userData.name}</p>
                                        <button className={styles.logoutButton} onClick={handleLogout}>Выйти</button>
                                    </div>
                                    <img className={styles.userImg} src={userData.img} alt="user image" />
                                </div>
                                {isMobile && <BurgerMenu />}
                            </div>
                        </> :
                        <>
                            <div className={styles.loginPanel}>
                                <Link to={"/register"} className={`${styles.authLink} ${styles.registerLink}`}>Зарегистрироваться</Link>
                                <div className={styles.divider}></div>
                                <Link to={"/login"} className={styles.authLink}>Войти</Link>
                            </div>
                            {isMobile && <BurgerMenu />}
                        </>}
                </div>
            </div>
        </header>
    )
}
