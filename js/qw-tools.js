let use_script_loader = false;
//******************************************************************************

const _start_promise =  (_params) => Promise.resolve(_params);
//******************************************************************************
const qw_c = (_params = {level: 2, text: `***********************************\nDebug point.`}) => {
  return new Promise(
    (resolve, reject) => {
      if (typeof _params === 'object') {
        _start_promise(_params)
        .then(notification => {
          notification;
          notification.level = notification.level ? notification.level : 2;
          notification.source = notification.source ? notification.source : "?";
          notification.text = notification.text ? notification.text : "No text.";
          notification.type = notification.type ? notification.type : "console.log";
          notification.targets = notification.targets ? notification.targets : [];
          return notification;
        })
        .then(conlog => {
          if(conlog.type === `console.log`) {
            let string = `***********************************\n`;
            if (conlog.level != 'undefined') string += `[${conlog.level ? conlog.level : 2}]`;
            if (conlog.source != 'undefined') string += ` "${conlog.source ? conlog.source : "?"}"\n`;
            if (conlog.text != 'undefined') string += `${conlog.text ? conlog.text : null}`;
            conlog.string = string;
          }
          return conlog;
        })
        .then(notification => {
          switch(notification.type) {
            case 'console.log':
              console.log(notification.string);
              resolve(notification)
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
//******************************************************************************
const printo = _params => {
  return new Promise(
    (resolve, reject) => {
      select(_params)
      .then(results => {
        results.forEach(el => console.log(el));
        resolve(results);
      })
    }
  )
}
//******************************************************************************
/*
1. INPUT '_params': Object
[_params.selector]: An html tag or an id, e.g. 'h1' or '#someId'
[_params.key]: A property to set, e.g. 'font-size'
[_params.value]: The value for _params.key to set, e.g. '2rem'

2. OUTPUT 'output': Object

*/
const css_manipulate = (_params) => {
  return new Promise(
    (resolve, reject) => {
      Promise.resolve(_params)
      .then(input => {
        if(input.constructor === Array) {
          input.forEach(query => {
            console.log(query)
            let elements = document.querySelectorAll(query.selector);
            console.log(elements)
            elements.forEach(element => {
              query.attributes.forEach(attribute => {
                console.log(attribute)
                element.style[attribute.key] = attribute.value
              });
            });
          })
        }
      })
      .then(output => resolve(output))
    }
  );
}
//******************************************************************************
const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//******************************************************************************
const select = _selector => Promise.resolve(document.querySelectorAll(_selector))
//******************************************************************************
window.onload = function () {
  // Promise.resolve()
  // .then(res => {
  //   let i;
  //   for (let i=0; i<10; i++) {
  //     sleep(1500)
  //     .then(() => change_font(i))
  //     .then(() => qw_c(i))
  //
  //   }
  //   resolve();
  // });
}


//******************************************************
// let queryArray = [{
//   selector: "h2",
//   key: "font-size",
//   value: "3rem"
// }];
let queryArray = [{
  selector: "a",
  attributes: [
    {key: "color", value: "red"},
    {key: "text-decoration", value: "none"}
  ]
},
{
  selector: "img",
  attributes: [
    {key: "width", value: "50%"},
    {key: "border-radius", value: "100%"},
    {key: "border", value: "solid 1px black"}
  ]
},
{
  selector: "h1",
  attributes: [
    {key: "text-decoration", value: "underline"},
    {key: "font-size", value: "4.3rem"},
    {key: "color", value: "purple"}
  ]
},
{
  selector: "h2",
  attributes: [
    {key: "text-decoration", value: "underline"},
    {key: "font-size", value: "1.3rem"},
    {key: "color", value: "yellow"}
  ]
},
{
  selector: "#specialH2",
  attributes: [
    {key: "color", value: "red"}
  ]
},
{
  selector: "p",
  attributes: [
    {key: "color", value: "white"},
    {key: "font-size", value: "2rem"},
    {key: "background-color", value: "purple"}
  ]
}];
// let queryArray = {
//   selector: "body",
//   key: "background-color",
//   value: "rgba(235,190,245, 1)"
// };
css_manipulate(queryArray)
