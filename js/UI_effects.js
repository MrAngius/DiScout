/* UI effects, to make elements appear and disappear */

function closeSidebar(sidebarId, overlayId) {
    document.getElementById(sidebarId).style.display = 'none';
    document.getElementById(overlayId).style.display = 'none';
}

function openSidebar(sidebarId, overlayId) {
    document.getElementById(sidebarId).style.display = 'block';
    document.getElementById(overlayId).style.display = 'block';
}