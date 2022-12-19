function start() {
  scriptURL = "https://script.google.com/macros/s/AKfycbyhSzc64NaqD3WYnuBYk5JVasAE7Vfe4wiPoEUKwnfQsPJwuMpRaPBLgY1mCjKTAZUE/exec";
  form = document.forms['submit-to-google-sheet'];
  msg = document.getElementById("msg");
  navigation = document.querySelector("#navigation");
  document.querySelector("header").style.paddingTop = navigation.offsetHeight + "px";
  stickyElementOffsetTop = navigation.offsetTop;
  hamburgerMenu = document.querySelector(".hamburger-menu");
  hamburgerMenu.addEventListener("click", changeHamburger);
  setSticky();
  setOpenMenuHeight();
  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        msg.innerHTML = "Üzenet sikeresen elküldve";
        setTimeout(function () {
          msg.innerHTML = "";
        }, 5000);
        form.reset();
      })
      .catch(error => {
        msg.innerHTML = "Üzenet elküldése sikertelen. Kérjük próbálja meg később!<br>Error log:<br>" + error.message;
        setTimeout(function () {
          msg.innerHTML = "";
        }, 9000);
      })
  })
}

function setSticky() {
  var currentScrollPos = window.pageYOffset;
  if ((prevScrollpos < currentScrollPos) && (!hamburgerMenu.classList.contains("active"))) {
    navigation.style.top = "-" + navigation.offsetHeight + "px";
  } else {
    navigation.style.top = "0";
  }
  prevScrollpos = currentScrollPos;
  if (prevScrollpos < 0) {
    prevScrollpos = 0;
  }
}

function changeHamburger() {
  hamburgerMenu.classList.toggle("active");
  navigation.querySelector("ul").classList.toggle("active");
  if (hamburgerMenu.classList.contains("active")) {
    navigation.addEventListener("click", closeNavigation);
  } else {
    navigation.removeEventListener("click", closeNavigation);
  }
}

function closeNavigation(evt) {
  if (evt.target.nodeName == "A") {
    changeHamburger();
  }
}

function setOpenMenuHeight() {
  var win = window.innerHeight;
  var nav = navigation.offsetHeight;
  var ul = navigation.querySelector("ul").offsetHeight;
  if (nav + ul > win) {
    navigation.querySelector("ul").style.height = win - nav + "px";
  } else {
    navigation.querySelector("ul").style.height = "auto";
  }
}

var scriptURL, form, msg;
var navigation, stickyElementOffsetTop, hamburgerMenu;
var prevScrollpos = window.pageYOffset;
window.addEventListener("load", start);
window.addEventListener("scroll", setSticky);
window.addEventListener("resize", setOpenMenuHeight);