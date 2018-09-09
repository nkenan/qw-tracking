const event_listener = (_event_type = 'click', _collection) => {
  return new Promise(
    (resolve, reject) => {

      let elements_array = [];

      let event_fired = (element) => {
        element_convert(element.target)
        .then(res => event_send(res))
      }

      _start_promise(_collection)
      .then(collection => {
        collection.forEach(tag => {
          tag.forEach(element => {
            elements_array.push(element);
            switch(_event_type) {
              case 'click':
                element.onclick = (event) => {
                  event_fired(event);
                }
              break;
              case 'change':
                element.onchange = el => {
                  event_fired(el);
                }
              break;
            }
          });
        })
      })
      .then(() => resolve(elements_array));
    }
  );
}

// qw_c({level: 2, source: `events.js`, text: `App started.`});
