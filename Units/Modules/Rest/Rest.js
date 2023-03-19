// 13.04.2022




export class Rest {
  _url = '';
  
  
  
  
  constructor(url) {
    this._url = url;
  }
  
  
  async call(method, ...args) {
    let fetch_opts = {
      body: JSON.stringify({args, method}),
      method: 'post',
    };
    let result = null;
    
    try {
      let response = await fetch(this._url, fetch_opts);
      result = await response.json();
    }
    catch (error) {
      result = {error: true};
    }
    
    return result;
  }
}
