export default {
  methods: {
    addRemoveClass: function (targetElem, className) {
      if (targetElem.classList.contains(className)) {
        targetElem.classList.remove(className);
      }
      else {
        targetElem.classList.add(className);
      }
    },

    myDebug: function (msg) {
      alert(msg)
    },

    showHideTargetMobile: function (targetId) {
      // as the previous one, but on small screens
      const elem = document.getElementById(targetId);
      if (elem.classList.contains('w3-hide-small')) {
        elem.classList.remove('w3-hide-small');
        elem.classList.add('w3-show-small');
      }
      else {
        elem.classList.add('w3-hide-small');
        elem.classList.remove('w3-show-small');
      }
    },

    showHideTarget: function (targetId) {
      const elem = document.getElementById(targetId);
      if (elem.classList.contains('w3-hide')) {
        elem.classList.remove('w3-hide');
        elem.classList.add('w3-show');
      }
      else {
        elem.classList.add('w3-hide');
        elem.classList.remove('w3-show');
      }
    }
  }

}
