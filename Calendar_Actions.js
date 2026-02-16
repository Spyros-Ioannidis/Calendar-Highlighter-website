function getISOWeekNumber(date) {
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
    return weekNo;
}


function getISOWeekInfo(date) {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    utcDate.setUTCDate(utcDate.getUTCDate() + 4 - (utcDate.getUTCDay() || 7));
    const isoYear = utcDate.getUTCFullYear();
    const yearStart = new Date(Date.UTC(isoYear, 0, 1));
    const weekNo = Math.ceil((((utcDate - yearStart) / 86400000) + 1) / 7);
    return { YEAR: isoYear, WEEK: weekNo };
}


function Highlight_Dates() {
    const YEAR = year_main;
    const flatDates = [];

    if (!LIST_DATES[YEAR]) {
        console.log("LIST_DATES is Empty, cannot Highlight Dates");
        return;
    }

    // Flatten highlightedDates
    for (const MONTH in LIST_DATES[YEAR]) {
        for (const day in LIST_DATES[YEAR][MONTH]) {
            flatDates.push({
                MONTH: Number(MONTH),
                DAY: Number(day),
                highlight_index: structuredClone(LIST_DATES[YEAR][MONTH][day])
            });
        }
    }

    //Add DateIndex to Datetitle 
    if (document.getElementById("ID_showDateIndex").checked) {
        for (let i = 0; i < flatDates.length; i++) {
            const entry = flatDates[i];

            for (let j = 0; j < entry.highlight_index.DateTitle.length; j++) {
                if (entry.highlight_index.DateTitle[j] === null) {
                    entry.highlight_index.DateTitle[j] = `${DateTitle_Index_String} ${entry.highlight_index.DateTitle_index + j + DateTitle_Index_Count}`;
                }
                else {
                    entry.highlight_index.DateTitle[j] = `${DateTitle_Index_String} ${entry.highlight_index.DateTitle_index + j + DateTitle_Index_Count} - ${entry.highlight_index.DateTitle[j]}`;
                }
            }
        }
    }
    else {
        //To not have empty line in tooltip[]
        for (let i = 0; i < flatDates.length; i++) {
            const entry = flatDates[i];
            entry.highlight_index.DateTitle = entry.highlight_index.DateTitle.filter(item => item !== null);
        }
    }

    // temp
    let time_test = 0;

    for (let i = 0; i < flatDates.length; i++) {
        const entry = flatDates[i];
        const highlight_element = document.getElementById(`Y_${YEAR}-M_${entry.MONTH}-D_${entry.DAY}`);

        switch (entry.highlight_index.Count) {
            case 1:
                highlight_element.style.backgroundColor = "red";
                break;
            case 2:
                highlight_element.style.backgroundColor = "orange";
                break;
            default:
                highlight_element.style.backgroundColor = "green";
                break;
        }

        //Remove existing tooltips
        const startTimeB = performance.now();
        highlight_element.querySelector(".tooltip-text")?.remove();
        const endTimeB = performance.now();
        time_test += endTimeB - startTimeB;


        // Create tooltip (Count+Elements)
        const tooltipSpan = document.createElement("span");
        tooltipSpan.className = "tooltip-text";
        tooltipSpan.innerHTML = `<span class="tooltip-arrow"></span><span style="color: limegreen;">Count: ${entry.highlight_index.Count}</span>`

        if (entry.highlight_index?.DateTitle) {
            tooltipSpan.innerHTML += `<br><span style="color: darkorange;">${entry.highlight_index.DateTitle.join("<br>")}</span>`;
        }
        highlight_element.classList.add("tooltip-div");
        highlight_element.appendChild(tooltipSpan);
    }
}


function Fade_Dates() {
    const YEAR = year_main;

    if (YEAR == year_start) {
        for (let MONTH = month_start; MONTH > 0; MONTH--) {
            let totalDays = new Date(YEAR, MONTH, 0).getDate();
            if (MONTH == month_start) {
                totalDays = day_start - 1;
            }
            // console.log(MONTH);
            for (let day = totalDays; day > 0; day--) {
                // console.log(`${YEAR}-${MONTH}-${day}`);
                const faded_element = document.getElementById(`Y_${YEAR}-M_${MONTH}-D_${day}`);
                faded_element.classList.add("faded");
            }
        }
    }
    if (YEAR == year_end) {
        let min_day = 0;
        for (let MONTH = 12; MONTH >= month_end; MONTH--) {
            let totalDays = new Date(YEAR, MONTH, 0).getDate();
            if (MONTH == month_end) {
                min_day = day_end;
            }
            for (let day = totalDays; day > min_day; day--) {
                const faded_element = document.getElementById(`Y_${YEAR}-M_${MONTH}-D_${day}`);
                faded_element.classList.add("faded");
            }
        }
    }
}

function Fade_Weeks() {
    const YEAR = year_main;

    if (YEAR == year_start) {
        let MONTH = month_start;
        let DAY = day_start - 7; //To get the previous week
        if (DAY <1) {
            MONTH--;
            if (MONTH <1) {
                return;
            }
            DAY = new Date(YEAR, MONTH, 0).getDate();
            console.log(DAY);
        }

        let WEEK = getISOWeekNumber(new Date(YEAR, MONTH - 1, DAY));
        for (WEEK; WEEK > 0; WEEK--) {
            const faded_element = document.querySelectorAll(`.Y_${YEAR}-W_${WEEK}`);
            faded_element.forEach((faded_element) => {
                faded_element.classList.add("faded");
            })
        }

        //if current year has preavious year's last week
        WEEK = getISOWeekNumber(new Date(YEAR-1, 12 - 1, 31));
        if (WEEK != 1) {
            const faded_element = document.querySelectorAll(`.Y_${YEAR-1}-W_${WEEK}`);
            faded_element.forEach((faded_element) => { //(.foreach) in case faded_element is undefined
                faded_element.classList.add("faded");
            })
        }
        
    }

    if (YEAR == year_end) {
        let MONTH = month_end;
        let DAY = day_end + 7; //To get the following week
        totalDays = new Date(YEAR, MONTH, 0).getDate();
        if (DAY > totalDays) { //DAY > TotalDays
            MONTH++;
            if (MONTH> 12) {
                return;
            }
            DAY = DAY - totalDays;
            // console.log(DAY);
        }

        let WEEK = getISOWeekNumber(new Date(YEAR, MONTH - 1, DAY));
        for (WEEK; WEEK < 54; WEEK++) {
            const faded_element = document.querySelectorAll(`.Y_${YEAR}-W_${WEEK}`);
            faded_element.forEach((faded_element) => {
                faded_element.classList.add("faded");
                // console.log(faded_element);
            })
        }

        //if current year has next year's first week
        WEEK = getISOWeekNumber(new Date(YEAR+1, 0, 1));
        if (WEEK == 1) {
            const faded_element = document.querySelectorAll(`.Y_${YEAR+1}-W_${WEEK}`);
            faded_element.forEach((faded_element) => { //(.foreach) in case faded_element is undefined
                faded_element.classList.add("faded");
            })
        }
    }
}


function Display_Weeks(ShowWeeks) {
    const YEAR = year_main;

    if (ShowWeeks == 0) {
        for (let m = 1; m <= 12; m++) {
            const del_weekHeader = document.getElementById("Wk");
            del_weekHeader ? del_weekHeader.remove() : null;

            const del_week = document.querySelectorAll(".week");
            if (del_week.lenght != 0) {
                del_week.forEach(wk => {
                    wk.remove();
                });
            }

            daysDiv = document.getElementById(`Y_${YEAR}-M_${m}`);
            daysDiv.style.gridTemplateColumns = `repeat(7, 0.8fr)`;
        }
    }
    else {
        for (let m = 1; m <= 12; m++) {
            daysDiv = document.getElementById(`Y_${YEAR}-M_${m}`)
            let weekNumber = getISOWeekNumber(new Date(YEAR, m - 1, 1));

            //Week initiation
            const weekHeader = document.createElement("div");
            weekHeader.classList.add("week", "header");
            weekHeader.textContent = "Wk";
            weekHeader.id = "Wk";
            daysDiv.style.gridTemplateColumns = `repeat(8, 0.8fr)`;
            daysDiv.insertBefore(weekHeader, daysDiv.children[0]);


            let i = 8;
            let day_after_week = daysDiv.children[i].textContent.slice(0, 2).replace(/C/g, "");;

            do {
                // console.log(day_after_week);
                if ((m == 1 && day_after_week < 7) || (m == 12 && day_after_week > 24)) {
                    weekNumber = getISOWeekNumber(new Date(YEAR, m - 1, day_after_week ? day_after_week : 1));
                }
                let week_YEAR = YEAR;
                if (m == 1 && weekNumber > 50) {
                    week_YEAR--;
                }
                else if (m == 12 && weekNumber < 2) {
                    week_YEAR++;
                }

                const weekDiv = document.createElement("div");
                weekDiv.classList.add("week");
                weekDiv.textContent = weekNumber;
                weekDiv.classList.add(`Y_${week_YEAR}-W_${weekNumber}`);
                daysDiv.insertBefore(weekDiv, daysDiv.children[i]);

                i = i + 8;
                weekNumber++;
                day_after_week = daysDiv.children[i]?.textContent.slice(0, 2).replace(/C/g, "");;
            } while (day_after_week !== "X" && day_after_week !== undefined)
        }
    }
}

function Highlight_Weeks() {
    const YEAR = year_main;
    const flatDates = [];

    if (!LIST_WEEKS[YEAR]) {
        console.log("LIST_DATES is Empty, cannot Highlight Weeks");
        return;
    }

    // Flatten highlightedDates
    for (const WEEK in LIST_WEEKS[YEAR]) {
        flatDates.push({
            YEAR: Number(YEAR),
            WEEK: Number(WEEK),
            highlight_index: structuredClone(LIST_WEEKS[YEAR][WEEK])
        });
    }


    // Push last week of previous year
    if (LIST_WEEKS[YEAR-1]) {
        const Keys = Object.keys(LIST_WEEKS[YEAR-1]);
        flatDates.push({
            YEAR: Number(YEAR-1),
            WEEK: Number(Keys[Keys.length-1]),
            highlight_index: structuredClone(LIST_WEEKS[YEAR-1][Keys[Keys.length-1]])
        });
    }

    // Push first week of next year
    if (LIST_WEEKS[YEAR+1]) {
        const Keys = Object.keys(LIST_WEEKS[YEAR+1]);
        flatDates.push({
            YEAR: Number(YEAR+1),
            WEEK: Number(Keys[0]),
            highlight_index: structuredClone(LIST_WEEKS[YEAR+1][Keys[0]])
        });
    }


    if (document.getElementById("ID_showDateIndex").checked) {
        for (let i = 0; i < flatDates.length; i++) {
            const entry = flatDates[i];

            for (let j = 0; j < entry.highlight_index.DateTitle.length; j++) {
                // console.log(entry.highlight_index);
                if (entry.highlight_index.DateTitle[j] === null) {
                    entry.highlight_index.DateTitle[j] = `${DateTitle_Index_String} ${entry.highlight_index.DateTitle_index + j + DateTitle_Index_Count}`;
                }
                else {
                    entry.highlight_index.DateTitle[j] = `${DateTitle_Index_String} ${entry.highlight_index.DateTitle_index + j + DateTitle_Index_Count} - ${entry.highlight_index.DateTitle[j]}`;
                }
            }
        }
    }


    for (let i = 0; i < flatDates.length; i++) {
        const entry = flatDates[i];
        const highlight_element = document.querySelectorAll(`.Y_${entry.YEAR}-W_${entry.WEEK}`);

        highlight_element.forEach((highlight_element) => {
            switch (entry.highlight_index.Count) {
                case 1:
                    highlight_element.style.backgroundColor = "red";
                    break;
                case 2:
                    highlight_element.style.backgroundColor = "orange";
                    break;
                default:
                    highlight_element.style.backgroundColor = "green";
                    break;
            }

            //Remove existing tooltips
            highlight_element.querySelector(".tooltip-text")?.remove();


            // Create tooltip (Count+Elements)
            const tooltipSpan = document.createElement("span");
            tooltipSpan.className = "tooltip-text";
            tooltipSpan.innerHTML = `<span class="tooltip-arrow"></span><span style="color: limegreen;">Count: ${entry.highlight_index.Count}</span>`

            if (entry.highlight_index?.DateTitle) {
                tooltipSpan.innerHTML += `<br><span style="color: darkorange;">${entry.highlight_index.DateTitle.join("<br>")}</span>`;
            }
            highlight_element.classList.add("tooltip-div");
            highlight_element.appendChild(tooltipSpan);
        })
    }
}