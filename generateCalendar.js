//year range before it breaks (min: -271821) (max: 275760)
let year_start = -271821;
let year_end = 275760;
let month_start = 0;
let month_end = 11;
let day_start = 0;
let day_end = 31;

let calendar_MODE = "YEAR";

let year_main = 2021;
window.addEventListener("load", function () {
    document.getElementById("year").value = year_main;
});


function generateYearButtons() {
    const YEAR = year_main;
    document.getElementById("displayYear").innerHTML = `
        ${Number(YEAR) >= Number(year_start + 2) ? `<button onclick="changeYear(-2)">${Number(YEAR) - 2}</button>` : `<button style ="visibility: hidden;">${Number(YEAR) - 2}</button>`}
        ${Number(YEAR) >= Number(year_start + 1) ? `<button onclick="changeYear(-1)">${Number(YEAR) - 1}</button>` : `<button style ="visibility: hidden;">${Number(YEAR) - 1}</button>`}

        <button class="button_main"" >${YEAR}</button>

        ${Number(YEAR) <= Number(year_end - 1) ? `<button onclick="changeYear(+1)">${Number(YEAR) + 1}</button>` : `<button style ="visibility: hidden;">${Number(YEAR) + 1}</button>`}
        ${Number(YEAR) <= Number(year_end - 2) ? `<button onclick="changeYear(+2)">${Number(YEAR) + 2}</button>` : `<button style ="visibility: hidden;">${Number(YEAR) + 2}</button>`}
    `;
}


function generateCalendar_YEAR() {
    const YEAR = year_main;
    const calendarDiv = document.getElementById("calendar");
    calendarDiv.classList.remove("MONTH_Cal");
    calendarDiv.classList.remove("WEEK_Cal");
    calendarDiv.innerHTML = "";

    const month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day_names = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    generateYearButtons();

    // Print all months
    for (let m = 0; m < 12; m++) {
        const monthDiv = document.createElement("div");
        const monthTitle = document.createElement("h3");
        const daysDiv = document.createElement("div");

        const firstDay = new Date(YEAR, m, 0).getDay();
        const totalDays = new Date(YEAR, m + 1, 0).getDate();

        //Print month title
        monthTitle.textContent = month_names[m];
        monthDiv.classList.add("month");
        monthDiv.appendChild(monthTitle);
        daysDiv.classList.add("days");
        daysDiv.id = `Y_${YEAR}-M_${m + 1}`;

        //Print day names
        day_names.forEach(day => {
            const dayHeader = document.createElement("div");
            dayHeader.classList.add("day", "header");
            dayHeader.textContent = day;
            daysDiv.appendChild(dayHeader);
        });

        //Empty gaps for first day of month
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement("div");
            emptyDiv.classList.add("empty");
            emptyDiv.textContent = "X";
            daysDiv.appendChild(emptyDiv);
        }

        //Print all days
        for (let d = 1; d <= totalDays; d++) {
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("day");
            dayDiv.id = `Y_${YEAR}-M_${m + 1}-D_${d}`;
            dayDiv.textContent = d;
            daysDiv.appendChild(dayDiv);
        }


        //Insures dates grid is 6 lines
        let Always_6_lines = 36 - totalDays - firstDay;
        for (let i = 0; i < Always_6_lines; i++) {
            const emptyDiv = document.createElement("div");
            emptyDiv.classList.add("empty");
            emptyDiv.textContent = "X";
            daysDiv.appendChild(emptyDiv);
        }

        monthDiv.appendChild(daysDiv);
        calendarDiv.appendChild(monthDiv);
    }
}

function generateCalendar_MONTH() {
    const YEAR = year_main;
    const calendarDiv = document.getElementById("calendar");
    calendarDiv.style.gridTemplateColumns = `repeat(1, auto)`;
    calendarDiv.classList.remove("WEEK_Cal");
    calendarDiv.classList.add("MONTH_Cal");
    calendarDiv.innerHTML = "";
    const month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    generateYearButtons();

    // Print all months
    for (let m = 0; m < 12; m++) {
        const monthDiv = document.createElement("div");
        const monthTitle = document.createElement("h3");
        const daysDiv = document.createElement("div");
        const totalDays = new Date(YEAR, m + 1, 0).getDate();

        monthTitle.textContent = month_names[m];
        monthDiv.classList.add("month");
        monthDiv.appendChild(monthTitle);
        daysDiv.classList.add("days", "days-rows");
        daysDiv.id = `Y_${YEAR}-M_${m + 1}`;


        //Print all days
        for (let d = 1; d <= totalDays; d++) {
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("day");
            dayDiv.id = `Y_${YEAR}-M_${m + 1}-D_${d}`;
            dayDiv.textContent = d;
            daysDiv.appendChild(dayDiv);
        }

        //fill grid for correct row count when user changes it
        for (let i = 0; i < 31 - totalDays; i++) {
            const emptyDiv = document.createElement("div");
            emptyDiv.classList.add("empty");
            emptyDiv.textContent = "X";
            daysDiv.appendChild(emptyDiv);
        }

        monthDiv.appendChild(daysDiv);
        calendarDiv.appendChild(monthDiv);
    }
}


function generateCalendar_WEEK() {
    const YEAR = year_main;
    const calendarDiv = document.getElementById("calendar");
    // calendarDiv.style.gridTemplateColumns = `repeat(1, auto)`;
    calendarDiv.classList.remove("MONTH_Cal");
    calendarDiv.classList.add("WEEK_Cal");
    calendarDiv.innerHTML = "";
    
    let All_Days= [];
    const day_names = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    generateYearButtons();


    //pushes placeholder days for first week
    const firstDay = new Date(YEAR, 0, 0).getDay(); //First day is 0 cause 1 is Sunday to Saturday
    for (let i = 0; i < firstDay; i++) {
        All_Days.push({
            DAY: 0,
            MONTH: 1//is
        });
    }

    //Pushes days and months
    for (let m = 1; m <= 12; m++) {
        const totalDays = new Date(YEAR, m , 0).getDate();
        for (d = 1; d <= totalDays; d++) {
            All_Days.push({
                DAY: d,
                MONTH: m
            });
        }
    }

    //Pushes weeks to first weekday (+week_YEAR)
    let weekNumber;
    for (let i=0; i<All_Days.length; i=i+7) {
        entry=All_Days[i];
        if ((entry.MONTH == 1 && entry.DAY < 7) || (entry.MONTH == 12 && entry.DAY > 24)) {
            weekNumber = getISOWeekNumber(new Date(YEAR, entry.MONTH-1 , entry.DAY ? entry.DAY : 1));
            if (entry.MONTH == 1 && weekNumber > 51)
                entry.week_YEAR = YEAR-1;
            else if (entry.MONTH == 12 && weekNumber < 2)
                entry.week_YEAR = YEAR+1;
            else
                entry.week_YEAR = YEAR;
        }
        else 
            entry.week_YEAR = YEAR;

        entry.WEEK=weekNumber;
        weekNumber++;
    }

    //Insure the the last week is filled with placeholder days
    const initialLength = All_Days.length;
    const lastEmptyDays =(7 -(initialLength % 7)) % 7;
    for (i = 0; i<lastEmptyDays % 7; i++) {
        if(!All_Days[initialLength + i]) {
            All_Days[initialLength + i] = {
                DAY: 0,
                MONTH: -1
            }
        }
    }

    //Week Container Month
    for (let i=0; i<All_Days.length; i=i+7) {
        const Weekday_FIRST = All_Days[i].MONTH;
        const Weekday_LAST = All_Days[i+6].MONTH;

        if (Weekday_FIRST != Weekday_LAST) {
            All_Days[i].week_Month = `${Weekday_FIRST}/${Weekday_LAST}`;
        } else {
            All_Days[i].week_Month = `${Weekday_FIRST}`;
        }
    }


    //Print day names
    const week_containerDiv = document.createElement("div");
    week_containerDiv.classList.add("week-container");
    week_containerDiv.style.gridColumn = "1";
    week_containerDiv.style.gridRow    = "1";
    week_containerDiv.id = `Y_${YEAR}-Con_${0}`;

    const weekDiv = document.createElement("div");
    weekDiv.classList.add("week");
    weekDiv.textContent = "Weeks";
    
    const daysDiv = document.createElement("div");
    daysDiv.classList.add("days");

    day_names.forEach(day => {
        const dayHeader = document.createElement("div");
        dayHeader.classList.add("day", "header");
        dayHeader.textContent = day;
        daysDiv.appendChild(dayHeader);
    
    });
    week_containerDiv.appendChild(weekDiv);
    week_containerDiv.appendChild(daysDiv);
    calendarDiv.appendChild(week_containerDiv);


    //Print Days
    for (let i=0; i<All_Days.length; i=i+7) {
        const week_containerDiv = document.createElement("div");
        week_containerDiv.classList.add("week-container");
        week_containerDiv.id = `Y_${YEAR}-Con_${1 + i / 7}-M_${All_Days[i].week_Month}`;
        
        const weekDiv = document.createElement("div");
        weekDiv.classList.add("week");
        weekDiv.textContent = `Week ${All_Days[i].WEEK}`;
        weekDiv.classList.add(`Y_${All_Days[i].week_YEAR}-W_${All_Days[i].WEEK}`);
        
        const daysDiv = document.createElement("div");
        daysDiv.classList.add("days");

        for (let j=0; j<7; j++) {
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("day");
            dayDiv.id = `Y_${YEAR}-M_${All_Days[i+j].MONTH}-D_${All_Days[i+j].DAY}`;
            dayDiv.textContent = All_Days[i+j].DAY;
            daysDiv.appendChild(dayDiv);

        }
        week_containerDiv.appendChild(weekDiv);
        week_containerDiv.appendChild(daysDiv);
        calendarDiv.appendChild(week_containerDiv);
    }


    //Change placeholder days to empty
    const dayDiv_First = calendarDiv.children[1].querySelectorAll(".day");
    const daysDiv_Last  = calendarDiv.children[All_Days.length/7].querySelectorAll(".day");
    const emptyDiv = [...dayDiv_First, ...daysDiv_Last];
    emptyDiv.forEach(el => {
        if (el.textContent === "0") {
            el.removeAttribute("id");
            el.removeAttribute("class");
            el.classList.add("empty");
            el.textContent = "X";
        }
    });
}



function updateGrid_MODE_WEEK() {
    const columns = document.querySelector('input[name="columns_WEEK"]:checked').value;
    const calendarDiv = document.getElementById('calendar');

    const cloned = calendarDiv.querySelectorAll(".cloned")
    cloned.forEach(el => {
        el.remove();
    });

    const week_containerDiv = calendarDiv.children;
    let containers_length= week_containerDiv.length-1;


    let max_rows = [];
    let row_start = 1;
    for(i=0; i<columns; i++) {
        max_rows =  Math.ceil(containers_length / (columns-i));
        containers_length -= max_rows;

        for (j = 0; j < max_rows; j++) {
            week_containerDiv[j + row_start].style.gridColumn =`${i+1}`;
            week_containerDiv[j + row_start].style.gridRow    =`${j+2}`;
        }
        row_start += max_rows;
    }

    for (i=0; i <columns-1; i++) {
        const header_el = week_containerDiv[0].cloneNode(true);
        header_el.id += `_clone_${i}`;
        header_el.classList.add("cloned");
        header_el.style.gridColumn=`${i+2}`;
        header_el.style.gridRow=`1`;
        calendarDiv.append(header_el)
    }

    calendarDiv.style.gridTemplateColumns = `repeat(${columns}, auto)`;
}

function Display_MONTHS() {
    const showMonths = document.getElementById("showMonths").checked;
    const style = document.getElementById("style_days_rows");
    const month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (!showMonths) {
        const monthHeader = document.querySelectorAll(".month_header");
        monthHeader.forEach(el => {
            el.remove();
        });
        style.innerHTML = `
        .week-container {
            grid-template-columns: repeat(2, auto);
        }`;
    }
    else {
        style.innerHTML = `
        .week-container {
            grid-template-columns: repeat(3, auto);
        }`;
    
        const week_containerDiv=document.querySelectorAll(".week-container");
        week_containerDiv.forEach(el => {
            const monthHeader = document.createElement("div");
            monthHeader.classList.add("month_header");

            if (el.classList.contains("cloned") || el === el.parentElement.firstElementChild) {
                monthHeader.textContent = `Months`;
                el.insertBefore(monthHeader, el.children[0]);
                el.style.gridTemplateColumns= `repeat(3, auto)`;
                return;
            }

            const week_containerID=el.id;
            const MonthIndex = week_containerID.lastIndexOf('M') + 2; // ID: ...M_3 so +2
            let MonthID = week_containerID.substring(MonthIndex);
            
            let MONTH = MonthID.match(/\d+/g).map(Number);
            for (let i=0; i<MONTH.length; i++) {
                MONTH[i]= month_names[MONTH[i]-1];
            }
            if (MONTH.length>1) {
                MONTH[2]=MONTH[1];
                MONTH[1]= "/";
                MONTH = MONTH.join(" ");
            }

            monthHeader.textContent = `${MONTH}`;
            el.insertBefore(monthHeader, el.children[0]);
            el.style.gridTemplateColumns= `repeat(3, auto)`;
        });
    }
}