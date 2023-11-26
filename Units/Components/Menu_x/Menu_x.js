import '../../../Api/Components/Menu/Menu.js';
import {Component} from '../../../Api/Components/Component.js';




class Menu_x extends Component {
    static url = import.meta.url;


    _menu = null;


    async _build() {
        await super._build();

        this._menu = this._shadow.querySelector('x-menu');


        await this._menu._built;

        this._menu__init();
    }


    _menu__init() {
        this._menu.menu__items = [
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
                                "url": "../search_people",
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
                "caption": "Документы",
                "items": [
                    {
                        "caption": "",
                        "items": [
                            {
                                "caption": "Поиск документов",
                                "url": "../search_docs",
                                "type": "menu__category_item"
                            },
                            {
                                "caption": "Внести документ в реестр",
                                "url": "../add_doc",
                                "type": "menu__category_item"
                            }
                        ],
                        "type": "menu__category"
                    }
                ],
                "type": "menu__item"
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

        // this._menu.refrash();
    }
}


Menu_x.init();
