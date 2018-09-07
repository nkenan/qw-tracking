window.onload = () => {
  elements = document.querySelectorAll("img");
  elements.forEach(element => {
    element.src = element.dataset.src ? element.dataset.src : element.src;
  });
}
// qw_communicate({level: 2, source: `lazyload.js`, text: `App started.`});
