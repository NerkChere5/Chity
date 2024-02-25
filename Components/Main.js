import {Menu} from '../Api/Components/Menu/Menu.js';
import {Manager} from '../Units/Manager/Manager.js';


export class Main {
    static _manager = new Manager();
    static _menu = new Menu();


    static async init(token) {
        if (!localStorage.client_data || !JSON.parse(localStorage.client_data)) {
            await this._manager.client__init(token);
        }

        this._menu_send(JSON.parse(localStorage.client_data))
    }

    static _menu_send(data) {
        this._menu.menu__items = data;

        document.body.prepend(this._menu);
    }
}
