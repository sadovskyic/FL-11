import '../scss/app.scss';

function hiddenImgs () {
  let imgs = document.getElementsByTagName('img');
  for (let item of imgs) {
    item.hidden = true;
  }
}

function ButtonClick(button) {
    let self = this;
    button.onclick = function(event) {
      let target = event.target;
      let action = target.getAttribute('data-action');
      if (action) {
        self[action]();
      }
    };
    this.rock = () => {
      hiddenImgs();
      document.getElementById('rock').hidden = false;
    };
    this.paper = () => {
      hiddenImgs();
      document.getElementById('paper').hidden = false;
    };
    this.scissors = () => {
      hiddenImgs();
      document.getElementById('scissors').hidden = false;
    };
  }
  let buttonClick = new ButtonClick(document);