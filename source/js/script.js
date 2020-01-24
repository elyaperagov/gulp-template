'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var modal = document.querySelector('.modal');
var modalFrame = document.querySelector('.modal__frame');
var modalOpen = document.querySelector('.button--contacts');
var modalClose = modal.querySelector('.modal__close');
var contentsInner = document.querySelector('.contents__inner');
var contents = document.querySelector('.contents');
var contacts = document.querySelector('.footer-contacts');
var contactsInner = document.querySelector('.footer-contacts__inner');
var modalName = modal.querySelector('input[type="text"]');
var modalTel = modal.querySelector('input[type="tel"]');
var modalQuestion = modal.querySelector('#modal-text');
var info = document.querySelector('.button--info');
var form = document.querySelector('.form');
var scroll = document.querySelector('.info__scroll');
var about = document.querySelector('.about');

info.addEventListener('click', function () {
  form.scrollIntoView({
    block: 'center', behavior: 'smooth'}
  );
});

scroll.addEventListener('click', function () {
  about.scrollIntoView({
    block: 'center', behavior: 'smooth'}
  );
});

var saveInLocalStorage = function () {
  if (modalName.value && modalTel.value && modalQuestion.value) {
    var data = {
      name: modalName.value,
      telephone: modalTel.value,
      question: modalQuestion.value
    };

    localStorage.setItem('data', JSON.stringify(data));
  }
};

var checkValidFields = function (a, b, c) {
  [a, b, c].forEach(function (item) {
    item.onblur = function () {
      if (item.value !== null) {
        saveInLocalStorage();
      }
    };
  });
};

checkValidFields(modalName, modalTel, modalQuestion);


window.setTimeout(function () {
  localStorage.removeItem('data');
}, 2000);


var contentsToggle = function (arg) {
  if (arg.classList.contains('show')) {
    arg.classList.remove('show');
    arg.classList.add('hide');
  } else if (arg.classList.contains('hide')) {
    arg.classList.remove('hide');
    arg.classList.add('show');
  }
};

contents.addEventListener('click', function () {
  contentsToggle(contentsInner);
});

contacts.addEventListener('click', function () {
  contentsToggle(contactsInner);
});

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  modal.classList.remove('hidden');
  modalName.focus();
  modalClose.addEventListener('click', closePopup);
  modalFrame.addEventListener('click', closePopup);
  document.addEventListener('keydown', onPopupEscPress);
  document.body.style.overflow = 'hidden';
};

var closePopup = function () {
  modal.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  modalClose.removeEventListener('click', closePopup);
  modalFrame.removeEventListener('click', closePopup);
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
