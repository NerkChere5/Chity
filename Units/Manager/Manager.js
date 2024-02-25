import {Http} from '../../Api/Units/Http.js';
import {Rest} from '../../Api/Units/Rest/Rest.js';


export class Manager extends EventTarget {
    // _esp_state = {};
    _rest = new Rest(`${import.meta.url}/../Manager.php`);


    // esp_url = '';


    // constructor() {
    //     super();

    //     this.init(...arguments);
    // }

    async client__init(token) {
        let data = await this._rest.call('client__init', token);

        localStorage.removeItem('client_data');
        localStorage.setItem('client_data', data);
    }

    // async esp_state__sync(state = {}) {
    //     let request_args = [];

    //     for (let k in state) {
    //         request_args.push(`${k}=${state[k]}`);
    //     }

    //     request_args = request_args.join('&');

    //     let response = await Http.fetch(`${this.esp_url}/state?${request_args}`);

    //     if (!response?.ok) return;

    //     state = await response.json();

    //     for (let k in state) {
    //         this._esp_state[k] = state[k];
    //     }
    // }

    // init({esp_url = ''} = {}) {
    //     this.esp_url = esp_url;
    // }

    // async sensorValues__get(date_begin = null, date_end = null) {
    //     let data = await this._rest.call('sensorValues__get', +date_begin, +date_end);

    //     return data;
    // }
}
