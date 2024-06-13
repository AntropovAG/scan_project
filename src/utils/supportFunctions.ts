/* eslint-disable @typescript-eslint/no-explicit-any */
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
    return trimmedInput.match(
        /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/
    );
};

//Функция для валидации ИНН из 10 цифр
export const validateInnNumber = (inn: string | number): boolean => {
    let result = false;
    if (typeof inn === "number") {
        inn = inn.toString();
    } else if (typeof inn !== "string") {
        inn = "";
    } else {
        const checkDigit = (inn: string, coefficients: number[]): number => {
            let n = 0;
            for (let i = 0; i < coefficients.length; i++) {
                n += coefficients[i] * parseInt(inn[i]);
            }
            return (n % 11) % 10;
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

export const parceText = (textData: string) => {
    const xml = textData;
    const div = document.createElement("div");
    div.innerHTML = xml;
    const text = div.textContent || div.innerText || "";

    return text.replace(/<\/*?["^"]*["^"]*[^>]*>(>|\$)/g, "");
};

//В зависимости от числа возвращаем текст с верным окончанием (варианты текста передаём в виде массива строк)
export const normalizeCountText = (number: number, words_arr: string[]) => {
    number = Math.abs(number);
    if (Number.isInteger(number)) {
        const options = [2, 0, 1, 1, 1, 2];
        return words_arr[
            number % 100 > 4 && number % 100 < 20
                ? 2
                : options[number % 10 < 5 ? number % 10 : 5]
        ];
    }
    return words_arr[1];
};

export const sumObjectsInArray = (array: any[], key: string) => {
    return array.reduce((acc, item) => acc + item[key], 0);
};

//Вынес формирование данных для запроса в отдельную функцию
export const formRequestData = (
    formData: FormData,
    startDate: Date | null,
    endDate: Date | null,
    inn: string
) => {
    return {
        issueDateInterval: {
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
        },
        searchContext: {
            targetSearchEntitiesContext: {
                targetSearchEntities: [
                    {
                        type: "company",
                        sparkId: null,
                        entityId: null,
                        inn: inn,
                        maxFullness: formData.get("fullness") === "on" ? true : false,
                        inBusinessNews: formData.get("context") === "on" ? true : false,
                    },
                ],
                onlyMainRole: formData.get("role") === "on" ? true : false,
                tonality: formData.get("tonality") as string,
                onlyWithRiskFactors:
                    formData.get("riskFactors") === "on" ? true : false,
                riskFactors: {
                    and: [],
                    or: [],
                    not: [],
                },
                themes: {
                    and: [],
                    or: [],
                    not: [],
                },
            },
            themesFilter: {
                and: [],
                or: [],
                not: [],
            },
        },
        searchArea: {
            includedSources: [],
            excludedSources: [],
            includedSourceGroups: [],
            excludedSourceGroups: [],
        },
        attributeFilters: {
            excludeTechNews: formData.get("techNews") === "on" ? false : true,
            excludeAnnouncements:
                formData.get("announcement") === "on" ? false : true,
            excludeDigests: formData.get("summary") === "on" ? false : true,
        },
        similarMode: "duplicates",
        limit: parseInt(formData.get("documentNumber") as string),
        sortType: "sourceInfluence",
        sortDirectionType: "asc",
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"],
    };
};
