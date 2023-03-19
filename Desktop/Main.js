// import '../../Units/Components/Menu_x/Menu_x.js';
// import '../../Units/Components/Desktop/Desktop.js';
// import '../../Api/Components/Slider/Slider.js';
import {Auth} from '../Units/Modules/Auth/Auth.js';




let auth = new Auth();
let isAuth = await auth.isAuth();

if (!isAuth) enter();




function enter() {
  location = 'http://localhost/Apps/Chity/';
}
