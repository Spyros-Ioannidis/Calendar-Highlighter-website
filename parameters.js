function changeYear(offset) {
    year_main += offset;
    document.getElementById('year').value = year_main;
    CreateCalendar();
}


function input_enter_Cal() {
    if (event.key === 'Enter') {
        year_main = parseInt(document.getElementById('year').value);
        CreateCalendar();
    }
}

function input_enter_Update_DT_String() {
    if (event.key === 'Enter') {
        Update_DateTitle_Index_String();
    }
}

function input_enter_Update_DT_Count() {
    if (event.key === 'Enter') {
        Update_DateTitle_Index_Count();
    }
}


function updateGrid() {
    const columns = document.querySelector('input[name="columns_YEAR"]:checked').value;
    const calendarDiv = document.getElementById('calendar');
    calendarDiv.style.gridTemplateColumns = `repeat(${columns}, auto)`;
}

function updateGrid_MODE_MONTH() {
    const rows = document.querySelector('input[name="rows_MONTH"]:checked').value;
    const columns = Math.ceil(31/rows)
    const style = document.getElementById("style_days_rows");
    style.innerHTML = `
    .days.days-rows {
        grid-template-columns: repeat(${columns}, auto);
    }`;
}


function adjust_calendar_wrapper_height() {
    let header_height =parseFloat(window.getComputedStyle(document.body).getPropertyValue('--header_height'));
    let calendar_wrapper = document.getElementById('calendar-wrapper');
    calendar_wrapper.style.height = `calc(100vh - ${displayYear.offsetHeight}px - ${header_height}px)`;
}


document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    const formElements = ['INPUT'];
    if (!formElements.includes(e.target.tagName)) {
        if (e.keyCode == 88) {
            if (parameters.classList.contains("show")) {
                sidebar_close();
            }
            else {
                sidebar_open();
            }
        }
        else if (e.keyCode == 37 && year.value > year_start) {// right arrow
            changeYear(-1);
        }
        else if (e.keyCode == 39 && year.value < year_end) {// right arrow
            changeYear(1);
        }
    }
}

function validateLength(value, id) {
    if (value > 275760)
        document.getElementById(id).value = 275760;

    if (value < -271821)
        document.getElementById(id).value = -271821;
}

function sidebar_open() {
    parameters.classList.add("show");
}


function sidebar_close() {
    parameters.classList.remove("show");
}



// Get FileInput elements
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileName');

    fileInput.addEventListener('change', () => {
        const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'No file chosen';
        fileNameDisplay.textContent = fileName;
    });
});


// Get DateTitle_Index (...String, ...Count)
document.addEventListener("DOMContentLoaded", function () {
    DateTitle_Index_String = document.getElementById("ID_DateTitle_Index_String").value || "";
    PREV_DateTitle_Index_String = DateTitle_Index_String;

    DateTitle_Index_Count = parseInt(document.getElementById("ID_DateTitle_Index_Count").value) || 1;
    PREV_DateTitle_Index_Count = DateTitle_Index_Count;
});


function Update_DateTitle_Index_String() {
    DateTitle_Index_String = document.getElementById("ID_DateTitle_Index_String").value  || "";
    
    //
    if (PREV_DateTitle_Index_String != DateTitle_Index_String) {
        PREV_DateTitle_Index_String = DateTitle_Index_String
        console.log("Updated: DateTitle_Index_String");
        if (document.getElementById('ID_showDateIndex').checked) {
            if (Object.keys(LIST_DATES).length != 0) {
                Highlight_Dates();
                Highlight_Weeks();
                
            }
            else {
                console.log("There are no highlighted dates")
            }
        }
    }
    else {
        console.log("DateTitle Index String hasn't updated, Input new Index String");
    }
}


function Update_DateTitle_Index_Count() {
    DateTitle_Index_Count = parseInt(document.getElementById("ID_DateTitle_Index_Count").value) || 0;
    
    //
    if (PREV_DateTitle_Index_Count != DateTitle_Index_Count) {
        PREV_DateTitle_Index_Count = DateTitle_Index_Count;
        console.log("Updated: DateTitle_Index_Count");
        if (document.getElementById('ID_showDateIndex').checked) {
            if (Object.keys(LIST_DATES).length != 0) {
                Highlight_Dates();
                Highlight_Weeks();
            }
            else {
                console.log("There are no highlighted dates")
            }
        }
    }
    else {
        console.log("DateTitle Index Count hasn't updated, Input new Index Count");
    }
}



let EX_Times = {};

function ADD_Times(key, value) {
    if(value===0) {
        return;
    }
    if (!EX_Times[key]) {
        EX_Times[key] = {
            value: value,
            Count: 0
        }
    };
    EX_Times[key].value += value;
    EX_Times[key].Count++;
}


function avg_Time() {
    let avarage = "";
    let styles = [];

    for (const key in EX_Times) {
        const count = EX_Times[key].Count;
        const avg = EX_Times[key].value / count;

        avarage += `%c${key} (${count}): %c${avg}\n`;
        styles.push("color: rgb(20, 210, 58);");
        styles.push("color: rgb(191, 10, 179);");
    }

    console.log(avarage, ...styles);
}

function Clear_avg_Time() {
    EX_Times = {};
}