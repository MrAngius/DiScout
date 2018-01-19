/* UI effects, to make elements appear and disappear */

/* SIDEBARS */
function openCloseSidebar(sidebarId, overlayId) {
    const sideBar = document.getElementById(sidebarId);
    const overlay = document.getElementById(overlayId);
    const isOpen = sideBar.getAttribute('data-open');
    // Control if the sidebar is already open
    if(isOpen=="true") {
        // Close the sidebar
        closeSidebar(sideBar, overlay);
    }
    else {
        // open the sidebar
        openSidebar(sideBar, overlay);
    }
}

function closeSidebar(sidebarElem, overlayElem) {
    // hide the sidebar
    sidebarElem.classList.add('shifted-sidebar');
    sidebarElem.setAttribute('data-open', "false")
    // hide the overlay
    overlayElem.style.display = 'none';
}

function openSidebar(sidebarElem, overlayElem) {
    //show the sidebar
    sidebarElem.classList.remove('shifted-sidebar');
    sidebarElem.setAttribute('data-open', "true")
    //show the overlay
    overlayElem.style.display = 'block';
}

/* GENERAL ITEMS */
function showHideTarget(targetId) {
    const elem = document.getElementById(targetId);
    if(elem.classList.contains('w3-hide')){
        elem.classList.remove('w3-hide');
        elem.classList.add('w3-show');
    }
    else {
        elem.classList.add('w3-hide');
        elem.classList.remove('w3-show');
    }
}

function addRemoveClass(targetElem, className) {
    if(targetElem.classList.contains(className)){
        targetElem.classList.remove(className);
    }
    else {
        targetElem.classList.add(className);
    }
}

/* DROPDOWNS */
function showDropdown(dropdownContentId) {
    const elem = document.getElementById(dropdownContentId);
	if (elem.classList.contains("w3-show"))
        elem.classList.remove("w3-show");
    else 
        elem.classList.add("w3-show");
}
