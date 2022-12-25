// 18.03.2021




import {Component} from '../Component.js';




export class TrackBar extends Component {
  static url = import.meta.url;
  
  
  
  
  _thumb = null;
  _thumb__on_pointerMove = this._thumb__on_pointerMove.bind(this);
  _thumb__pointer_coord = 0;
  _thumb__position = 0;
  _thumb__position_max = 0;
  _thumb__position_step = 0;
  _value = 0;
  _value_max = 0;
  _value_min = 0;
  _vertical = false;
  
  
  
  
  get value() {
    return this._value;
  }
  
  set value(value) {
    value = value || 0;
    value = Math.min(Math.max(Math.round(value), this._value_min), this._value_max);
    
    let value_old = this._value;
    this._value = value;
    this._body.style.setProperty('--_thumb__position', this._thumb__position_step * (this._value - this._value_min));
  }
  
  
  
  
  async _build() {
    await super._build();
    
    this._thumb = this._body.querySelector('.thumb');
    this._thumb.addEventListener('lostpointercapture', this._thumb__on_lostPointerCapture.bind(this));
    this._thumb.addEventListener('pointerdown', this._thumb__on_pointerDown.bind(this));
    this._thumb.addEventListener('touchmove', (event) => event.preventDefault(), {passive: false});
    
    this.refresh();
  }
  
  
  _thumb__on_lostPointerCapture() {
    this._thumb.removeEventListener('pointermove', this._thumb__on_pointerMove);
  }
  
  
  _thumb__on_pointerDown(event) {
    this._thumb__pointer_coord = this._vertical ? event.pageY : event.pageX;
    this._thumb__position = +this._body.style.getPropertyValue('--_thumb__position');
    this._thumb.addEventListener('pointermove', this._thumb__on_pointerMove);
    this._thumb.setPointerCapture(event.pointerId);
  }
  
  
  _thumb__on_pointerMove(event) {
    let thumb__pointer_coord = this._vertical ? event.pageY : event.pageX;
    let thumb__position = this._thumb__position + thumb__pointer_coord - this._thumb__pointer_coord;
    this.value = this._value_min + thumb__position / this._thumb__position_step;
    
    this.dispatchEvent(new CustomEvent('drag'));
  }
  
  
  
  
  refresh() {
    if (!this.constructor.element_isDisplayed(this._body)) return;
    
    this._vertical = this.hasAttribute('vertical');
    this._body.setAttribute('_init', true);
    let track_length = this._vertical ? this._thumb.offsetHeight : this._thumb.offsetWidth;
    this._body.removeAttribute('_init');
    this._thumb__position_max = track_length - (this._vertical ? this._thumb.offsetHeight : this._thumb.offsetWidth);
    
    this._value_min = +this.getAttribute('value_min');
    this._value_max = +this.getAttribute('value_max');
    
    if (this._value_max - this._value_min <= 0) {
      this._value_min = 0;
      this._value_max = this._thumb__position_max;
    }
    
    this._thumb__position_step = this._thumb__position_max / (this._value_max - this._value_min);
    
    this.value = this.value;
  }
}




TrackBar.init();
