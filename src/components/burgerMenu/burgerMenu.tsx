import './burgerMenu.css';
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface BurgerMenu {
    isOpen: boolean;
}

export default function BurgerMenu() {
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);

    const handleBurgerMenu = (state:BurgerMenu) => {
        setIsBurgerMenuOpen(state.isOpen);
    }

    const closeBurgerMenu = () => {
        setIsBurgerMenuOpen(false);
    }
    return (
        <Menu right width={'100%'} isOpen={isBurgerMenuOpen} onStateChange={handleBurgerMenu}>
            <div className={'burgerMenuLogo'}>
                <img className={'image'} src="./logo_burger_menu.svg" alt="logo" />
            </div>
            <ul className={'burgerMenuList'}>
                <li className={'burgerMenuListItem'} onClick={closeBurgerMenu}><Link className={'burgerMenuLink'} to={"/"}>Главная</Link></li>
                <li className={'burgerMenuListItem'} onClick={closeBurgerMenu}><Link className={'burgerMenuLink'} to={"/tariffs"}>Тарифы</Link></li>
                <li className={'burgerMenuListItem'} onClick={closeBurgerMenu}><Link className={'burgerMenuLink'} to={"/faq"}>FAQ</Link></li>
            </ul>
            <div className={`burgerMenuButtons`}>
                <Link to={"/register"} className={'burgerMenuRegisterLink'} onClick={closeBurgerMenu}>Зарегистрироваться</Link>
                <Link to={"/login"} className={'burgerMenuLoginLink'} onClick={closeBurgerMenu}>Войти</Link>
            </div>
        </Menu>
    )
}
