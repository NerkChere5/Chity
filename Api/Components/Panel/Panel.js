// 21.03.2021

import {Component} from '../Component.js';
import {TrackBar} from '../TrackBar/TrackBar.js';




class Panel extends Component {
    static _url = import.meta.url;




    _display = null;
    _scrollBar_x = null;
    _scrollBar_y = null;
    _scroll_x_factor = 0;
    _scroll_y_factor = 0;


    get scroll_x() {
        return this._display.scrollLeft;
    }

    set scroll_x(value) {
        this._display.scrollLeft = Math.round(value);
    }


    get scroll_y() {
        return this._display.scrollTop;
    }

    set scroll_y(value) {
        this._display.scrollTop = Math.round(value);
    }




    async _build() {
        await super._build();

        this._display = this._shadow.querySelector('.display');
        this._scrollBar_x = this._shadow.querySelector('.scrollBar_x');
        this._scrollBar_y = this._shadow.querySelector('.scrollBar_y');

        await this._scrollBar_x._built;
        await this._scrollBar_y._built;

        this._display.addEventListener('scroll', this._on_scroll.bind(this));
        this._scrollBar_x.addEventListener('value_changed', this._scrollBar_x__on_value_changed.bind(this));
        this._scrollBar_y.addEventListener('value_changed', this._scrollBar_y__on_value_changed.bind(this));

        this.refresh();
    }


    _on_scroll() {
        this._scrollBars_values__refresh();
    }


    _scrollBar_x__on_value_changed() {
        this.scroll_x = this._scrollBar_x.value * this._scroll_x_factor;
    }


    _scrollBar_y__on_value_changed() {
        this.scroll_y = this._scrollBar_y.value * this._scroll_y_factor;
    }


    _scrollBars_values__refresh() {
        this._scrollBar_x.value = this.scroll_x / this._scroll_x_factor;
        this._scrollBar_y.value = this.scroll_y / this._scroll_y_factor;
    }




    refresh() {
        if (!this.isVisible()) return;

        this.attribute__set('_scroll_x', this._display.clientWidth < this._display.scrollWidth);
        this.attribute__set('_scroll_y', this._display.clientHeight < this._display.scrollHeight);
        this.attribute__set('_scroll_x', this._display.clientWidth < this._display.scrollWidth);

        let scroll_x_ratio = this._display.clientWidth / this._display.scrollWidth * 100;
        let scroll_y_ratio = this._display.clientHeight / this._display.scrollHeight * 100;
        this.style.setProperty('--_scrollBar_x_puck__length', scroll_x_ratio);
        this.style.setProperty('--_scrollBar_y_puck__length', scroll_y_ratio);
        this._scrollBar_x.values_range__set();
        this._scrollBar_y.values_range__set();

        this._scroll_x_factor = (this._display.scrollWidth - this._display.clientWidth) / this._scrollBar_x._value_max;
        this._scroll_y_factor = (this._display.scrollHeight - this._display.clientHeight) / this._scrollBar_y._value_max;
        this._scrollBars_values__refresh();
    }
}




Panel.init();
