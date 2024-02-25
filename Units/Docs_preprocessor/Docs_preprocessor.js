import {Rest} from '../../Api/Units/Rest/Rest.js';




export class Docs_preprocessor {
    _rest = new Rest(import.meta.url + '/../Docs_preprocessor.php');


    async _getData(method, request_body) {
        let data = await this._rest.call(method, request_body);

        return data;
    }

    search_docs() {
        let request_body = {
            doc_date: arguments[0]._value || '%',
            doc_num: arguments[1]._value || '%',
            doc_type: arguments[2]._value || '%',
            doc_organ: arguments[3]._value || '%',
            doc_name: arguments[4]._value || '%',
            doc_num_public: arguments[5]._value || '%',
            doc_date_public: arguments[6]._value || '%'
        }

        return this._getData('get_docs', request_body)
    }

    add_doc() {
        let request_body = {
            doc_date: arguments[0]._value,
            doc_num: arguments[1]._value,
            doc_type: arguments[2]._value,
            doc_organ: arguments[3]._value,
            doc_name: arguments[4]._value
        }

        return this._getData('add_doc', request_body)
    }
}
