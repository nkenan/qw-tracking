const _start_promise =  (_params) => Promise.resolve(_params);
//******************************************************************************
let use_script_loader = false;
const scripts2Load = ['./qw-tools.js', './elements.js', './events.js', './api.js', './send.js']
const script_loader = url => {
    return new Promise(
      (resolve, reject) => {
        var script = document.createElement("script");
        script.src = url;
        document.head.appendChild(script);
        resolve();
      }
    );
}
if (use_script_loader) scripts2Load.forEach(script => {
  _start_promise(script)
  .then(script => script_loader(script))
  .catch(err => qw_communicate(`error with 'scripts2Load.forEach' and 'script_loader(script)'`))
});

//******************************************************************************
const qw_communicate = (_params = {level: 2, text: `***********************************\nDebug point.`}) => {
  return new Promise(
    (resolve, reject) => {
      if (typeof _params === 'object') {
        _start_promise()
        .then(() => {
          let obj = {};
          obj.level = _params.level ? _params.level : 2;
          obj.source = _params.source ? _params.source : "?";
          obj.text = _params.text ? _params.text : "No text.";
          obj.type = _params.type ? _params.type : "console-log";
          obj.targets = _params.targets ? _params.targets : [];
          return obj;
        })
        .then(obj => {
          let string = `***********************************\n`;
          if (obj.level != 'undefined') string += `[${obj.level ? obj.level : 2}]`;
          if (obj.source != 'undefined') string += ` "${obj.source ? obj.source : "?"}"\n`;
          if (obj.text != 'undefined') string += `${obj.text ? obj.text : null}`;
          obj.string = string;
          return obj;
        })
        .then(result => {
          switch(result.type) {
            case 'console-log':
              console.log(result.string);
              resolve(result.string)
            break;
            case 'api-request':
            break;

          }
        })
      }
      if (typeof _params === 'string') {
        console.log(_params);
        resolve(_params)
      }
    }
  );
};

// qw_communicate({level: 2, source: `qw-tools.js`, text: `App started.`});
