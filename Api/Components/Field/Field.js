import '../Edit/Edit.js'
import {Component} from '../Component.js';


export class Field extends Component {
    static _url = import.meta.url;


    _input = null;
    _placeholder = null;
    _status_container = null;


    get _value() {
        return this._input._value;
    }

    get _status_value() {
        return !!this._input._value;
    }


    async _build() {
        await super._build();

        this._input = this._shadow.querySelector('.input');
        this._placeholder = this._shadow.querySelector('.placeholder');
        this._status_container = this._shadow.querySelector('.status');

        this._input.addEventListener('beforeinput', this._input__on_beforeInput.bind(this));
        this._input.addEventListener('blur', this._input__on_blur.bind(this));
        this._input.addEventListener('focus', this._input__on_focus.bind(this));

        this.refrash();
    }

   _input__on_beforeInput(event) {
        if (!event.data) return;

        if (this.hasAttribute('case')) {
            event.preventDefault();

            this._input.value += this._toCase(event.data);
        }

        if (this.hasAttribute('_status')) {
            this.removeAttribute('_status');
        }
    }

    _input__on_blur() {
        if (this._input.value) return;

        this.removeAttribute('_active');
    }

    _input__on_focus() {
        this.setAttribute('_active', '');

        if (this.hasAttribute('_status') && !this._input.value) {
            this.removeAttribute('_status');
        }
    }

    _toCase(string) {
        if (this.getAttribute('case') == 'upper') {
            return string.toUpperCase();
        }
        else {
            return string.toLowerCase();
        }
    }


    attribute__apply() {
        if (this.hasAttribute('button_clear')) {
            this._input.setAttribute('button_clear', '');
        }
        if (this.hasAttribute('button_oversee')) {
            this._input.setAttribute('button_oversee', '');
        }
        if (this.hasAttribute('cap')) {
            this._input.setAttribute('cap', (this.getAttribute('cap') || ''));
        }
    }

    toggle__status_value() {
        this.setAttribute('_status', this._status_value);
    }

    refrash() {
        this._placeholder.textContent = this.getAttribute('placeholder');
        this._input.setAttribute('type', this.getAttribute('type'));

        this.attribute__apply();
    }
}


Field.init();
