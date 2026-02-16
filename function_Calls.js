function options_Animation(option) {
    const MODES = ["YEAR", "MONTH", "WEEK"];

    const option_before = document.querySelector(".options_MODES.show");
    const option_after  = document.getElementById(`option_MODE_${option}`);

    if (option_before === option_after) {
        return;
    }

    const Calendar_MODES =document.getElementById("Calendar_MODES");
    Calendar_MODES.style.pointerEvents ="none";

    const index_option_before = MODES.indexOf(`${option_before.id.substring(12)}`);
    const index_option_after = MODES.indexOf(`${option}`);

    let direction_option_before = "shift_left";
    let direction_option_after  = "shift_right";

    if(index_option_after > index_option_before) {
        direction_option_before = "shift_right";
        direction_option_after  = "shift_left";
    }

    const TOP  = option_before.getBoundingClientRect().top;
    const LEFT = option_before.getBoundingClientRect().left;

    option_before.style.position = `absolute`;
    option_before.style.top  = `${TOP}`;
    option_before.style.left = `${LEFT}`;

    // console.log(TOP, LEFT);

    option_before.classList.add(direction_option_before);
    option_after.classList.add("show");
    option_after.classList.add(direction_option_after, "shift_reverse");

    setTimeout(() => {
        option_before.classList.remove(direction_option_before);
        option_before.classList.remove("show");
        
        option_after.classList.remove(direction_option_after, "shift_reverse");
        option_before.style.position = ``;
        option_before.style.top  = ``;
        option_before.style.left = ``;
        Calendar_MODES.style.pointerEvents = "";
    }, "250");
}


function CreateCalendar() {
    let ShowWeeks = document.getElementById("showWeeks").checked;
    let Time__Display_Weeks = 0;
    let Time__Calendar = 0;
    let Time__Highlight_Dates = 0;
    let Time__Highlight_Weeks = 0;
    let Time__Fade_Dates = 0;
    let Time__Faded_Weeks = 0;
    let startTime__generateCalendar = 0;
    let endTime__generateCalendar = 0;

    switch (calendar_MODE) {
        case "YEAR":
            startTime__generateCalendar = performance.now();
            options_Animation("YEAR");
            generateCalendar_YEAR();
            updateGrid();
            endTime__generateCalendar = performance.now();

            if (ShowWeeks) { //Display_Weeks works only for generateCalendar_YEAR, it breaks the rest
                const startTime__Display_Weeks = performance.now();
                Display_Weeks(ShowWeeks);
                const endTime__Display_Weeks = performance.now();
                Time__Display_Weeks = endTime__Display_Weeks - startTime__Display_Weeks;
            }

            Time__Calendar = endTime__generateCalendar - startTime__generateCalendar;
            break;

        case "MONTH":
            startTime__generateCalendar = performance.now();
            ShowWeeks = false; //In generateCalendar_MONTH there arent any weeks to Highlight and Fade
            options_Animation("MONTH");
            generateCalendar_MONTH();
            updateGrid_MODE_MONTH()
            endTime__generateCalendar = performance.now();
            Time__Calendar = endTime__generateCalendar - startTime__generateCalendar;
            break;

        case "WEEK":
            startTime__generateCalendar = performance.now();
            ShowWeeks = true; //In order to Highlight and Fade weeks
            options_Animation("WEEK");
            generateCalendar_WEEK();
            updateGrid_MODE_WEEK();
            Display_MONTHS();
            endTime__generateCalendar = performance.now();
            Time__Calendar = endTime__generateCalendar - startTime__generateCalendar;
            break;

        default:
            console.log("Incorect Mode option");
    }


    if (Object.keys(LIST_DATES).length != 0) {
        const startTime__Highlight_Dates = performance.now();
        Highlight_Dates();
        const endTime__Highlight_Dates = performance.now();

        const startTime__Fade_Dates = performance.now();
        Fade_Dates();
        const endTime__Fade_Dates = performance.now();

        if (ShowWeeks) {
            const startTime__Highlight_Weeks = performance.now();
            Highlight_Weeks();
            const endTime__Highlight_Weeks = performance.now();

            const startTime__Fade_Weeks = performance.now();
            Fade_Weeks();
            const endTime__Fade_Weeks = performance.now();

            Time__Highlight_Weeks = endTime__Highlight_Weeks - startTime__Highlight_Weeks;
            Time__Faded_Weeks = endTime__Fade_Weeks - startTime__Fade_Weeks;
        }
        Time__Highlight_Dates = endTime__Highlight_Dates - startTime__Highlight_Dates;
        Time__Fade_Dates = endTime__Fade_Dates - startTime__Fade_Dates
    }

    ADD_Times("generateCalendar", Time__Calendar);
    ADD_Times("Display_Weeks   ", Time__Display_Weeks);
    ADD_Times("Highlight_Dates ", Time__Highlight_Dates);
    ADD_Times("Highlight_Weeks ", Time__Highlight_Weeks);
    ADD_Times("Fade_Dates      ", Time__Fade_Dates);
    ADD_Times("Faded_Weeks     ", Time__Faded_Weeks);

    if (document.getElementById("log_Switch").checked) {
        console.log(
            "%cgenerateCalendar %c" + Time__Calendar +
            "\n%cDisplay_Weeks %c" + Time__Display_Weeks +
            "\n%cHighlight_Dates %c" + Time__Highlight_Dates +
            "\n%cHighlight_Weeks %c" + Time__Highlight_Weeks +
            "\n%cDade_Dates %c" + Time__Fade_Dates +
            "\n%cFaded_Weeks %c" + Time__Faded_Weeks,

            "color: rgb(20, 210, 58);", "color: rgb(191, 10, 179);",
            "color: rgb(20, 210, 58);", "color: rgb(191, 10, 179);",
            "color: rgb(20, 210, 58);", "color: rgb(191, 10, 179);",
            "color: rgb(20, 210, 58);", "color: rgb(191, 10, 179);",
            "color: rgb(20, 210, 58);", "color: rgb(191, 10, 179);",
            "color: rgb(20, 210, 58);", "color: rgb(191, 10, 179);"
        );
    }
}


function Highlight_ALL() {
    let Time__Highlight_Weeks = 0;

    const startTime__Highlight_Dates = performance.now();
    Highlight_Dates();
    const endTime__Highlight_Dates = performance.now();

    if (Object.keys(LIST_WEEKS).length != 0 && document.getElementById("showWeeks").checked) {
        console.log("test");
        const startTime__Highlight_Weeks = performance.now();
        Highlight_Weeks();
        const endTime__Highlight_Weeks = performance.now();

        Time__Highlight_Weeks = endTime__Highlight_Weeks - startTime__Highlight_Weeks;
    }

    const Time__Highlight_Dates = endTime__Highlight_Dates - startTime__Highlight_Dates;

    ADD_Times("Highlight_Dates ", Time__Highlight_Dates);
    ADD_Times("Highlight_Weeks ", Time__Highlight_Weeks);


    if (document.getElementById("log_Switch").checked) {
        console.log(
            "%cHighlight_Dates %c" + Time__Highlight_Dates +
            "\n%cHighlight_Weeks %c" + Time__Highlight_Weeks,

            "color: rgb(20, 210, 58);", "color: rgb(191, 10, 179);",
            "color: rgb(20, 210, 58);", "color: rgb(191, 10, 179);"
        );
    }
}


function DO_Weeks() {
    const ShowWeeks = document.getElementById("showWeeks").checked;
    let Time__Highlight_Weeks = 0;
    let Time__Faded_Weeks = 0;

    const startTime__Display_Weeks = performance.now();
    Display_Weeks(ShowWeeks);
    const endTime__Display_Weeks = performance.now();

    if (Object.keys(LIST_WEEKS).length != 0 && ShowWeeks) {
        const startTime__Highlight_Weeks = performance.now();
        Highlight_Weeks();
        const endTime__Highlight_Weeks = performance.now();


        const startTime__Fade_Weeks = performance.now();
        Fade_Weeks();
        const endTime__Fade_Weeks = performance.now();

        Time__Highlight_Weeks = endTime__Highlight_Weeks - startTime__Highlight_Weeks;
        Time__Faded_Weeks = endTime__Fade_Weeks - startTime__Fade_Weeks;
    }

    const Time__Display_Weeks = endTime__Display_Weeks - startTime__Display_Weeks;

    ADD_Times("Display_Weeks   ", Time__Display_Weeks);
    ADD_Times("Highlight_Weeks ", Time__Highlight_Weeks);
    ADD_Times("Faded_Weeks     ", Time__Faded_Weeks);


    if (document.getElementById("log_Switch").checked) {
        console.log(
            "%cDisplay_Weeks %c" + Time__Display_Weeks +
            "\n%cHighlight_Weeks %c" + Time__Highlight_Weeks +
            "\n%cFaded_Weeks %c" + Time__Faded_Weeks,

            "color: rgb(20, 210, 58);", "color: rgb(191, 10, 179);",
            "color: rgb(20, 210, 58);", "color: rgb(191, 10, 179);",
            "color: rgb(20, 210, 58);", "color: rgb(191, 10, 179);"
        );
    }
}
