let LIST_DATES = {};
let LIST_WEEKS = {};

let Date_Index_String = "";
let Prev_Date_Index_String = "";
let Date_Index_Count = 1;

function readFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file first.");
        return;
    }

    const isTxtFile =
        file.type === "text/plain" ||
        file.name.toLowerCase().endsWith(".txt");

    if (!isTxtFile) {
        alert("Please select a valid .txt file.");
        fileInput.value = "";
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const fileContent = event.target.result;
        FILL_ALL(fileContent);
    };
    reader.readAsText(file);
}

function loadDatesFromJSFile(Preloaded_File) {
    if (typeof Preloaded_File === "undefined") {
        console.error("Preloaded_File  is not defined");
        return;
    }

    FILL_ALL(Preloaded_File);
}


function FILL_ALL(Date_Content) {
    const startTime__FILL_highlightedDates = performance.now();
    FILL_highlightedDates(Date_Content)
    const endTime__FILL_highlightedDates = performance.now();

    const startTime__YearRange = performance.now()
    YearRange();
    const endTime__YearRange = performance.now();

    const startTime__FILL_highlightedWeeks = performance.now();
    FILL_highlightedWeeks();
    const endTime__FILL_highlightedWeeks = performance.now();

    const Time__FILL_highlightedDates = endTime__FILL_highlightedDates - startTime__FILL_highlightedDates;
    const Time__FILL_highlightedWeeks = endTime__FILL_highlightedWeeks - startTime__FILL_highlightedWeeks;
    const Time__YearRange = endTime__YearRange - startTime__YearRange;
    
    
    ADD_Times("FILL_highlightedDates", Time__FILL_highlightedDates);
    ADD_Times("FILL_highlightedWeeks", Time__FILL_highlightedWeeks);
    ADD_Times("YearRange            ", Time__YearRange);
    
    if(document.getElementById("log_Switch").checked) {
        console.log(
            "%cFILL_highlightedDates %c" + Time__FILL_highlightedDates +
            "\n%cFILL_highlightedWeeks %c" + Time__FILL_highlightedWeeks +
            "\n%cYearRange %c" + Time__YearRange,
            
            "color: rgb(20, 210, 58);", "color: rgb(191, 10, 179);",
            "color: rgb(20, 210, 58);", "color: rgb(191, 10, 179);",
            "color: rgb(20, 210, 58);", "color: rgb(191, 10, 179);"
        );
    }

    current_year = year_main;
    if (current_year < year_start) {
        year_main = year_start;
        CreateCalendar();
    }
    else if (current_year > year_end) {
        year_main = year_end;
        CreateCalendar();
    }
    else
        CreateCalendar();
}



function FILL_highlightedDates(Date_Content) {
    LIST_DATES = {}
    let DateTitle_index=0;
    const lines = Date_Content.trim().split("\n");
    lines.forEach(line => {
        // Try to match format 1: YEAR MONTH DAY
        const DateInput_format = line.trim().match(/^(\d+)\s+(\d+)\s+(\d+)(?:\s+"(.+?)")?$/)?.slice(1);

        if (DateInput_format) {
            YEAR = parseFloat(DateInput_format[0]);
            MONTH = parseFloat(DateInput_format[1]);
            DAY = parseFloat(DateInput_format[2]);


            if (!LIST_DATES[YEAR])
                LIST_DATES[YEAR] = {};

            if (!LIST_DATES[YEAR][MONTH])
                LIST_DATES[YEAR][MONTH] = {};

            if (!LIST_DATES[YEAR][MONTH][DAY])
                LIST_DATES[YEAR][MONTH][DAY] = {
                    DateTitle_index: DateTitle_index,
                    Count: 0,
                    DateTitle: []
                };
            LIST_DATES[YEAR][MONTH][DAY].Count++;

            DateTitle = DateInput_format[3] ? DateInput_format[3] : null;
            LIST_DATES[YEAR][MONTH][DAY].DateTitle.push(DateTitle);

            DateTitle_index++;
        }
    })
}



function FILL_highlightedWeeks() {
    LIST_WEEKS = {};
    const flatDates = [];

    //Flateen Dates
    for (const year in LIST_DATES) {
        for (const month in LIST_DATES[year]) {
            for (const day in LIST_DATES[year][month]) {
                flatDates.push({
                    YEAR: Number(year),
                    MONTH: Number(month),
                    DAY: Number(day),
                    DateTitle_index: LIST_DATES[year][month][day].DateTitle_index,
                    Count: LIST_DATES[year][month][day].Count,
                    DateTitle: LIST_DATES[year][month][day].DateTitle
                });
            }
        }
    }

    //Fill Weeks from flatDates
    for (let i = 0; i < flatDates.length; i++) {
        const entry = flatDates[i];
        const { YEAR, WEEK } = getISOWeekInfo(new Date(entry.YEAR, entry.MONTH - 1, entry.DAY));

        if (!LIST_WEEKS[YEAR])
            LIST_WEEKS[YEAR] = {};

        if (!LIST_WEEKS[YEAR][WEEK])
            LIST_WEEKS[YEAR][WEEK] = {
                DateTitle_index: LIST_DATES[entry.YEAR][entry.MONTH][entry.DAY].DateTitle_index,
                Count: 0,
                DateTitle: []
            };

        LIST_WEEKS[YEAR][WEEK].Count += LIST_DATES[entry.YEAR][entry.MONTH][entry.DAY].Count;
        DateTitle = LIST_DATES[entry.YEAR][entry.MONTH][entry.DAY].DateTitle ?? 0;
        if (DateTitle) {
            LIST_WEEKS[YEAR][WEEK].DateTitle.push(...DateTitle);
        }
    }
}


function YearRange() {
    let KEY_YEARS = Object.keys(LIST_DATES).map(Number);

    if (KEY_YEARS.length === 0) {
        console.log("No years_key available");
    } else {
        year_start = Math.min(...KEY_YEARS);
        year_end = Math.max(...KEY_YEARS);

        const month_start_key = Object.keys(LIST_DATES[year_start]).map(Number);
        const month_end_key = Object.keys(LIST_DATES[year_end]).map(Number);

        month_start = Math.min(...month_start_key);
        month_end = Math.max(...month_end_key);

        const day_start_key = Object.keys(LIST_DATES[year_start][month_start]).map(Number);
        const day_end_key = Object.keys(LIST_DATES[year_end][month_end]).map(Number);

        day_start = Math.min(...day_start_key);
        day_end = Math.max(...day_end_key);
    }
}




function Clear_LISTS() {
    const startTime__Clear_LISTS = performance.now();
    
    LIST_DATES = {};
    LIST_WEEKS = {};
    year_start = -271821;
    year_end = 275760;
    month_start = 0;
    month_end = 11;
    day_start = 0;
    day_end = 31;

    const el_tooltip_div =document.querySelectorAll('.tooltip-div');
    const el_tooltip_text =document.querySelectorAll('.tooltip-text');
    const el_faded =document.querySelectorAll('.faded');
    
    el_tooltip_div.forEach(el => {
        el.style.backgroundColor = '';
        el.classList.remove("highlighted");
        el.classList.remove("tooltip-div");
    });

    el_tooltip_text.forEach(el => el.remove());
    el_faded.forEach(el => el.classList.remove("faded"));
    generateYearButtons();


    const endTime__Clear_LISTS = performance.now();
    const Time__Clear_LISTS = endTime__Clear_LISTS - startTime__Clear_LISTS;

    ADD_Times("Clear_LISTS", Time__Clear_LISTS);
    if(document.getElementById("log_Switch").checked) {
        console.log(
            "%cClear_LISTS %c" + Time__Clear_LISTS,
            "color: rgb(20, 210, 58);", "color: rgb(191, 10, 179);"
        );
    }
}

function log(value) {
    console.log(value);
}