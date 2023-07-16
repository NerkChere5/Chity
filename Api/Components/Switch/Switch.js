import {Component} from '../Component.js';




export class Switch extends Component {
    static _url = import.meta.url;




    _disabled = false;
    _on = false;


    get disabled() {
        return this._disabled;
    }

    set disabled(disabled) {
        this._disabled = !!disabled;
        this.attribute__set('disabled', this._disabled);
    }


    get on() {
        return this._on;
    }

    set on(value) {
        this._on = !!value;
        this.attribute__set('on', this._on);
    }




    async _build() {
        await super._build();

        this.addEventListener('pointerdown', this._on_pointerDown.bind(this));
        this.addEventListener('transitionend', this._on_transitionEnd.bind(this));

        this.attributes__apply();
    }


    _on_pointerDown() {
        if (this.disabled) return;

        this.attribute__set('_transition', true);
        this.toggle();

        this.dispatchEvent(new CustomEvent('toggle'));
    }


    _on_transitionEnd() {
        this.attribute__set('_transition');
    }




    attributes__apply() {
        this._disabled = this.hasAttribute('disabled');
        this._on = this.hasAttribute('on');
    }


    toggle() {
        this.on = !this._on;
    }
}




Switch.init();
