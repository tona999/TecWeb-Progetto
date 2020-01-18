function hideMenu(){
    var menu = document.getElementById("profileMenu");
    var c = "hidden";
    menu.classList.contains(c)?
        menu.classList.remove(c):
        menu.classList.add(c);
}