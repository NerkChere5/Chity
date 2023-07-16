// 08.01.2023

import {Common} from '../Units/Common.js';
import {Component} from './Component.js';
import {Vector_2d} from '../Units/Vector_2d.js';




export class Draggable extends Component {
    static handle_selector = '[__draggable__handle]';




    _disabled = false;
    _handles = [];
    _pointer_base = new Vector_2d();
    _position = new Vector_2d();
    _position_base = new Vector_2d();
    _position_max = new Vector_2d();
    _position_relative = new Vector_2d();
    _unbounded = false;


    axis = '';
    step = 1;


    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = value;
        this.attribute__set('disabled', this._disabled);
    }


    get unbounded() {
        return this._unbounded;
    }

    set unbounded(value) {
        this._unbounded = value;
        this.attribute__set('unbounded', this._unbounded);
    }




    async _build() {
        await super._build();

        this.addEventListener('lostpointercapture', this._on_lostPointerCapture.bind(this));
        this.addEventListener('pointerdown', this._on_pointerDown.bind(this));
        this.addEventListener('touchmove', this._on_touchMove, {passive: false});

        this.attributes__apply();
        this.handles__define();
    }


    _on_lostPointerCapture() {
        this.drag__stop();

        this.dispatchEvent(new CustomEvent('drag_stop', {bubbles: true}));
    }


    _on_pointerDown(event) {
        if (this._disabled) return;

        block: if (this._handles.length) {
            let target_path = this.constructor.path__get(event.target, this);

            for (let handle of this._handles) {
                if (target_path.includes(handle)) break block;
            }

            return;
        }

        this._position_max.x = this.constructor.width_inner__get(this.offsetParent) - this.width_outer__get();
        this._position_max.y = this.constructor.height_inner__get(this.offsetParent) - this.height_outer__get();
        this._pointer_base.init(event.pageX, event.pageY);
        this._position_base.init(this.left__get(), this.top__get());
        this._position.init_vector(this._position_base);
        this._position_relative.reset();
        this.addEventListener('pointermove', this._on_pointerMove);
        this.setPointerCapture(event.pointerId);

        event.stopPropagation();
        this.dispatchEvent(new CustomEvent('drag_start', {bubbles: true}));
    }


    _on_pointerMove(event) {
        this._position.x = this._position_base.x + Math.round((event.pageX - this._pointer_base.x) / this.step) * this.step;
        this._position.y = this._position_base.y + Math.round((event.pageY - this._pointer_base.y) / this.step) * this.step;

        if (!this._unbounded) {
            this._position.x = Common.toRange(this._position.x, 0, this._position_max.x);
            this._position.y = Common.toRange(this._position.y, 0, this._position_max.y);
        }

        if (this.axis != 'x') {
            this._position_relative.y = this._position.y - this._position_base.y;
            this.top__set(this._position.y);
        }

        if (this.axis != 'y') {
            this._position_relative.x = this._position.x - this._position_base.x;
            this.left__set(this._position.x);
        }

        this.attribute__set('_drag', true);

        this.dispatchEvent(new CustomEvent('drag', {bubbles: true}));
    }


    _on_touchMove(event) {
        event.preventDefault();
    }




    attributes__apply() {
        this._disabled = this.hasAttribute('disabled');
        this._unbounded = this.hasAttribute('unbounded');
        this.axis = this.getAttribute('axis') ?? this.axis;
        this.step = this.attribute_number__get('step') ?? this.step;
    }


    drag__stop() {
        this.attribute__set('_drag');
        this.removeEventListener('pointermove', this._on_pointerMove);
    }


    handles__define() {
        let handles = this.querySelectorAll(this.constructor.handle_selector);
        this._handles.length = 0;

        for (let handle of handles) {
            let handle_path = this.handle.path__get(this);
            let sameInstance = handle_path.find((item) => item instanceof this.constructor);

            if (sameInstance) continue;

            this._handles.push(handle);
        }
    }
}




Draggable.init();
