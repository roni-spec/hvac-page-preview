/* Content section: Read More toggle (sec-tem-5) */
function mlptcToggleReadMore(wrap) {
  var clip      = wrap.querySelector('.mlptc-readmore-clip');
  var fade      = wrap.querySelector('.mlptc-readmore-fade');
  var content   = wrap.querySelector('.mlptc-readmore-content');
  var label     = wrap.querySelector('.mlptc-readmore-label');
  var collapsed = parseInt(wrap.dataset.collapsedHeight, 10) || 90;
  var isExpanded = wrap.dataset.expanded === 'true';
  if (!isExpanded) {
    clip.style.maxHeight = 'none';
    var fullH = clip.scrollHeight;
    clip.style.maxHeight = collapsed + 'px';
    void clip.offsetHeight;
    clip.style.maxHeight  = fullH + 'px';
    fade.style.opacity    = '0';
    content.style.opacity = '1';
    if (label) label.textContent = 'Read Less -';
    wrap.dataset.expanded = 'true';
  } else {
    clip.style.maxHeight  = collapsed + 'px';
    fade.style.opacity    = '1';
    content.style.opacity = '0.85';
    if (label) label.textContent = 'Read More +';
    wrap.dataset.expanded = 'false';
  }
}

/* Content section: Accordion (sec-tem-5) */
function mlptcToggleAccordion(btn) {
  var panel   = btn.nextElementSibling;
  var arrow   = btn.querySelector('.mlptc-accordion-arrow');
  var content = panel.querySelector('.mlptc-accordion-content');
  var isOpen  = btn.getAttribute('aria-expanded') === 'true';
  if (isOpen) {
    panel.style.gridTemplateRows = '0fr';
    content.style.opacity        = '0';
    content.style.transform      = 'translateY(-6px)';
    arrow.style.transform        = 'rotate(90deg)';
    btn.setAttribute('aria-expanded', 'false');
  } else {
    var container = btn.closest('.mlptc-accordion-container');
    if (container) {
      container.querySelectorAll('.mlptc-accordion-btn').forEach(function(b) {
        if (b !== btn && b.getAttribute('aria-expanded') === 'true') {
          var p = b.nextElementSibling;
          var c = p.querySelector('.mlptc-accordion-content');
          var a = b.querySelector('.mlptc-accordion-arrow');
          p.style.gridTemplateRows = '0fr';
          c.style.opacity          = '0';
          c.style.transform        = 'translateY(-6px)';
          a.style.transform        = 'rotate(90deg)';
          b.setAttribute('aria-expanded', 'false');
        }
      });
    }
    panel.style.gridTemplateRows = '1fr';
    content.style.opacity        = '1';
    content.style.transform      = 'translateY(0)';
    arrow.style.transform        = 'rotate(-90deg)';
    btn.setAttribute('aria-expanded', 'true');
  }
}

/* Notice bar close with localStorage persistence (from custom.js) */
(() => {
  "use strict";
  document.addEventListener("DOMContentLoaded", () => {
    const closeBtn = document.querySelector(".notice-bar__close");

    if (localStorage.getItem("noticeBarOff") === "true") {
      document.documentElement.classList.add("hide-notice-bar");
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        document.documentElement.classList.add("hide-notice-bar");
        localStorage.setItem("noticeBarOff", "true");
      });
    }

    let lastWidth = window.innerWidth;
    window.addEventListener("resize", () => {
      const noticeBar = document.querySelector(".notice-bar");
      const headerMenu = document.querySelector(".header__menu.long");
      if (!noticeBar) return;
      if (lastWidth !== window.innerWidth) {
        lastWidth = window.innerWidth;
        if (window.innerWidth > 576) {
          noticeBar.classList.remove("hidden");
        } else if (headerMenu && headerMenu.classList.contains("active")) {
          noticeBar.classList.add("hidden");
        }
      }
    });
  });
})();

/* Certs marquee (from reviews/certs/certs.js) */
(function () {
  var track = document.querySelector('.rv-certs__track');
  var set   = document.querySelector('.rv-certs__set');
  if (!track || !set) return;
  var pos   = 0;
  var speed = 0.6;
  function step() {
    pos -= speed;
    var w = set.offsetWidth;
    if (pos <= -w) pos += w;
    track.style.transform = 'translateX(' + pos + 'px)';
    requestAnimationFrame(step);
  }
  var imgs   = track.querySelectorAll('img');
  var loaded = 0;
  function onLoad() {
    loaded++;
    if (loaded >= imgs.length) requestAnimationFrame(step);
  }
  imgs.forEach(function (img) {
    if (img.complete) onLoad();
    else { img.addEventListener('load', onLoad); img.addEventListener('error', onLoad); }
  });
}());

/* FAQ accordion */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".faq-item__q").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(el => {
        el.classList.remove("open");
        el.querySelector(".faq-item__q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* Service areas tabs */
  document.querySelectorAll(".areas__tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".areas__tab").forEach(t => t.classList.remove("areas__tab--active"));
      document.querySelectorAll(".areas__panel").forEach(p => p.classList.remove("areas__panel--active"));
      tab.classList.add("areas__tab--active");
      const panel = document.getElementById("tab-" + tab.dataset.tab);
      if (panel) panel.classList.add("areas__panel--active");
    });
  });
});

/* Main site JS (header hamburger, sticky panel, locations popup, footer accordion, quick-actions swipe) */
(()=>{"use strict";function e(e){return function(e){if(Array.isArray(e))return t(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,n){if(e){if("string"==typeof e)return t(e,n);var o={}.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?t(e,n):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}document.addEventListener("DOMContentLoaded",(function(){function t(e,t){var n=new URL(t),o=["service","appliance","brand","city","couponservice","coupondiscount","coupondescr"].map((function(t){var n=e.getAttribute("data-".concat(t));return n?"".concat(t,"=").concat(n):null})).filter(Boolean).join("&");o&&(n.search=n.search?"".concat(n.search,"&").concat(o):"?".concat(o)),window.location.href=n.href}var n,o,r,i,c,a,s,d,l,u,m,f,v,h,L;document.addEventListener("click",(function(e){var t=e.target.closest("[data-popup-trigger]");if(t){e.preventDefault();var n=t.dataset.popupTrigger,o=document.querySelector("[data-popup-name='".concat(n,"']"));o&&(o.classList.add("active"),o.setAttribute("aria-hidden","false"),"message"!==n&&document.documentElement.classList.add("fixed"))}var r=e.target.closest("[data-popup-name]");r&&(e.target===r||e.target.closest("[data-popup-close]"))&&(e.preventDefault(),r.classList.remove("active"),r.setAttribute("aria-hidden","true"),"message"!==r.dataset.popupName&&document.documentElement.classList.remove("fixed"))})),n='a[data-link="to-form"]',document.addEventListener("click",(function(e){var o=e.target.closest(n);o&&o.matches(n)&&(e.preventDefault(),t(o,o.getAttribute("href")))})),function(e){document.addEventListener("click",(function(n){var o=n.target.closest(e);if(o&&o.matches(e)){var r=o.dataset.url;"to-form"===o.dataset.link?t(o,r):"_blank"===o.dataset.target?window.open(r,"_blank"):window.location.href=r}}))}("[data-url]"),function(e){var t=document.querySelector(e),n=!1;window.addEventListener("scroll",(function(){n||(window.requestAnimationFrame((function(){window.pageYOffset>1e3?t.classList.add("fade"):t.classList.remove("fade"),n=!1})),n=!0)})),t.addEventListener("click",(function(){window.scrollTo({top:0,behavior:"smooth"})}))}(".pageup"),function(){var e=window.location.hash;if(e){var t=document.querySelector(e);t&&t.scrollIntoView({behavior:"smooth",block:"start"})}}(),function(t,n,o){var r=document.querySelector(t),i=r.querySelector(n),c=r.querySelector(o),a=r.querySelector(".header__menu.short ul"),s=a.innerHTML,d=r.querySelector(".lang-switcher"),l=window.innerWidth,u=!1;function m(e){var t=e.target.closest(".menu-item-has-children");t&&t.classList.toggle("active")}function f(){if(r.querySelectorAll(".menu-item-has-children").forEach((function(e){return e.classList.remove("active")})),l<=576){if(r.addEventListener("click",m),c.querySelector(".custom-logo-link")||(d&&c.insertBefore(d.cloneNode(!0),c.firstChild),c.insertBefore(document.querySelector(".custom-logo-link").cloneNode(!0),c.firstChild)),!u){var t=document.querySelector(".socials"),n=r.querySelector(".header__phone");c.querySelector(".main-menu-list").innerHTML+=s,a.innerHTML="",c.innerHTML+='<div class="header__phone">'.concat(n.innerHTML,"</div>"),c.innerHTML+='<div class="socials">'.concat(t.innerHTML,"</div>"),u=!0}}else if(l>576&&u){var o,i;document.documentElement.classList.remove("fixed"),r.removeEventListener("click",m),a.innerHTML=s,e(c.querySelector(".main-menu-list").children).slice(-1).forEach((function(e){return e.remove()})),null===(o=c.querySelector(".header__phone"))||void 0===o||o.remove(),null===(i=c.querySelector(".socials"))||void 0===i||i.remove(),u=!1}}i.addEventListener("click",(function(){i.classList.contains("active")?(i.classList.remove("active"),c.classList.remove("active"),document.documentElement.classList.remove("fixed")):(i.classList.add("active"),c.classList.add("active"),document.documentElement.classList.add("fixed"))})),f(),window.addEventListener("resize",(function(){window.innerWidth!==l&&(l=window.innerWidth,f())}))}(".header",".header__hamburger",".header__menu.long"),o=document.querySelector(".header__sticky"),r=document.querySelector(".container").offsetLeft,window.addEventListener("resize",(function(){r=document.querySelector(".container").offsetLeft,o.classList.contains("active")&&(o.style.right="calc(".concat(r,"px + 1.9rem)"))}),!1),new IntersectionObserver((function(e,t){e.forEach((function(e){e.isIntersecting?(o.classList.remove("active"),o.style.right=0):(o.classList.add("active"),o.style.right="calc(".concat(r,"px + 1.9rem)"),o.animate([{transform:"translateY(-100%)"},{transform:"translateY(0)"}],{duration:500,iterations:1}))}))})).observe(document.querySelector(".header")),i=document.querySelector(".header"),c=window.scrollY,a=!1,s=function(){var e=window.scrollY;e>=i.offsetHeight&&(c<e?i.classList.add("hidden"):i.classList.remove("hidden")),c=e,a=!1},d=function(){a||(window.requestAnimationFrame(s),a=!0)},l=function(){window.innerWidth<=576?window.addEventListener("scroll",d):window.removeEventListener("scroll",d)},window.addEventListener("resize",l),l(),function(){var e=document.querySelector('[data-locations="trigger"]');if(e){var t=document.querySelector('[data-locations="content"]'),n=t.querySelector('[data-locations="close"]');e.addEventListener("click",(function(){t.classList.add("active"),window.innerWidth<=576&&document.documentElement.classList.add("fixed"),t.scrollIntoView({behavior:"smooth",block:"start"})})),n.addEventListener("click",(function(){t.classList.remove("active"),window.innerWidth<=576&&document.documentElement.classList.remove("fixed")}))}}(),u=document.querySelector('[data-phones="open"]'),m=document.querySelector('[data-phones="container"]'),u&&u.addEventListener("click",(function(){u.classList.toggle("active"),m.classList.toggle("active")})),f=".wrap-menu__header",v=".wrap-menu",window.innerWidth<=576&&document.querySelector(".footer").addEventListener("click",(function(e){var t=e.target.closest(f);t&&t.closest(v).classList.toggle("active")})),(L=document.querySelector(".quick-actions .callus"))&&(L.addEventListener("touchstart",(function(e){h=e.touches[0].clientX})),L.addEventListener("touchend",(function(e){var t=e.changedTouches[0].clientX,n=.5*window.innerWidth;t-h>n&&(L.classList.add("animation"),window.location.href=L.href,setTimeout((function(){L.classList.remove("animation")}),2e3))})))}))})();
