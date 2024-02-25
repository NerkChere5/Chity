let inputs = document.querySelectorAll('input');
let login = inputs[0];
let password = inputs[1];
let div = document.querySelector('div');
let button = document.querySelector('button').onclick = buildRequest;


function buildRequest() {
  async function getData() {
    let response = await fetch(
      import.meta.url + '/../Login.php',
      {
        body: JSON.stringify({
          users_login: login.value,
          users_password: password.value,
        }),
        method: 'post',
      }
    );
    
    let data = await response.json();
    
    if (data.length) {
      location = '/Apps/Chity/Desktop/';
      localStorage.clear();
      localStorage.setItem('token', '1');
    }
    else {
      div.removeAttribute('hidden');
    }
  }

getData();
}
