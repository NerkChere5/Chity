// 21.08.2022




import {Component} from '../Component.js';




class Menu extends Component {
  static url = import.meta.url;
  
  
  
  
  _burger = null;
  _items_groups = [];
  _menu__container = null;
  _menu_items__needDropdownList = [];
  _menu_logo = null;
  _overlay = null;
  
  
  menu__items = [];
  
  
  async _build() {
    await super._build();
    
    this._burger = this._body.querySelector('.burger');
    this._menu_container = this._body.querySelector('.container');
    this._menu_logo = this._body.querySelector('.logo');
    this._overlay = this._body.querySelector('.overlay');
    
    this.refrash();
    
    setTimeout(() => this._overlay.setAttribute('_animation', ''), 10);
    
    this._root.addEventListener('pointerdown', this._on__link_down.bind(this));
    this._root.addEventListener('pointerdown', this._on__menu_item_nav_down.bind(this));
    this._root.addEventListener('pointerdown', this._on__toggle_down.bind(this));
    this._root.addEventListener('pointerdown', this._on__back_down.bind(this));
    
    
    window.addEventListener('resize', () => {
      if (document.documentElement.clientWidth < 750 || !this._burger.hasAttribute('_active')) return;
      // ?
      this._close__mobile_menu();
    });
  }
  
  
  
  
  _on__toggle_down(event) {
    if (!event.target.hasAttribute('toggle')) return;
    
    this._burger.hasAttribute('_active') ? this._close__mobile_menu() : this._open__mobile_menu();
  }
  
  
  _on__menu_item_nav_down(event) {
    if (!event.target.hasAttribute('dropdownlist') || !this._burger.hasAttribute('_active')) return;
    
    let nav_list = event.target.closest('.menu__item').querySelector('.menu__list');
    nav_list.setAttribute('_active', true);
  }
  
  
  _on__back_down(event) {
    if (!event.target.classList.contains('back')) return;
    
    event.target.closest('.menu__list').removeAttribute('_active');
  }
  
  
  _on__link_down(event) {
    let value = event.target.dataset.url || event.target.parentElement.dataset.url;
    
    if (!value || event.target.classList.contains('menu__list')) return;
    if (document.documentElement.clientWidth < 750 && (event.target.classList.contains('menu__item') || event.target.classList.contains('menu__item_title'))) return;
    
    location += value;
    
    if (this._burger.hasAttribute('_active')) this._close__mobile_menu();
  }
  
  
  _menu__build(object) {
    if (object.length) {
      let items = [];
      
      for (let child of object) {
        items.push(this._menu__build(child));
      }
      
      return items;
    }
    else {
      let menu_item = this._template.querySelector('.' + object.type).cloneNode(true);
      
      for (let key in object) {
        if (Array.isArray(object[key])) {
          if (menu_item.classList.contains('menu__item')) {
            let list = this._template.querySelector('.menu__list').cloneNode(true);
            
            list.append(...this._menu__build(object[key]));
            menu_item.append(list);
            
            this._menu_items__needDropdownList.push(menu_item);
          }
          else {
            menu_item.append(...this._menu__build(object[key]));
          }
        }
        else {
          this._menu_item__set(menu_item, key, object);
        }
      }
      
      return this._menu_item__check(menu_item);
    }
  }
  
  
  _menu_item__check(item) {
    if (item.classList.contains('menu__logo')) {
      this._menu_logo.append(item);
    }
    else if (item.classList.contains('menu__item')) {
      this._menu_container.append(item);
    }
    
    for (let menu_item__needDropdownList of this._menu_items__needDropdownList) {
      let title = menu_item__needDropdownList.querySelector('.menu__item_title');
      
      if (!title.hasAttribute('dropdownlist')) {
        title.setAttribute('dropdownlist', true);
      }
    }
    
    return item;
  }
  
  
  _menu_item__set(menu_item, key, object) {
    if (key == 'caption') {
      if (menu_item.classList.contains('menu__item') || (menu_item.classList.contains('menu__category') && !!object.caption)) {
        let menu__item_title = this._template.querySelector('.menu__item_title').cloneNode(true);
      
        menu__item_title.textContent = object.caption;
        menu_item.append(menu__item_title);
      }
      else {
        menu_item.textContent = object.caption;
      }
    }
    else if (key == 'type') return;
    else if (key == 'picture' && !!object.picture) {
      let image = this._template.querySelector('img').cloneNode(true);
      
      image.setAttribute('src', object.picture);
      menu_item.append(image)
    }
    else {
      menu_item.setAttribute('data-' + key, object[key]);
    }
  }
  
 
  _menu_items__defined(element) {
    if (element?.tagName == 'X-OBJECT' && element?.children?.length) {
      let item = {};
      
      for (let child of element.children) {
        let key = child.getAttribute('key');
        
        if (!key) continue;
        
        item[key] = this._menu_items__defined(child);
      }
      
      return item;
    }
    else if (element?.children?.length) {
      let item = [];
      
      for (let child of element.children) {
        item.push(this._menu_items__defined(child));
      }
      
      return item;
    }
    else {
      return element?.textContent;
    }
  }
  
  
  _open__mobile_menu() {
    this._burger.setAttribute('_active', true);
    this._menu_container.setAttribute('_active', true);
    this._overlay.setAttribute('_active', true);
  }
  
  
  _close__mobile_menu() {
    this._burger.removeAttribute('_active');
    this._menu_container.removeAttribute('_active');
    this._overlay.removeAttribute('_active');
    
    let menu__lists = this._body.querySelectorAll('.menu__list');
    
    for (let menu__list of menu__lists) {
      menu__list.removeAttribute('_active');
    }
  }
  
  
  
  
  refrash() {
    this.menu__items = [];
    this.menu__items = this._menu_items__defined(this);
    this._menu__build(this.menu__items);
  }
}

Menu.init();
