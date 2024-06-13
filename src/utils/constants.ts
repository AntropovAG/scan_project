export const carouselItems = [
    {
        img: './carousel_img01.svg',
        alt: 'watch image',
        text: 'Высокая и оперативная скорость обработки заявки'
    },
    {
        img: './carousel_img02.svg',
        alt: 'search image',
        text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'
    },
    {
        img: './carousel_img03.svg',
        alt: 'shield image',
        text: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству'
    },
    {
        img: './carousel_img01.svg',
        alt: 'watch image',
        text: 'Безопасность и конфиденциальность данных'
    },
    {
        img: './carousel_img02.svg',
        alt: 'search image',
        text: 'Полная информация о компании в одном месте'
    }
];

export const tariffs = [
    {
        name: 'Beginner',
        icon: './beginner_icon.svg',
        description: 'Для небольшого исследования',
        currentPrice: '799',
        oldPrice: '1200',
        discountDescription: 'или 150 Р/мес. при рассрочке на 24 мес.',
        included: [
            'Безлимитная история запросов',
            'Безопасная сделка',
            'Поддержка 24/7'
        ],
        color: 'orange'
    },
    {
        name: 'Pro',
        icon: './pro_icon.svg',
        description: 'Для HR и фрилансеров',
        currentPrice: '1299',
        oldPrice: '2600',
        discountDescription: 'или 279 ₽/мес. при рассрочке на 24 мес.',
        included: [
            'Все пункты тарифа Beginner',
            'Экспорт истории',
            'Рекомендации по приоритетам'
        ],
        color: 'blue'
    },
    {
        name: 'Business',
        icon: './business_icon.svg',
        description: 'Для корпоративных клиентов',
        currentPrice: '2379',
        oldPrice: '3700',
        discountDescription: null,
        included: [
            'Все пункты тарифа Pro',
            'Безлимитное количество запросов',
            'Приоритетная поддержка'
        ],
        color: 'black'
    },
];

export const BASE_URL = 'https://gateway.scan-interfax.ru';

export const userData = {
    name: 'Антон А.',
    img: './photo_sample.svg'
}

export const articlesImage = {
    src: './card_img.svg',
    alt: 'document image'

}

export const wordsArray = ['слово', 'слова', 'слов'];
export const variantsArray = ['вариант', 'варианта', 'вариантов'];