import {Rest} from '../Rest/Rest.js';




export class Auth {
    _rest = new Rest(import.meta.url + '/../Auth.php');




    _dropToken() {
        localStorage.removeItem('token');
        // localStorage.removeItem('date_token');
    }


    async _getData(method, request_body) {
        let data = await this._rest.call(method, request_body);

        return data;
    }


    _saveToken(token) {
        if (!token) return;

        // document.cookie = `token=${token}; max-age=26e8`;

        // localStorage.setItem('date_token', Date.now());
        localStorage.setItem('token', token);
    }




    async isAuth() {
        let token = localStorage.token;
        // let date_token = localStorage.date_token;
        
        if (!token) return false;
        
        let status = await this._getData('check_validaty_token', token);
        
        return status.data;
    }


    clear_non_active() {
        this._rest.call('clear_non_active');
    }


    async logIn(name, password) {
        if (!name || !password || localStorage.token) return;

        let user_data = {
            user_name: name,
            user_password: password,
        };

        let response_data = await this._getData('logIn', user_data);
        let token = await response_data.data;

        if (!token) return false;
        
        this._saveToken(token);
        
        return true;
    }


    async logOut() {
        let token = localStorage.token;

        if (!token) return;

        let {data} = await this._getData('logOut', token);
        
        if (!data) return;
        
        this._dropToken();
    }


    logUp(name, password) {
        if (!name || !password) return;

        let user_data = {
            user_name: name,
            user_password: password,
        };

        this._getData('logUp', user_data);
    }
}
