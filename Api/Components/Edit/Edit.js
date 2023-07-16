import {Component} from '../Component.js';
import '../Panel/Panel.js';




export class Edit extends Component {
    static _url = import.meta.url;




    _input = null;
    _placeholder = null;
    _show_button = null;
    _status_container = null;
    _textPssword = '';




    get _value() {
        return this._input.textContent;
    }

    get _type() {
        return this.getAttribute('type') || 'text';
    }

    get _status_value() {
        return !!this._input.textContent;
    }




    async _build() {
        await super._build();

        this._input = this._shadow.querySelector('.input');
        this._placeholder = this._shadow.querySelector('.placeholder');
        this._show_button = this._shadow.querySelector('.show_button');
        this._status_container = this._shadow.querySelector('.status');

        this._input.addEventListener('beforeinput', this._input__on_beforeInput.bind(this));
        this._input.addEventListener('blur', this._input__on_blur.bind(this));
        this._input.addEventListener('focus', this._input__on_focus.bind(this));
        this._show_button.addEventListener('pointerdown', this._show_button__on_pointerDown.bind(this));

        this.refrash();
    }


    _decode_text() {
        this._input.textContent = this._textPssword;
    }


    _encode_text() {
        this._input.textContent = this._input.textContent.replace(/./ig, "•");
    }


   _input__on_beforeInput(event) {
        if (!event.data) return;

        if (!this._input.textContent) {
            this._textPssword = '';
            console.log(1)
        }

        if (this._type == 'password') {
            this._textPssword += event.data;

            if (this.hasAttribute('_show')) return;

            event.preventDefault();
            this._input.textContent += '•';
        }

        if (this.hasAttribute('case')) {
            event.preventDefault();

            this._input.textContent += this._toCase(event.data);
        }

        if (this.hasAttribute('_status')) {
            this.removeAttribute('_status');
        }
    }


    _input__on_blur() {
        if (this._input.textContent) return;

        this.removeAttribute('_active');
    }


     _input__on_focus() {
        this.setAttribute('_active', '');
    }


    _show_button__on_pointerDown() {
        if (this.hasAttribute('_show')) {
            this.removeAttribute('_show');
            this._encode_text();
        }
        else {
            this.setAttribute('_show', '');
            this._decode_text();
        }

        this.refrash();
    }


    _toCase(string) {
        if (this.getAttribute('case') == 'upper') {
            return string.toUpperCase();
        }
        else {
            return string.toLowerCase();
        }
    }




    toggle__status_value() {
        this.setAttribute('_status', this._status_value);
    }


    refrash() {
        this._placeholder.textContent = this.getAttribute('placeholder');

        this._input.setAttribute('_type', this._type);
    }
}




Edit.init();
