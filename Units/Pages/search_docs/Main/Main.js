import '../../../../Api/Components/Menu/Menu.js';
import '../../../../Api/Components/Field/Field.js';
// import {Auth} from '../Units/Modules/Auth/Auth.js';


let edits = document.querySelectorAll('x-field');
let editsRequired = new Array(...edits);
editsRequired = editsRequired.filter((item) => item.hasAttribute('required'));
let menu = document.querySelector('x-menu');
let answer = null;
let nav_list = document.querySelector('.nav_list');

menu.menu__items = [
    {
        "caption": "ЗАО \"ЧИТЫ\"",
        "type": "menu__logo",
        "url": "http://localhost/Apps/Chity"
    },
    {
        "caption": "Рабочий стол",
        "items": [
            {
                "items": [
                    {
                        "caption": "Создать документы",
                        "url": "./create_docs",
                        "type": "menu__category_item"
                    },
                    {
                        "caption": "Повестка",
                        "url": "./news",
                        "type": "menu__category_item"
                    },
                    {
                        "caption": "Ежедневник",
                        "url": "./calendar",
                        "type": "menu__category_item"
                    }
                ],
                "type": "menu__category"
            }
        ],
        "type": "menu__item",
        "url": "http://localhost/Apps/Chity"
    },
    {
        "caption": "Управление",
        "items": [
            {
                "caption": "Отчёты",
                "items": [
                    {
                        "caption": "Активность",
                        "url": "./reports/activity",
                        "type": "menu__category_item"
                    },
                    {
                        "caption": "Сотрудники",
                        "url": "./reports/people",
                        "type": "menu__category_item"
                    }
                ],
                "type": "menu__category",
                "url": "./reports"
            }
        ],
        "type": "menu__item"
    },
    {
        "caption": "База данных",
        "items": [
            {
                "caption": "",
                "items": [
                    {
                        "caption": "Поиск человека",
                        "url": "../search_people",
                        "type": "menu__category_item"
                    },
                    {
                        "caption": "Поиск документов",
                        "url": "../search_docs",
                        "type": "menu__category_item"
                    },
                    {
                        "caption": "Архив",
                        "url": "./library",
                        "type": "menu__category_item"
                    }
                ],
                "type": "menu__category"
            }
        ],
        "type": "menu__item",
        "url": "./Units/Sections/Db"
    },
    {
        "caption": "User",
        "items": [
            {
                "items": [
                    {
                        "caption": "Профиль",
                        "url": "./profile",
                        "type": "menu__category_item"
                    },
                    {
                        "caption": "Настройки",
                        "url": "./setting",
                        "type": "menu__category_item"
                    },
                    {
                        "caption": "Выйти",
                        "url": "./logout",
                        "type": "menu__category_item"
                    }
                ],
                "type": "menu__category"
            }
        ],
        "type": "menu__item",
        "url": "./profile"
    }
];

document.body.addEventListener('pointerdown', _on_pointerDown);


async function _on_pointerDown(event) {
    if (!event.target.classList.contains('submit')) return;

    let status = _check_validaty_editsRequired();

    if (!status) return;

    answer = await buildRequest();

    answer.length ? show_answer() : show_error();
}

function show_answer() {
    nav_list.innerHTML = `<p><i>Найдено ${answer.length} результатов</i></p>`;

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

function show_error() {
    nav_list.innerHTML = '<p><i>Ничего не найдено. Проверьте правильность заполнения полей и повторите попытку.</i></p>';
}



function _check_validaty_editsRequired() {
    let status_edit = 1;

    for (let edit of editsRequired) {
        edit.toggle__status_value();

        status_edit *= edit._status_value;
    }

    return !!status_edit;
}


function buildRequest() {
  let request_body = {
      doc_date: edits[0]._value || '%',
      doc_num: edits[1]._value || '%',
      doc_type: edits[2]._value || '%',
      doc_organ: edits[3]._value || '%',
      doc_name: edits[4]._value || '%',
      doc_num_public: edits[5]._value || '%',
      doc_date_public: edits[6]._value || '%'
  };

  async function getData() {
    let response = await fetch(
      import.meta.url + '/../http.php',
      {
        body: JSON.stringify(request_body),
        method: 'post',
      }
    )

    let data = await response.json();

    return data;
  }

  return getData();
}
