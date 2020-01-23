'use strict';
/* stylelint-disable */
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

window.addEventListener('DOMContentLoaded', function() {
    [].forEach.call( document.querySelectorAll('#phone'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = '+7 (___) ___ ____',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, ''),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf('_');
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return '\\d{1,' + a.length + '}'
            }).replace(/[+()]/g, '\\$&');
        reg = new RegExp('^' + reg + '$');
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == 'blur' && this.value.length < 5)  this.value = ''
    }

    input.addEventListener('input', mask, false);
    input.addEventListener('focus', mask, false);
    input.addEventListener('blur', mask, false);
    input.addEventListener('keydown', mask, false)

  });

});
