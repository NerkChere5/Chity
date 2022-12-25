// 21.03.2021




import {Component} from '../Component.js';
import {TrackBar} from '../TrackBar/TrackBar.js';




class Panel extends Component {
  static url = import.meta.url;
  
  
  
  
  _scroll_x_factor = 0;
  _scroll_y_factor = 0;
  
  
  
  
  get scroll_x() {
    return this._screen.scrollLeft;
  }
  
  set scroll_x(position) {
    this._screen.scrollLeft = Math.round(position);
  }
  
  
  get scroll_y() {
    return this._screen.scrollTop;
  }
  
  set scroll_y(position) {
    this._screen.scrollTop = Math.round(position);
  }
  
  
  
  
  async _build() {
    await super._build();
    
    this._screen = this._body.querySelector('.screen');
    this._scrollBar_x = this._body.querySelector('.scrollBar_x');
    this._scrollBar_y = this._body.querySelector('.scrollBar_y');
    
    await this._scrollBar_x._built;
    await this._scrollBar_y._built;
    
    this._screen.addEventListener('scroll', this._scrollBars_values__refresh.bind(this));
    this._scrollBar_x.addEventListener('drag', this._scrollBar_x__on_drag.bind(this));
    this._scrollBar_y.addEventListener('drag', this._scrollBar_y__on_drag.bind(this));
    
    this.refresh();
  }
  
  
  _scrollBar_x__on_drag() {
    this.scroll_x = this._scrollBar_x.value * this._scroll_x_factor;
  }
  
  
  _scrollBar_y__on_drag() {
    this.scroll_y = this._scrollBar_y.value * this._scroll_y_factor;
  }
  
  
  _scrollBars_values__refresh() {
    this._scrollBar_x.value = this.scroll_x / this._scroll_x_factor;
    this._scrollBar_y.value = this.scroll_y / this._scroll_y_factor;
  }
  
  
  
  
  refresh() {
    if (!this.constructor.element_isDisplayed(this._body)) return;
    
    this._body.setAttribute('_scroll_x', this._screen.clientWidth < this._screen.scrollWidth);
    this._body.setAttribute('_scroll_y', this._screen.clientHeight < this._screen.scrollHeight);
    this._body.setAttribute('_scroll_x', this._screen.clientWidth < this._screen.scrollWidth);
    
    let scroll_x_ratio = this._screen.clientWidth / this._screen.scrollWidth * 100;
    let scroll_y_ratio = this._screen.clientHeight / this._screen.scrollHeight * 100;
    this._scrollBar_x.style.setProperty('--_scrollBar_thumb__length', scroll_x_ratio);
    this._scrollBar_y.style.setProperty('--_scrollBar_thumb__length', scroll_y_ratio);
    this._scrollBar_x.refresh();
    this._scrollBar_y.refresh();
    
    this._scroll_x_factor = (this._screen.scrollWidth - this._screen.clientWidth) / this._scrollBar_x._value_max;
    this._scroll_y_factor = (this._screen.scrollHeight - this._screen.clientHeight) / this._scrollBar_y._value_max;
    this._scrollBars_values__refresh();
  }
}




Panel.init();
