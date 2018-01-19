Vue.component('navbar', {
    template: `
    <nav id="navigation" class="w3-black w3-bar">
        <a href="#" class="w3-bar-item w3-button w3-mobile w3-hover-teal">Menu item 1</a>
        <a href="#" class="w3-bar-item w3-button w3-mobile w3-hover-teal">Menu item 2</a>
        <a href="#" class="w3-bar-item w3-button w3-mobile w3-hover-teal">Menu item 3</a>
        <div class="w3-bar-item w3-button w3-mobile w3-hover-teal w3-dropdown-click w3-right" style="padding: 0;">
            <div class="w3-padding" onclick="showDropdown('userDropdown'); addRemoveClass(this, 'w3-teal')">
                <img src="img/user.png" alt="" id="user_icon" class="w3-circle w3-white" />
                Welcome, user! <i class="fa fa-caret-down"></i>
            </div>

            <div class="w3-dropdown-content w3-bar-block w3-card-4" id="userDropdown" style="min-width: 100%;">
                <a href="#" class="w3-bar-item w3-button w3-border-bottom">User item 1</a>
                <a href="#" class="w3-bar-item w3-button w3-border-bottom">User item 2</a>
                <a href="#" class="w3-bar-item w3-button w3-border-bottom">User item 3</a>
                <a href="#" class="w3-bar-item w3-button w3-border-bottom">User item 4</a>
            </div>
        </div>
        <div class="w3-clear"></div>
    </nav>
    `
})