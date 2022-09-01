// 21.08.2022




import {Component} from '../Component.js';




class Menu extends Component {
  static url = import.meta.url;
  
  
  
  
  _burger = null;
  _items_groups = [];
  _menu_container = null;
  _menu_items = {};
  _overlay = null;
  
  
  
  
  async _build() {
    await super._build();
    
    this._burger = this._body.querySelector('.burger');
    this._menu_container = this._body.querySelector('.menu_container');
    this._overlay = this._body.querySelector('.overlay');
    
    this.refrash();
    
    this._root.addEventListener('pointerdown', this._on__menu_item_nav_down.bind(this));
    this._root.addEventListener('pointerdown', this._on__toggle_down.bind(this));
    this._root.addEventListener('pointerup', this._on__back_up.bind(this));
    this._root.addEventListener('pointerup', this._on__link_up.bind(this));
    
    
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
    
    let nav_list = event.target.closest('.menu_item').querySelector('.nav_list');
    nav_list.setAttribute('_active', '');
  }
  
  
  _on__back_up(event) {
    if (!event.target.classList.contains('back')) return;
    
    event.target.closest('.nav_list').removeAttribute('_active');
  }
  
  
  _on__link_up(event) {
    let value = event.target.getAttribute('href');
    
    console.log(value)
    if (!value) return;
    location = value;
    
    if (this._burger.hasAttribute('_active')) this._close__mobile_menu();
  }
  
  
  
  
  _build_menu() {
    for (let key in this._menu_items) {
      if (this._menu_items[key].type == 'group') this._items_groups.push(key);
    }
    
    for (let key in this._menu_items) {
      if (this._menu_items[key].type == 'logo') this._push_logo(key);
      else if (this._menu_items[key].type == 'header') this._push_header(key);
    }
  
  
  
    // for (let key in this._menu_items) {
    //   let item = this._menu_items[key];
      
    //   if (item.type == 'header') this._push_header(key);
    //   else if (item.type == 'logo') this._push_logo(key);
    //   else if (item.type == 'group') this._items_groups.push(key);
    // }
  }
  
  
  _define_image(url, href) {
    let _image = this._template.querySelector('img').cloneNode(true);
    
    _image.setAttribute('src', url);
    _image.setAttribute('href', href);
    
    return _image;
  }
  
  
  _define__menu_items() {
    let menu_items = this._root.querySelector('slot').assignedElements();
  
    for (let item of menu_items) {
      let item_menu = {
        dropdownList: item.dataset.dropdownList ? true : false,
        image: (item.dataset.image != undefined) ? item.dataset.image : false,
        nameGroup: item.dataset.nameGroup,
        // textPosition: item.dataset.textPosition,
        title: item.dataset.title,
        // type: item.dataset.type?.,
        type: (item.dataset.type != undefined) ? item.dataset.type : 'header',
        url: (item.dataset.url != undefined) ? item.dataset.url : '',
        // url: item.dataset.url,
      }
  
      this._menu_items[item.dataset.title] = item_menu;
    }
  }
  
  
  _open__mobile_menu() {
    this._burger.setAttribute('_active', '');
    this._menu_container.setAttribute('_active', '');
    this._overlay.setAttribute('_active', '');
  }
  
  
  _push_group(header, menu_item) {
    let nav_list = this._template.querySelector('.nav_list').cloneNode(true);
    let groups = header.nameGroup.split(',');
    
    menu_item.append(nav_list);
      
    for (let group of groups) {
      let dropdown = this._template.querySelector('.dropdown').cloneNode(true);
      let title = this._template.querySelector('.title').cloneNode(true);
      
      if (group != '') {
        title.textContent = group;
      
        dropdown.append(title);
      }
      // dropdown.textContent = group;
      
      for (let item of this._items_groups) {
        let _group_item = this._menu_items[item];
        if (_group_item.nameGroup.trim() != group.trim()) continue;
        
        let dropdown_item = this._template.querySelector('.dropdown_item').cloneNode(true);
        
        if (_group_item.image != false) {
          dropdown_item.append(this._define_image(_group_item.image, _group_item.url));
        }
        else {
          if (_group_item.url) dropdown_item.setAttribute('href', _group_item.url);
          dropdown_item.textContent = _group_item.title;
        }
        
        dropdown.append(dropdown_item);
      }
      
      nav_list.append(dropdown);
    }
  }
  
  
  _push_header(key) {
    let menu_item = this._template.querySelector('.menu_item').cloneNode(true);
    let header = this._menu_items[key];
    let title = this._template.querySelector('.title').cloneNode(true);
    
    title.setAttribute('href', header.url);
    
    if (header.dropdownList == true) {
      title.setAttribute('dropdownlist', header.dropdownList);
    }
    
    title.textContent = key;
    
    menu_item.append(title);
    this._menu_container.append(menu_item);
    
    if (header.dropdownList) this._push_group(header, menu_item);
  }
  
  
  _push_logo(key) {
    let _logo_container = this._body.querySelector('.logo');
    let header = this._menu_items[key];
    
    if (header.image != false) {
      _logo_container.append(this._define_image(header.image, header.url));
    }
    else {
      _logo_container.textContent = key;
      _logo_container.setAttribute('href', header.url)
    }
  }
  
  
  _close__mobile_menu() {
    this._burger.removeAttribute('_active');
    this._menu_container.removeAttribute('_active');
    this._overlay.removeAttribute('_active');
    
    let nav_lists = this._body.querySelectorAll('.nav_list');
    
    for (let nav_list of nav_lists) {
      nav_list.removeAttribute('_active');
    }
  }
  
  
  
  
  refrash() {
    this._define__menu_items();
    this._build_menu();
  }
}

Menu.init();
