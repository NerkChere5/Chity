// import '../../../../Api/Components/Menu/Menu.js';
import '../../../Api/Components/Field/Field.js';
// import {Auth} from '../Units/Modules/Auth/Auth.js';
import {Main} from '../../../Components/Main.js';
import {Docs_preprocessor} from '../../../Units/Docs_preprocessor/Docs_preprocessor.js';

Main.init('5v4v783538vv4');

let edits = document.querySelectorAll('x-field');
let editsRequired = new Array(...edits);
editsRequired = editsRequired.filter((item) => item.hasAttribute('required'));
// let menu = document.querySelector('x-menu');
let answer = null;
let nav_list = document.querySelector('.nav_list');
let docs_preprocessor = new Docs_preprocessor();


document.body.addEventListener('pointerdown', _on_pointerDown);


async function _on_pointerDown(event) {
    if (!event.target.classList.contains('submit')) return;

    let status = _check_validaty_editsRequired();

    if (!status) return;

    answer = await docs_preprocessor.add_doc(...edits)

    if (!answer) {
        nav_list.innerHTML = '<p><i>Неверные исходные данные или такой документ уже существует</i></p>';
    }
    else show_answer();
}

function show_answer() {
    nav_list.innerHTML = `Документ добавлен`;

    for (let item of answer) {
        let container = document.createElement('div');
        container.classList.add('answer_container');

        for (let key in item) {
            let block = document.createElement('div');
            block.textContent = item[key];

            block.classList.add(key);
            container.append(block);
        }

        nav_list.append(container);
    }
}



function _check_validaty_editsRequired() {
    let status_edit = 1;

    for (let edit of editsRequired) {
        edit.toggle__status_value();

        status_edit *= edit._status_value;
    }

    return !!status_edit;
}
