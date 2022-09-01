// 25.12.2020




export class Component extends HTMLElement {
  static _dom_promise = null;
  static _url_css = '';
  static _url_html = '';
  
  
  static attribute_sync = 'sync';
  static body_selector = '.body';
  static css = true;
  static html = true;
  static tag_prefix = 'x';
  static template_selector = 'template';
  static url = '';
  
  
  
  
  _body = null;
  _built = this._build();
  _root = null;
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
  
  
  
  
  static element_isDisplayed(element) {
    return element.offsetHeight && element.offsetWidth;
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
  
  
  
  
  async _build() {
    if (!this.constructor._dom_promise || this._root) return;
    
    let dom = (await this.constructor._dom_promise).cloneNode(true);
    
    this._body = dom.querySelector(this.constructor.body_selector);
    this._template = dom.querySelector(this.constructor.template_selector)?.content || null;
    
    this._root = this.attachShadow({mode: 'closed'});
    this._root.append(dom);
    
    await this._resources__await();
  }
  
  
  async _resources__await() {
    let elements = this._root.querySelectorAll(`[${this.constructor.attribute_sync}]`);
    
    if (!elements.length) return;
    
    let promise_executor = (element, fulfill, reject) => {
      element.addEventListener('error', reject);
      element.addEventListener('load', fulfill);
    };
    let promises = [...elements].map((element) => new Promise(promise_executor.bind(null, element)));
    await Promise.allSettled(promises);
  }
  
  
  
  
  dispatchEvent_async(event) {
    setTimeout(() => this.dispatchEvent(event));
  }
}




Component.init();
