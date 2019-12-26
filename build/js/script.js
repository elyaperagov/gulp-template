'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var modal = document.querySelector('.modal');
var modalOpen = document.querySelector('.button--contacts');
var modalClose = modal.querySelector('.modal__close');
var siteMap = document.querySelector('.contents__inner');
var contents = document.querySelector('.contents');
var contacts = document.querySelector('.footer-contacts');
var contactsInner = document.querySelector('.footer-contacts__inner');

var contentsToggle = function () {
  if (siteMap.classList.contains('contents__inner--shown')) {
    siteMap.classList.remove('contents__inner--shown');
    siteMap.classList.add('contents__inner--hidden');
  } else if (siteMap.classList.contains('contents__inner--hidden')) {
    siteMap.classList.remove('contents__inner--hidden');
    siteMap.classList.add('contents__inner--shown');
  }
};

contents.addEventListener('click', function () {
  contentsToggle();
});

var contactsToggle = function () {
  if (contactsInner.classList.contains('footer-contacts__inner--shown')) {
    contactsInner.classList.remove('footer-contacts__inner--shown');
    contactsInner.classList.add('footer-contacts__inner--hidden');
  } else if (contactsInner.classList.contains('footer-contacts__inner--hidden')) {
    contactsInner.classList.remove('footer-contacts__inner--hidden');
    contactsInner.classList.add('footer-contacts__inner--shown');
  }
};

contacts.addEventListener('click', function () {
  contactsToggle();
});

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  modal.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  document.body.style.overflow = 'hidden';
};

var closePopup = function () {
  modal.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  document.body.style.overflow = 'visible';
};

modalOpen.addEventListener('click', function () {
  openPopup();
});

modalOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

modalClose.addEventListener('click', function () {
  closePopup();
});

modalClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});
