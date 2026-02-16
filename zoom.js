let zoomArr = [0.4, 0.5, 0.67, 0.75, 0.8, 0.90, 1, 1.10, 1.25, 1.5 , 1.75, 2.00 , 2.50, 3.00];
let indexofArr = 7;
let element_calendar = document.getElementById("calendar");;
let zoom_value;


document.addEventListener("DOMContentLoaded", function () {
    element_calendar = document.getElementById("calendar");
});

function zoom_options() {
    let val = document.querySelector("#sel").value;
    val = Number(val);
    indexofArr = zoomArr.indexOf(val);
    element_calendar.style.fontSize = `${val}em`;
}

function zoom_in() {
    if (indexofArr < zoomArr.length - 1) {
        indexofArr += 1;
        zoom_value = zoomArr[indexofArr];
        document.querySelector("#sel").value = zoom_value;
        element_calendar.style.fontSize = `${zoom_value}em`;
    }
}

function zoom_out() {
    if (indexofArr > 0) {
        indexofArr -= 1;
        zoom_value = zoomArr[indexofArr];
        document.querySelector("#sel").value = zoom_value;
        element_calendar.style.fontSize = `${zoom_value}em`;
    }
}

function zoom_reset() {
    if (indexofArr > 0) {
        indexofArr = 6;
        zoom_value = zoomArr[indexofArr];
        document.querySelector("#sel").value = zoom_value;
        element_calendar.style.fontSize = `${zoom_value}em`;
    }
}

function zoom_menu_visibility(event) {
    event.stopPropagation(); // prevent document click from firing immediately
    if (event.target.closest("zoom_menu")) {
        return;
    }

    const zoom_menu = document.getElementById("zoom_menu");
    if (zoom_menu.classList.contains("show")) {
        zoom_menu.classList.remove("show");
    } else {
        zoom_menu.classList.add("show");
        document.addEventListener("click", clickOutsideListener__zoom_menu);
    }
}


function clickOutsideListener__zoom_menu(event) {
    console.log("click_zoom");
    const zoom_menu = document.getElementById("zoom_menu");
    if (!zoom_menu.contains(event.target)) {
        zoom_menu.classList.remove("show");
        document.removeEventListener("click", clickOutsideListener__zoom_menu);
    }
}


//=========================================================================
//=========================================================================

function info_icon_switch(event, info_id) {
    event.stopPropagation(); // prevent document click from firing immediately
    if (event.target.closest(".infoBox")) {
        return;
    }
    document.removeEventListener("click", clickOutsideListener);

    const element_info = document.getElementById(info_id);
    const element_infoBox = document.getElementById(info_id + "_Box");

    const isActive = element_info.classList.contains("i_active");

    // Close all other infoboxes
    document.querySelectorAll(".icon_info.i_active").forEach(icon => {
        icon.classList.remove("i_active");
        icon.classList.add("i_inactive");
        icon.querySelector(".infoBox").style.display = "none";
    });

    if (!isActive) {
        document.addEventListener("click", clickOutsideListener);
        element_info.classList.remove("i_inactive");
        element_info.classList.add("i_active");
        element_infoBox.style.display = "block";
    }
}

function clickOutsideListener(event) {
    console.log("click");
    const activeInfos = document.querySelectorAll(".icon_info.i_active");
    activeInfos.forEach(icon => {
        if (!icon.contains(event.target)) {
            icon.classList.remove("i_active");
            icon.classList.add("i_inactive");
            icon.querySelector(".infoBox").style.display = "none";
            document.removeEventListener("click", clickOutsideListener);
        }
    });
}

// Function to replace text in all <span style="color: darkorange;">text</span> elements
function replaceTextWithRandomNumbers() {
    const startTime = performance.now();
    const spans = document.querySelectorAll("span[style='color: darkorange;']");
    spans.forEach(span => {
        span.textContent = Math.floor(Math.random() * 1000);
    });
    const endTime = performance.now();
    console.log(`generateCalendar: ${endTime - startTime} milliseconds`);
}