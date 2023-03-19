// 11.03.2023




import {Component} from '../Component.js';
import {Edit} from '../Edit/Edit.js';
import {Auth} from '../../../Units/Modules/Auth/Auth.js';




export class Form extends Component {
    static url = import.meta.url;




    _auth = null;
    _edits = [];




    async _build() {
        await super._build();
        
        this._edits = this._shadow.querySelectorAll('x-edit');
        
        this._shadow.addEventListener('pointerdown', this._on_pointerDown.bind(this));
        
        this._auth = new Auth();
    }
    
    
    _on_pointerDown(event) {
        if (!event.target.classList.contains('submit')) return;

        let status = this._check_validaty_edits();

        if (status) this._logIn(this._edits[0]._value, this._edits[1]._value);
    }
    
    
    _check_validaty_edits() {
        let status_edit = 1;

        for (let edit of this._edits) {
            edit.toggle_value();

            status_edit *= edit._status_value;
        }

        return !!status_edit;
    }
    
    
    async _logIn(name, password) {
        let result = await this._auth.logIn(name, password);
        
        if (!result) return;
        
        let event_logIn = new Event('logIn', {
          bubbles: true,
          composed: true,
        });
        
        this.dispatchEvent(event_logIn);
    }
}




Form.init();
