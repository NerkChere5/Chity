import '../../../../Api/Components/Menu/Menu.js';
// import {Auth} from '../Units/Modules/Auth/Auth.js';


let menu = document.querySelector('x-menu');

menu.menu__items = [
    {
        "caption": "ЗАО \"ЧИТЫ\"",
        "type": "menu__logo",
        "url": "http://localhost/Apps/Chity"
    },
    {
        "caption": "Рабочий стол",
        "items": [
            {
                "items": [
                    {
                        "caption": "Создать документы",
                        "url": "./create_docs",
                        "type": "menu__category_item"
                    },
                    {
                        "caption": "Повестка",
                        "url": "./news",
                        "type": "menu__category_item"
                    },
                    {
                        "caption": "Ежедневник",
                        "url": "./calendar",
                        "type": "menu__category_item"
                    }
                ],
                "type": "menu__category"
            }
        ],
        "type": "menu__item",
        "url": "http://localhost/Apps/Chity"
    },
    {
        "caption": "Управление",
        "items": [
            {
                "caption": "Отчёты",
                "items": [
                    {
                        "caption": "Активность",
                        "url": "./reports/activity",
                        "type": "menu__category_item"
                    },
                    {
                        "caption": "Сотрудники",
                        "url": "./reports/people",
                        "type": "menu__category_item"
                    }
                ],
                "type": "menu__category",
                "url": "./reports"
            }
        ],
        "type": "menu__item"
    },
    {
        "caption": "База данных",
        "items": [
            {
                "caption": "",
                "items": [
                    {
                        "caption": "Поиск человека",
                        "url": "./serch_people",
                        "type": "menu__category_item"
                    },
                    {
                        "caption": "Архив",
                        "url": "./library",
                        "type": "menu__category_item"
                    }
                ],
                "type": "menu__category"
            }
        ],
        "type": "menu__item",
        "url": "./Units/Sections/Db"
    },
    {
        "caption": "User",
        "items": [
            {
                "items": [
                    {
                        "caption": "Профиль",
                        "url": "./profile",
                        "type": "menu__category_item"
                    },
                    {
                        "caption": "Настройки",
                        "url": "./setting",
                        "type": "menu__category_item"
                    },
                    {
                        "caption": "Выйти",
                        "url": "./logout",
                        "type": "menu__category_item"
                    }
                ],
                "type": "menu__category"
            }
        ],
        "type": "menu__item",
        "url": "./profile"
    }
];
// console.log(Date.now())
// menu.refrash();
menu.addEventListener('on__link_down', (event) => console.log(event.detail.name_module));


// let auth = new Auth();
// let isAuth = await auth.isAuth();

// if (!isAuth) enter();




// function enter() {
//   location = 'http://localhost/Apps/Chity/';
// }
