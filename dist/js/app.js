(()=>{var e,t,n,o;function c(){document.getElementById("nav-menu").classList.remove("show-menu")}e="nav-toggle",t="nav-menu",n=document.getElementById(e),o=document.getElementById(t),n&&o&&n.addEventListener("click",(function(){o.classList.toggle("show-menu")})),document.querySelectorAll(".nav__link").forEach((function(e){return e.addEventListener("click",c)}));var s=document.querySelectorAll("section[id]");window.addEventListener("scroll",(function(){var e=window.pageYOffset;s.forEach((function(t){var n=t.offsetHeight,o=t.offsetTop-50;sectionId=t.getAttribute("id"),e>o&&e<=o+n?document.querySelector(".nav__menu a[href*="+sectionId+"]").classList.add("active-link"):document.querySelector(".nav__menu a[href*="+sectionId+"]").classList.remove("active-link")}))})),window.addEventListener("scroll",(function(){var e=document.getElementById("header");this.scrollY>=200?e.classList.add("scroll-header"):e.classList.remove("scroll-header")})),window.addEventListener("scroll",(function(){var e=document.getElementById("scroll-top");this.scrollY>=560?e.classList.add("show-scroll"):e.classList.remove("show-scroll")}));var a=document.getElementById("theme-button"),l="dark-theme",d="bx-sun",i=localStorage.getItem("selected-theme"),r=localStorage.getItem("selected-icon");i&&(document.body.classList["dark"===i?"add":"remove"](l),a.classList["bx-moon"===r?"add":"remove"](d)),a.addEventListener("click",(function(){document.body.classList.toggle(l),a.classList.toggle(d),localStorage.setItem("selected-theme",document.body.classList.contains(l)?"dark":"light"),localStorage.setItem("selected-icon",a.classList.contains(d)?"bx-moon":"bx-sun")})),ScrollReveal({origin:"top",distance:"30px",duration:2e3,reset:!0}).reveal(".home__data, .home__img,\n            .about__data, .about__img,\n            .services__content, .menu__content,\n            .app__data, .app__img,\n            .contact__data, .contact__button,\n            .footer__content",{interval:200})})();