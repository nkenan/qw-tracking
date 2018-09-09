const element_collect = (_params) => {
  return new Promise(
    (resolve, reject) => {
      _start_promise(_params)
      .then(queries => {
        let elements = [];
        queries.forEach(query => {
          let selector = '';
          if(query.tag) selector = query.tag;
          if(query.id) selector = `#${query.id}`;
          elements.push(document.querySelectorAll(selector));
        })
        resolve(elements);
      })
      .catch(err => {
        qw_c({error: true, level: 2, source: "elements.js", text: `Error with element_collect()\nError Message: ${err}`});
      });
    }
  );
}

const element_convert = (_params) => {
  return new Promise(
    (resolve, reject) => {
      if(typeof _params != 'object') reject(`Params not an object for convert_element()`);

      // let new_element = {};
      //
      // new_element.tagName = _params.tagName ? _params.tagName : null;
      // new_element.href = _params.href ? _params.href : null;
      // new_element.id = _params.id ? _params.id : null;
      // new_element.src = _params.src ? _params.src : null;
      // new_element.alt = _params.alt ? _params.alt : null;
      // new_element.title = _params.title ? _params.title : null;
      // new_element.innerHTML = _params.innerHTML ? _params.innerHTML : null;
      // new_element.value = _params.value ? _params.value : null;
      // new_element.protocol = _params.protocol ? _params.protocol : null;
      // new_element.innerHTML = _params.innerHTML ? _params.innerHTML : null;

      resolve(_params);
    }
  );
}

// qw_c({level: 2, source: `elements.js`, text: `App started.`});
