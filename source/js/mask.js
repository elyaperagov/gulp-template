/*eslint-disable*/
'use strict';

window.addEventListener('DOMContentLoaded', function () {
  var keyCode;
  function mask(event) {
    event.keyCode && (keyCode = event.keyCode);
    var pos = this.selectionStart;
    if (pos < 3) event.preventDefault();
    var matrix = '+7 (___) ___ ____',
      i = 0,
      def = matrix.replace(/\D/g, ''),
      val = this.value.replace(/\D/g, ''),
      newValue = matrix.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
    i = newValue.indexOf('_');
    if (i !== -1) {
      i < 5 && (i = 3);
      newValue = newValue.slice(0, i);
    }
    var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return '\\d{1,' + a.length + '}';
        }).replace(/[+()]/g, '\\$&');
    reg = new RegExp('^' + reg + '$');
    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
      this.value = newValue;
    }
    if (event.type === 'blur' && this.value.length < 5) {
      this.value = '';
    }
  }

  var inputModal = document.querySelector('#modal-phone');
  inputModal.addEventListener('input', mask, false);
  inputModal.addEventListener('focus', mask, false);
  inputModal.addEventListener('blur', mask, false);
  inputModal.addEventListener('keydown', mask, false);

  var inputForm = document.querySelector('#feedback-phone');
  inputForm.addEventListener('input', mask, false);
  inputForm.addEventListener('focus', mask, false);
  inputForm.addEventListener('blur', mask, false);
  inputForm.addEventListener('keydown', mask, false);
});
