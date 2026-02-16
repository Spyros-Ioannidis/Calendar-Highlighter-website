document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("mouseover", Show_Tooltip);
    document.addEventListener("mouseout", Hide_Tooltip);
});


//Show ToolTip
function Show_Tooltip(e) {
    const startTime = performance.now();
    const target = e.target.closest('.tooltip-div');
    if (target) {
        target.classList.add('show-tooltip');
        const tooltip = target.children[0];
        const ARROW_tooltip = tooltip.children[0];
        const ARROW_WIDTH = ARROW_tooltip.getBoundingClientRect().width;

        const viewportWidth = window.innerWidth;
        const BOTTOM_displayYear = document.getElementById("displayYear").getBoundingClientRect().bottom;
        let RECT = tooltip.getBoundingClientRect();
        let WIDTH = RECT.width;

        const fontSize = parseFloat(getComputedStyle(document.getElementById("calendar")).fontSize);
        const padding_Size = 2*(fontSize*0.35);

        //Info:
        //When shifting or checking position  theres a ±2px of either border for apearance
        //Also when shifting I add the default translateX value (50%) for correct positioning
        //ARROW_tooltip doesn't have a default translateX value (50%) like tooltip 
        //(WIDTH / Arrow_WIDTH) * SHIFT (To get precentage change relative to the tooltip)


        //If the tooltip cannot fit inside viewport
        if (viewportWidth < WIDTH - 4) {
            tooltip.style.width = `${WIDTH - padding_Size - 6 - (WIDTH - viewportWidth)}px`;
            tooltip.style.whiteSpace = "normal";
            tooltip.style.overflowWrap = "break-word";

            RECT = tooltip.getBoundingClientRect();
        }

        WIDTH = RECT.width;
        const LEFT = RECT.left;
        const RIGHT = RECT.right;
        const px_offset = (2/WIDTH)*100; //2px in percentage

        //If tooltip reaches above the calendar-wrapper (due to html structure tooltip cannot render obove other divs)
        const TOP = RECT.top;
        if (TOP < BOTTOM_displayYear) {
            tooltip.style.top = `105%`;
            ARROW_tooltip.style.top = `-0.7em`;
            ARROW_tooltip.style.borderColor = `transparent transparent #454547 transparent`;
        }

        //If tooltip reaches beyond LEFT side of viewport (-2px)
        if (LEFT < 2) {
            const SHIFT = (((0 - LEFT) / WIDTH )* 100);
            const SHIFT_tooltip       = SHIFT - 50 + px_offset;
            const SHIFT_ARROW_tooltip = (-SHIFT - px_offset) * (WIDTH / ARROW_WIDTH);
            tooltip.style.transform = `translateX(${SHIFT_tooltip}%)`;
            ARROW_tooltip.style.transform = `translateX(${SHIFT_ARROW_tooltip}%)`;

            //if arrow beyond tooltip (+2px for border radius)
            if(ARROW_tooltip.getBoundingClientRect().left < tooltip.getBoundingClientRect().left + 2) {
                ARROW_tooltip.style.borderColor = `transparent`;
                
            }
        }

        //If tooltip reaches beyond RIGHT side of viewport (-2px)
        else if (RIGHT> viewportWidth - 2) {
            const SHIFT = ((RIGHT - viewportWidth) / WIDTH * 100);
            const SHIFT_tooltip       = -SHIFT - 50 - px_offset;
            const SHIFT_ARROW_tooltip = (SHIFT + px_offset) * (WIDTH / ARROW_WIDTH);
            tooltip.style.transform = `translateX(${SHIFT_tooltip}%)`;
            ARROW_tooltip.style.transform = `translateX(${SHIFT_ARROW_tooltip}%)`;

            //if arrow beyond tooltip (-2px for border radius)
            if(ARROW_tooltip.getBoundingClientRect().right > tooltip.getBoundingClientRect().right - 2) {
                ARROW_tooltip.style.borderColor = `transparent`;
                
            }
        }
        const endTime = performance.now();
        ADD_Times("Show Tooltip", endTime - startTime);
    }
};


//Stop showing Tooltip (remove class and style changes)
function Hide_Tooltip(e) {
    const startTime = performance.now();
    const target = e.target.closest('.tooltip-div');
    if (target) {
        const tooltip = target.children[0];
        tooltip.style.transform = "";
        tooltip.style.top = "";
        tooltip.style.width = "";
        tooltip.style.whiteSpace = "";
        tooltip.style.overflowWrap = "";

        const ARROW_tooltip = tooltip.children[0];
        ARROW_tooltip.style.transform = "";
        ARROW_tooltip.style.top = "";
        ARROW_tooltip.style.borderColor = "";

        target.classList.remove('show-tooltip');

        const endTime = performance.now();
        ADD_Times("Hide Tooltip", endTime - startTime);
    }
};