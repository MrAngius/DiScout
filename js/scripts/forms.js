/*
* This script contains useful functions to manipulate forms and their content
* */

function checkAll() {
    // This function checks all the checkboxes in the current page
    var checks = document.querySelectorAll('input[type=checkbox]');
    for (var i = 0; i < checks.length; i++) {
        checks[i].checked = true;
    }
}

function uncheckAll() {
    // This function unchecks all the checkboxes in the current page
    var checks = document.querySelectorAll('input[type=checkbox]');
    for (var i = 0; i < checks.length; i++) {
        checks[i].checked = false;
    }
}
