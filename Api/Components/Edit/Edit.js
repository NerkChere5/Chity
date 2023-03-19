import {Component} from '../Component.js';




export class Edit extends Component {
    static url = import.meta.url;



    
    _input = null;
    _placeholder = null;
    _show_button = null;
    _status_container = null;
    



    get _value() {
        return this._input.value;
    }
    
    get _status_value() {
        return !!this._input.value;
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
    }
    
    
    _show_button__on_pointerDown() {
        if (this.hasAttribute('_show')) {
            this.removeAttribute('_show');
            this.setAttribute('type', 'password');
        }
        else {
            this.setAttribute('_show', '');
            this.setAttribute('type', 'text');
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




    toggle_value() {
        this.setAttribute('_status', this._status_value);
    }


    refrash() {
        this._placeholder.textContent = this.getAttribute('placeholder');
        
        this._input.setAttribute('type', this.getAttribute('type'));
    }
}




Edit.init();
