const event_send = (_params) => {
  return new Promise(
    (resolve, reject) => {
      if(! _params) reject("No data to send.");
      let hitType = 'event';
      let eventCategory, eventAction, eventLabel, eventValue;
      _start_promise(_params)
      .then(element => {
        // qw_communicate(element);
        switch(element.tagName) {
          case 'A':
            eventCategory = 'Anchor';
            eventAction = (element.protocol === 'tel:') ? 'Anruf' : "Link";
            eventLabel = element.href;
            eventValue = 1;
          break;
          case 'IMG':
            eventCategory = 'Image';
            eventAction = "Click";
            eventLabel = element.src;
            eventValue = null;
          break;
          case 'INPUT':
            eventCategory = 'Input';
            eventAction = "Change";
            eventLabel = element.id;
            eventValue = element.value;
          break;
        };
        return element
      })
      .then(element => {
        qw_communicate(`ga('send', '${hitType}', '${eventCategory}', '${eventAction}', '${eventLabel}', '${eventValue ? eventValue : null}')`);
        return element;
      })
      .then(res => resolve(res))
    }
  );
}
// qw_communicate({level: 2, source: `send.js`, text: `App started.`});
