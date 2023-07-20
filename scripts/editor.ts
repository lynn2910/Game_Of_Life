function find_boxes(): NodeListOf<HTMLElement> {
    return document.querySelectorAll(".box")
}

function register_box(box: HTMLElement){
    let title = box.querySelector(".title") as HTMLElement;

    title.addEventListener("click", function(){
        if (box.classList.contains("closed")) {
            box.classList.remove("closed")
        } else {
            box.classList.add("closed")
        }
    });


    title.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
        e.preventDefault();

        document.addEventListener("mouseup", closeDragElement);
        document.addEventListener("mousemove", elementDrag);
    }

    function elementDrag(e) {
        e.preventDefault();

        box.style.top = e.clientY + "px";
        box.style.left = e.clientX + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.removeEventListener("mouseup", closeDragElement);
        document.removeEventListener("mousemove", elementDrag);
    }
}