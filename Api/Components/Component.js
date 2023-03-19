// 25.12.2020

export class Component extends HTMLElement {
    static _dom_promise = null;
    static _url_css = '';
    static _url_html = '';


    static attribute_sync = 'sync';
    static css = true;
    static html = true;
    static tag_prefix = 'x';
    static template_selector = 'template';
    static url = '';




    _built = this._build();
    _shadow = null;
    _template = null;




    static async _dom_promise__create() {
        let template = document.createElement('template');

        if (this._url_html) {
            template.innerHTML = await (await fetch(this._url_html)).text();
        }

        if (this._url_css) {
            let link = document.createElement('link');
            link.href = this._url_css;
            link.rel = 'stylesheet';
            link.setAttribute(this.attribute_sync, true);
            template.content.prepend(link);
        }

        return template.content;
    }




    // static attribute__get(element, attribute_name) {
    //     let attribute_value = element.getAttribute(attribute_name);

    //     if (attribute_value == null) {
    //         return null;
    //     }
    //     else if (attribute_value == '') {
    //         return true;
    //     }

    //     let attribute_value_num = parseFloat(attribute_value);

    //     if (!isNaN(attribute_value_num)) {
    //         attribute_value = attribute_value_num;
    //     }

    //     return attribute_value;
    // }


    static attribute__set(element, attribute_name, attribute_value = null) {
        if (!attribute_value && attribute_value !== 0 && attribute_value !== '') {
            element.removeAttribute(attribute_name);

            return;
        }

        if (attribute_value === true) {
            attribute_value = '';
        }

        element.setAttribute(attribute_name, attribute_value);
    }


    // static attribute_boolean__get(element, attribute_name) {
    //     return element.hasAttribute(attribute_name);
    // }


    static attribute_number__get(element, attribute_name) {
        let attribute_value = element.getAttribute(attribute_name);
        let attribute_value_num = parseFloat(attribute_value);

        if (isNaN(attribute_value_num)) return null;

        return attribute_value_num;
    }


    static css__get(element, prop_name) {
        return getComputedStyle(element)[prop_name];
    }


    static css_num__get(element, prop_name) {
        let prop_value = this.css__get(...arguments);
        let prop_value_num = parseFloat(prop_value);

        return isNaN(prop_value_num) ? prop_value : prop_value_num;
    }


    static height_inner__get(element) {
        return element.clientHeight - this.css_num__get(element, 'paddingTop') - this.css_num__get(element, 'paddingBottom');
    }


    static height_inner__set(element, height = null) {
        if (!height && height !== 0) {
            element.style.height = '';

            return;
        }

        let css_height = height;

        if (this.css__get(element, 'boxSizing') == 'border-box') {
            css_height += this.css_num__get(element, 'borderTopWidth') + this.css_num__get(element, 'borderBottomWidth') + this.css_num__get(element, 'paddingTop') + this.css_num__get(element, 'paddingBottom');
        }

        element.style.height = `${css_height}px`;
    }


    static height_outer__get(element) {
        return element.offsetHeight + this.css_num__get(element, 'marginTop') + this.css_num__get(element, 'marginBottom');
    }


    static height_outer__set(element, height = null) {
        if (!height && height !== 0) {
            element.style.height = '';

            return;
        }

        let css_height = height - this.css_num__get(element, 'marginTop') - this.css_num__get(element, 'marginBottom');

        if (this.css__get(element, 'boxSizing') != 'border-box') {
            css_height -= this.css_num__get(element, 'borderTopWidth') + this.css_num__get(element, 'borderBottomWidth') + this.css_num__get(element, 'paddingTop') + this.css_num__get(element, 'paddingBottom');
        }

        css_height = Math.max(css_height, 0);
        element.style.height = `${css_height}px`;
    }


    static init() {
        if (this.url) {
            let url_part = this.url.replace(/\.\w+$/, '');
            this._url_css = this.css ? url_part + '.css' : '';
            this._url_html = this.html ? url_part + '.html' : '';
            this._dom_promise = this._dom_promise__create();
        }

        let tag = this.tag_prefix + '-' + this.name.toLowerCase();
        customElements.define(tag, this);
    }


    static isVisible(element) {
        return element.offsetHeight && element.offsetWidth;
    }


    static left__get(element) {
        if (!element.offsetParent) return 0;

        return element.offsetLeft - this.css_num__get(element, 'marginLeft') - this.css_num__get(element.offsetParent, 'paddingLeft');
    }


    static left__set(element, left = null) {
        if (!left && left !== 0) {
            element.style.left = '';

            return;
        }

        let css_left_prev = this.css_num__get(element, 'left');
        let left_prev = this.left__get(element);

        if (css_left_prev == 'auto') {
            css_left_prev = this.css__get(element, 'position') == 'relative' ? 0 : left_prev;
        }

        let css_left = css_left_prev + left - left_prev;
        element.style.left = `${css_left}px`;
    }


    static path__get(element, root = null) {
        let path = [];
        let aim = element;

        while (aim && aim != root) {
            path.push(aim);
            aim = aim.parentElement;
        }

        path.reverse();

        return path;
    }


    static top__get(element) {
        if (!element.offsetParent) return 0;

        return element.offsetTop - this.css_num__get(element, 'marginTop') - this.css_num__get(element.offsetParent, 'paddingTop');
    }


    static top__set(element, top = null) {
        if (!top && top !== 0) {
            element.style.top = '';

            return;
        }

        let css_top_prev = this.css_num__get(element, 'top');
        let top_prev = this.top__get(element);

        if (css_top_prev == 'auto') {
            css_top_prev = this.css__get(element, 'position') == 'relative' ? 0 : top_prev;
        }

        let css_top = css_top_prev + top - top_prev;
        element.style.top = `${css_top}px`;
    }


    static width_inner__get(element) {
        return element.clientWidth - this.css_num__get(element, 'paddingLeft') - this.css_num__get(element, 'paddingRight');
    }


    static width_inner__set(element, width = null) {
        if (!width && width !== 0) {
            element.style.width = '';

            return;
        }

        let css_width = width;

        if (this.css__get(element, 'boxSizing') == 'border-box') {
            css_width += this.css_num__get(element, 'borderLeftWidth') + this.css_num__get(element, 'borderRightWidth') + this.css_num__get(element, 'paddingLeft') + this.css_num__get(element, 'paddingRight');
        }

        element.style.width = `${css_width}px`;
    }


    static width_outer__get(element) {
        return element.offsetWidth + this.css_num__get(element, 'marginLeft') + this.css_num__get(element, 'marginRight');
    }


    static width_outer__set(element, width = null) {
        if (!width && width !== 0) {
            element.style.width = '';

            return;
        }

        let css_width = width - this.css_num__get(element, 'marginLeft') - this.css_num__get(element, 'marginRight');

        if (this.css__get(element, 'boxSizing') != 'border-box') {
            css_width -= this.css_num__get(element, 'borderLeftWidth') + this.css_num__get(element, 'borderRightWidth') + this.css_num__get(element, 'paddingLeft') + this.css_num__get(element, 'paddingRight');
        }

        css_width = Math.max(css_width, 0);
        element.style.width = `${css_width}px`;
    }




    async _build() {
        if (!this.constructor._dom_promise || this._shadow) return;

        let dom = (await this.constructor._dom_promise).cloneNode(true);

        this._shadow = this.attachShadow({mode: 'closed'});
        this._template = dom.querySelector(this.constructor.template_selector)?.content || null;
        this._shadow.append(dom);

        let elements = this._shadow.querySelectorAll(`[${this.constructor.attribute_sync}]`);

        if (!elements.length) return;

        let promise_executor = (element, fulfill, reject) => {
            element.addEventListener('error', reject);
            element.addEventListener('load', fulfill);
        };
        let promises = [...elements].map((element) => new Promise(promise_executor.bind(null, element)));

        await Promise.allSettled(promises);
    }


    // async _build() {
    //     if (!this.constructor._dom_promise || this._shadow) {
    //         await this._init();

    //         return;
    //     }

    //     let dom = (await this.constructor._dom_promise).cloneNode(true);

    //     this._shadow = this.attachShadow({mode: 'closed'});
    //     this._template = dom.querySelector(this.constructor.template_selector)?.content || null;
    //     this._shadow.append(dom);

    //     let elements = this._shadow.querySelectorAll(`[${this.constructor.attribute_sync}]`);

    //     if (elements.length) {
    //         let promise_executor = (element, fulfill, reject) => {
    //             element.addEventListener('error', reject);
    //             element.addEventListener('load', fulfill);
    //         };
    //         let promises = [...elements].map((element) => new Promise(promise_executor.bind(null, element)));

    //         await Promise.allSettled(promises);
    //     }

    //     await this._init();
    // }


    // async _init() {}




    // attribute__get(attribute_name) {
    //     return this.constructor.attribute__get(this, ...arguments);
    // }


    attribute__set(attribute_name, attribute_value = null) {
        return this.constructor.attribute__set(this, ...arguments);
    }


    attribute_number__get(element, attribute_name) {
        return this.constructor.attribute_number__get(this, ...arguments);
    }


    css__get(prop_name) {
        return this.constructor.css__get(this, ...arguments);
    }


    css_num__get(prop_name) {
        return this.constructor.css_num__get(this, ...arguments);
    }


    dispatchEvent_async(event) {
        setTimeout(() => this.dispatchEvent(event));
    }


    height_inner__get() {
        return this.constructor.height_inner__get(this);
    }


    height_inner__set(height = null) {
        return this.constructor.height_inner__set(this, ...arguments);
    }


    height_outer__get() {
        return this.constructor.height_outer__get(this);
    }


    height_outer__set(height = null) {
        return this.constructor.height_outer__set(this, ...arguments);
    }


    isVisible() {
        return this.constructor.isVisible(this);
    }


    left__get() {
        return this.constructor.left__get(this);
    }


    left__set(left = null) {
        return this.constructor.left__set(this, ...arguments);
    }


    path__get(root = null) {
        return this.constructor.path__get(this, ...arguments);
    }


    top__get() {
        return this.constructor.top__get(this);
    }


    top__set(top = null) {
        return this.constructor.top__set(this, ...arguments);
    }


    width_inner__get() {
        return this.constructor.width_inner__get(this);
    }


    width_inner__set(width = null) {
        return this.constructor.width_inner__set(this, ...arguments);
    }


    width_outer__get() {
        return this.constructor.width_outer__get(this);
    }


    width_outer__set(width = null) {
        return this.constructor.width_outer__set(this, ...arguments);
    }
}




Component.init();
