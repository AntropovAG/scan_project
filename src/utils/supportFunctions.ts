import { format } from "date-fns";

export const formatDate = (date: Date | string | null | undefined) =>
    date !== null && date !== undefined
        ? format(new Date(date), "yyyy-MM-dd")
        : "";

export const isPhoneNumber = (input: string) => {
    const trimmedInput = input.trim().replace(/ /g, "");
    return /^\d{0,15}$/.test(trimmedInput) || /^(\+7)/.test(trimmedInput);
};

export const formatPhoneNumber = (input: string) => {
    const trimmedInput = input.trim().replace(/(?!^\+)\D/g, "");
    if (trimmedInput.length < 2) {
        return `${trimmedInput}`;
    }
    if (trimmedInput.length < 3) {
        return `${trimmedInput.slice(0, 2)} ${trimmedInput.slice(2)}`;
    }
    return `${trimmedInput.slice(0, 2)} ${trimmedInput.slice(
        2,
        5
    )} ${trimmedInput.slice(5, 8)} ${trimmedInput.slice(
        8,
        10
    )} ${trimmedInput.slice(10, 12)} ${trimmedInput.slice(12)}`;
};

export const isValidPhoneNumber = (input: string) => {
    const trimmedInput = input.trim().replace(/(?!^\+)\D/g, "");
    console.log('trimmedInput', trimmedInput)
    return trimmedInput.match(/(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/)
};

//Функция для валидации ИНН из 10 цифр
export const validateInnNumber = (inn: string | number): boolean => {
    let result = false;
    if (typeof inn === 'number') {
        inn = inn.toString();
    } else if (typeof inn !== 'string') {
        inn = '';
    }
    else {
        const checkDigit = (inn: string, coefficients: number[]): number => {
            let n = 0;
            for (let i = 0; i < coefficients.length; i++) {
                n += coefficients[i] * parseInt(inn[i]);
            }
            return n % 11 % 10;
        };
        
        const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
        if (n10 === parseInt(inn[9])) {
            result = true;
        }
    }
    return result;
};

export const getAccessToken = (): string | null => {
    const tokenData = localStorage.getItem("tokenData");
    if (tokenData) {
        const { accessToken } = JSON.parse(tokenData);
        return accessToken;
    }
    return null;
};