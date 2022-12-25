let object = {
  a: 1,
  b: 2,
  c: [1, 2, 3],
  d: {
    aa: 11,
    bb: 22,
    cc: [[1], [2], [3]],
    dd: {
      aaa: 111,
    },
  },
};

object.d.dd.aaa == 111;




function f(element) {
  if (element?.tagName == 'X-OBJECT' && element?.children?.length) {
    let o = {};
    
    for (let child of element.children) {
      let key = child.getAttribute('key');
      
      if (!key) continue;
      
      o[key] = f(child);
    }
    
    return o;
  }
  else if (element?.children?.length) {
    let a = [];
    
    for (let child of element.children) {
      a.push(f(child));
    }
    
    return a;
  }
  else {
    return element?.textContent || '';
  }
}




let element = document.querySelector('.Array');
let o = f(element);
let o_json = JSON.stringify(o, null, 2);

console.log(o);
console.dir(o_json);




// menu.items__set({
//   'Item 1': 
// });


// [
//   'Item_1',
//   'Item_2',
//   'Item_3',
//   {
//     caption: 'Item_3',
//     subMenu: [
//       'Item_3_1'
//     ]
//   }
// ]
