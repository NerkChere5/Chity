import {Component} from '../Component.js';


export class Edit extends Component {
    static _url = import.meta.url;


    _button_clear = null;
    _button_oversee = null;
    _cap_default = '•';
    _cap_use = true;
    _input = null;
    _oversee = false;
    _root = null;
    _selection_begin = 0;
    _selection_end = 0;
    _value = '';

    cap = this._cap_default;


    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value + '';
        // this._input.value = this._value;

        // if (!this._cap_use) return;

        // this.refresh();
        this.value__display();
    }


    async _build() {
        await super._build();

        this._button_clear = this._shadow.querySelector('.button_clear');
        this._button_oversee = this._shadow.querySelector('.button_oversee');
        this._input = this._shadow.querySelector('.input');
        this._root = this._shadow.querySelector('.root');

        this.addEventListener('pointerdown', this._on_pointerDown.bind(this));
        this._button_oversee.addEventListener('pointerdown', this._button_oversee__on_pointerDown.bind(this));
        this._button_clear.addEventListener('pointerdown', this._button_clear__on_pointerDown.bind(this));
        this._input.addEventListener('beforeinput', this._input__on_beforeInput.bind(this));
        this._input.addEventListener('blur', this._input__on_blur.bind(this));
        this._input.addEventListener('focus', this._input__on_focus.bind(this));
        this._input.addEventListener('input', this._input__on_input.bind(this));

        this.attributes__apply();
    }

    _button_clear__on_pointerDown() {
        this._value = '';
        this._input.value = '';
        this.removeAttribute('_notEmpty');
    }

    _button_oversee__on_pointerDown() {
        this.oversee__toggle();
    }

    _input__on_beforeInput() {
        this._selection_begin = this._input.selectionStart;
        this._selection_end = this._input.selectionEnd;
    }

    _input__on_blur() {
        this.removeAttribute('_focused');
    }

    _input__on_focus() {
        this.setAttribute('_focused', '');
    }

    _input__on_input(event) {
        // let value_part_left = this._value.slice(0, this._selection_begin);
        // let value_part_right = this._value.slice(this._selection_end);

        // // console.log(this._selection_begin, this._selection_end, '|', this._input.selectionStart, '|', value_part_left, value_part_right)

        // if (!event.data && this._selection_begin == this._selection_end) {
        //     if (this._selection_begin == this._input.selectionStart) {
        //         value_part_right = value_part_right.slice(1);
        //     }
        //     else {
        //         value_part_left = value_part_left.slice(0, -1);
        //     }
        // }

        // this._value = value_part_left + (event.data || '') + value_part_right;

        // console.log(event.data, this._value)

        this._value__change(event.data);

        this.value__display();
    }

    _on_pointerDown() {
        setTimeout(() => this.focus());
    }

    _value__change(data) {
        let value_part_left = this._value.slice(0, this._selection_begin);
        let value_part_right = this._value.slice(this._selection_end);

        if (!data && this._selection_begin == this._selection_end) {
            if (this._selection_begin == this._input.selectionStart) {
                value_part_right = value_part_right.slice(1);
            }
            else {
                value_part_left = value_part_left.slice(0, -1);
            }
        }

        this._value = value_part_left + (data || '') + value_part_right;

        // console.log(data, this._value)
    }


    attributes__apply() {
        this._cap_use = this.hasAttribute('cap');
        this.cap = (this.getAttribute('cap') ?? this.cap)?.[0] || this._cap_default;
    }

    blur() {
        this._input.blur();
    }

    focus() {
        this._input.focus();
    }

    // refresh() {
    //     // if (this._value) {
    //     //     this.setAttribute('_notEmpty', '');
    //     // }

    //     this.attribute__set('_notEmpty', !!this._value);

    //     if (!this._cap_use) return;

    //     let selection_begin = this._input.selectionStart;
    //     this._input.value = Array(this._value.length + 1).join(this.cap);
    //     this._input.selectionEnd = selection_begin;
    //     this._input.selectionStart = selection_begin;
    // }

    oversee__set(oversee) {
        this._oversee = oversee;
        this.attribute__set('_oversee', this._oversee);
        this.value__display();

        // if (this._oversee) {
        //     this._input.value = this._value;
        // }
        // else {
        //     this._input.value = Array(this._value.length + 1).join(this.cap);
        // }
    }

    oversee__toggle() {
        this.oversee__set(!this._oversee);
    }

    value__display() {
        this.attribute__set('_notEmpty', !!this._value);

        // this._input.value = '';

        if (this._oversee || !this._cap_use) {
            this._input.value = this._value;
        }
        else {
            this._input.value = Array(this._value.length + 1).join(this.cap);
        }

        // this._input.selectionStart = this._selection_begin;
        // this._input.selectionEnd = this._selection_begin;
    }

    // value__hide() {
    //     // if (!this._cap_use) return;

    //     this._input.value = Array(this._value.length + 1).join(this.cap);
    // }

    // value__show() {
    //     this._input.value = this._value;
    // }
}


Edit.init();
