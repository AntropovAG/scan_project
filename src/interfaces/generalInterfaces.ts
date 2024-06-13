interface ErrorMessage {
    error: boolean;
    message: string;
}

export interface ErrorStates {
    inn: ErrorMessage;
    documentNumber: ErrorMessage;
    dates: ErrorMessage;
}

export interface BurgerMenuInterface {
    isOpen: boolean;
}