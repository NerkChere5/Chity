// 18.03.2021

import {Common} from '../../Units/Common.js';
import {Component} from '../Component.js';
import {Draggable} from '../Draggable.js';




export class TrackBar extends Component {
    static _url = import.meta.url;




    _puck = null;
    _track = null;
    _value = 0;
    _value_max = 0;
    _value_min = 0;
    _vertical = false;


    get value() {
        return this._value;
    }

    set value(value) {
        this._value = Common.toRange(Math.round(value), this._value_min, this._value_max);
        let puck__position = this._puck.step * (this._value - this._value_min);
        this._vertical ? this._puck.top__set(puck__position) : this._puck.left__set(puck__position);
    }


    get vertical() {
        return this._vertical;
    }

    set vertical(value) {
        this._vertical = !!value;
        this._puck.axis = this._vertical ? 'y' : 'x';
        this.attribute__set('vertical', this._vertical);
        this._puck.left__set();
        this._puck.top__set();

        this.value = this._value;
    }




    async _build() {
        await super._build();

        this._puck = this._shadow.querySelector('.puck');
        this._track = this._shadow.querySelector('.track');
        this._puck.addEventListener('drag', this._puck__on_drag.bind(this));

        this.attributes__apply();
    }


    _puck__on_drag() {
        let puck__position = this._vertical ? this._puck._position.y : this._puck._position.x;
        this.value = this._value_min + puck__position / this._puck.step;

        this.dispatchEvent(new CustomEvent('value_changed', {bubbles: true}));
    }




    attributes__apply() {
        this.vertical = this.hasAttribute('vertical');
        this.values_range__set(this.attribute_number__get('value_min'), this.attribute_number__get('value_max'));
        this.value = this.attribute_number__get('value') ?? 0;
    }


    values_range__set(value_min, value_max) {
        let puck_length = this._vertical ? this._puck.height_outer__get() : this._puck.width_outer__get();
        let track_length = this._vertical ? this.constructor.height_inner__get(this._track) : this.constructor.width_inner__get(this._track);
        let puck_position_max = track_length - puck_length;

        if (value_max > value_min) {
            this._value_max = value_max;
            this._value_min = value_min;
            this._puck.step = puck_position_max / (this._value_max - this._value_min);
        }
        else {
            this._value_max = puck_position_max;
            this._value_min = 0;
            this._puck.step = 1;
        }

        this.value = this._value;
    }
}




TrackBar.init();
