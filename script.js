const filter_btns = document.querySelectorAll(".filter-btn");
const skills_wrap = document.querySelector(".skills");
const skills_bars = document.querySelectorAll(".skill-progress");
const records_wrap = document.querySelector("#records");
const records_numbers = document.querySelectorAll(".number");
const hamburger_menu = document.querySelector(".hamburger-menu");
const navbar = document.querySelector("header nav");
const links = document.querySelectorAll(".links a");
const toggleBtn = document.querySelector(".caret");
const toggle = document.querySelector(".toggle");
const themeBtn = document.querySelector(".theme");
const frst = document.querySelector("#frstSkillSet");
const scnd = document.querySelector("#scndSkillSet");
const thrd = document.querySelector("#thrdSkillSet");
const frth = document.querySelector("#frthSkillSet");
const imageOverlay = document.querySelectorAll(".img-overlay");
const closeOverlay = document.querySelectorAll(".lightboxClose");
const lightbox = document.querySelector(".lightbox");
const lightboxPrev = document.querySelector(".lightboxPrev");
const lightImg = document.querySelector(".lightImg");
const portfolioImg = document.querySelectorAll(".gallery-src");
const imageSrc = [];

Array.from(portfolioImg).forEach((image) => {
  const src = image.getAttribute('src');
  imageSrc.push(src);
});

imageOverlay.forEach((div, index) => {
  div.addEventListener('click', function(){
    lightbox.classList.toggle("light");
    lightImg.src = imageSrc[index];
    lightboxPrev.appendChild(lightImg);
    document.body.classList.add("stop-scrolling");
  });
});

closeOverlay.forEach(div => {
  div.addEventListener('click', function(){
    lightbox.classList.toggle("light");
    document.body.classList.remove("stop-scrolling");
  })
});

let lightmode = localStorage.getItem("lightmode");

window.addEventListener("load", function(){
  frstShow();
});

window.addEventListener("scroll", () => {
  skillsEffect();
  countUp();
});

const enableLightMode = () => {
    document.body.classList.add("lightmode");
    localStorage.setItem("lightmode", "enabled");
};

const disableLightMode = () => {
    document.body.classList.remove("lightmode");
    localStorage.setItem("lightmode", null);
};

if (lightmode === "enabled"){
    enableLightMode();
    themeBtn.checked = true;
}

function theme() {
  lightmode = localStorage.getItem("lightmode");
  if (lightmode !== "enabled") {
    enableLightMode();
  } else {
    disableLightMode();
  }
}

function frstShow() {
  frst.style.opacity = 1;
  frst.style.visibility = "visible";
  
  scnd.style.opacity = 0;
  scnd.style.visibility = "hidden";
  
  thrd.style.opacity = 0;
  thrd.style.visibility = "hidden";
  
  frth.style.opacity = 0;
  frth.style.visibility = "hidden";
  
  setTimeout(scndShow, 3000);
}

function scndShow() {
  frst.style.opacity = 0;
  frst.style.visibility = "hidden";
  
  
  scnd.style.opacity = 1;
  scnd.style.visibility = "visible";
  
  thrd.style.opacity = 0;
  thrd.style.visibility = "hidden";
  
  frth.style.opacity = 0;
  frth.style.visibility = "hidden";
  
  setTimeout(thrdShow, 3000);
}

function thrdShow() {
  frst.style.opacity = 0;
  frst.style.visibility = "hidden";
  
  scnd.style.opacity = 0;
  scnd.style.visibility = "hidden";
  
  thrd.style.opacity = 1;
  thrd.style.visibility = "visible";
  
  frth.style.opacity = 0;
  frth.style.visibility = "hidden";
  
  setTimeout(frthShow, 3000);
}

function frthShow() {
  frst.style.opacity = 0;
  frst.style.visibility = "hidden";
  
  scnd.style.opacity = 0;
  scnd.style.visibility = "hidden";
  
  thrd.style.opacity = 0;
  thrd.style.visibility = "hidden";
  
  frth.style.opacity = 1;
  frth.style.visibility = "visible";
  
  setTimeout(frstShow, 3000);
}

function openToggle() {
  toggle.classList.toggle("reveal");
  toggleBtn.classList.toggle("open");
}

function closeMenu() {
  navbar.classList.remove("open");
  document.body.classList.remove("stop-scrolling");
}

function sent(){
    $("#notif").toggleClass("show");
}

function notSent(){
  $("#notif1").toggleClass("show");
}

function sendmail() {
  var name = $("#name");
  var email = $("#email");
  var subject = $("#subject");
  var body = $("#body");

  if (isNotEmpty(name) && isNotEmpty(email) && isNotEmpty(subject) && isNotEmpty(body)) {
    var nameVal = name.val();
    var emailVal = email.val();
    var subjectVal = subject.val();
    var bodyVal = body.val();

    const msg = "Name: " + nameVal + 
                "Email: " + emailVal +
                "Subject: " + subjectVal +
                "Message: " + bodyVal;

    Email.send({
      SecureToken : "80e11182-356a-41bd-88de-ffe17045c48b",
      To : 'fpgraphics14@gmail.com',
      From : emailVal,
      Subject : subjectVal,
      Body : bodyVal
    }).then(
      message => {
        console.log(emailVal);
        console.log(subjectVal);
        console.log(bodyVal);
        console.log(message);
        $('#myForm')[0].reset();
        if(message == "OK") {
          $('#notif').toggleClass("show");
          setTimeout(sent, 5000);
        } else {
          $('#notif1').toggleClass("show");
          setTimeout(notSent, 5000);
        }
      }
    );
  }
}

function isNotEmpty(caller) {
    if (caller.val() == "") {
        caller.css('border', '2px solid #E8563F');
        return false;
    } else {
        caller.css('border', '');
        return true;
    }
}

hamburger_menu.addEventListener("click", () => {
  if (!navbar.classList.contains("open")) {
    navbar.classList.add("open");
    document.body.classList.add("stop-scrolling");
  } else {
    closeMenu();
  }
});

links.forEach((link) => link.addEventListener("click", () => closeMenu()));

filter_btns.forEach((btn) =>
  btn.addEventListener("click", () => {
    filter_btns.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

    let filterValue = btn.dataset.filter;

    $(".grid").isotope({ filter: filterValue });
  })
);

$(".grid").isotope({
  itemSelector: ".grid-item",
  layoutMode: "fitRows",
  transitionDuration: "0.5s",
});

function checkScroll(el) {
  let rect = el.getBoundingClientRect();
  if (window.innerHeight >= rect.top + el.offsetHeight) return true;
  return false;
}

function skillsEffect() {
  if (!checkScroll(skills_wrap)) return;
  skills_bars.forEach((skill) => (skill.style.width = skill.dataset.progress));
}

function countUp() {
  if (!checkScroll(records_wrap)) return;
  records_numbers.forEach((numb) => {
    const updateCount = () => {
      let currentNum = +numb.innerText;
      let maxNum = +numb.dataset.num;
      let speed = 1000;
      const increment = Math.ceil(maxNum / speed);

      if (currentNum < maxNum) {
        numb.innerText = currentNum + increment;
        setTimeout(updateCount, 1);
      } else {
        numb.innerText = maxNum;
      }
    };

    setTimeout(updateCount, 1000);
  });
}

var mySwiper = new Swiper(".swiper-container", {
  speed: 1000,
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 5000,
  },
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
});