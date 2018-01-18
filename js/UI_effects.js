/* UI effects, to make elements appear and disappear */

function closeSidebar(sidebarId, overlayId) {
    document.getElementById(sidebarId).style.display = 'none';
    document.getElementById(overlayId).style.display = 'none';
}

function openSidebar(sidebarId, overlayId) {
    document.getElementById(sidebarId).style.display = 'block';
    document.getElementById(overlayId).style.display = 'block';
}

function showDropdown(dropdownContentId) {
	let elem = document.getElementById(dropdownContentId)
	if (elem.classList.contains("w3-show"))
        elem.classList.remove("w3-show");
    else 
        elem.classList.add("w3-show");
}
