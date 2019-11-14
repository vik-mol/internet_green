"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var navbar = document.getElementById('nav-bar');
  var header = document.getElementById('header');
  var menuToggler = document.getElementById('header-toggle-btn');
  menuToggler.addEventListener('click', function (e) {
    if (document.documentElement.clientWidth > 520) return;
    navbar.classList.toggle('open');
    this.classList.toggle('open');
  });
});