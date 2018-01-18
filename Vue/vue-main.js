let vue_one
window.addEventListener('load', function () {
    vue_one = new Vue({
        el: '#vue',
    });
    loadDB('database.json')
});

