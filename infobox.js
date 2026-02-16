document.addEventListener("click", function(event) {
    const activeInfos = document.querySelectorAll(".icon_info.i_active");
    activeInfos.forEach(icon => {
        if (!icon.contains(event.target)) {
            icon.classList.remove("i_active");
            icon.classList.add("i_inactive");
            icon.querySelector(".infoBox").style.display = "none";
        }
    });
});



function info_icon_switch(event, info_id) {
    event.stopPropagation(); // prevent document click from firing immediately
    if (event.target.closest(".infoBox")) {
        return;
    }
    document.addEventListener("click", clickOutsideListener);

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
        element_info.classList.remove("i_inactive");
        element_info.classList.add("i_active");
        element_infoBox.style.display = "block";
    }
}

//========================================================================
function clickOutsideListener(event) {
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
//========================================================================


function info_icon_switch(event, info_id) {
    // if the click originated inside the infoBox, ignore it
    if (event.target.closest(".infoBox")) {
        return;
    }
    element_info = document.getElementById(info_id);
    element_infoBox = document.getElementById(info_id.concat("_Box"));
    console.log(element_infoBox)
    //console.log(element_info);
    if (element_info.classList.contains("i_inactive")) {
        element_info.classList.remove("i_inactive");
        element_info.classList.add("i_active");
        element_infoBox.style.display = "block";

        document.addEventListener("click", clickOutsideListener);
    }
    else {
        element_info.classList.remove("i_active");
        element_info.classList.add("i_inactive");
        element_infoBox.style.display = "none";

        document.removeEventListener("click", clickOutsideListener);
    }

    function clickOutsideListener(e) {
        // If click is NOT on the info icon or its infoBox, close it
        if (!element_info.contains(e.target)) {
            element_info.classList.remove("i_active");
            element_info.classList.add("i_inactive");
            element_infoBox.style.display = "none";
            document.removeEventListener("click", clickOutsideListener);
        }
    }
}