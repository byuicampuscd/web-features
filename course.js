/********************************************************
    The purpose of course.js is to house only the JavaScript
    specific to an individual course. The online.js
    houses all the default JavaScript.
********************************************************/
/* DO NOT DELETE OR MODIFY THIS SECTION */
/* Append Script Tag for Online.js to the Body Tag */
var onlineJs = document.createElement("script");
//onlineJs.src = 'https://content.byui.edu/integ/gen/00134d04-34d1-47b8-9242-c29059c522ee/0/online.js';
onlineJs.src = 'online.js';
document.body.appendChild(onlineJs);

/* Add Course Specific JavaScript Below */

// This gets an element with a given ID to avoid using document.getElementById() repeatedly
function get (id) {
   return document.getElementById(id);
}

/****************************************************************
    Activity Banner Builder
****************************************************************/
var selected = document.getElementById("activitySelected"),
    category = document.getElementById("activityCategory"),
    bannerDiv = document.getElementById("activityBanner"),
    h1CodeBox = document.getElementById("activityBannerH1"),
    h2CodeBox = document.getElementById("activityBannerH2");

function changeBanner(e) {
    var classNames = selected.value,
        bannerText = selected.options[selected.selectedIndex].label,
        h1Code,
        h2Code,
        textNode;
    
    if (bannerText === "Other") {
        category.style.display = "inline";
        bannerText = "Activity Name";
        classNames = category.value + " other";
    } else {
        category.style.display = "none";
    }
    h1Code = '<h1 class="activity ' + classNames + '">' + bannerText + '</h1>';
    bannerDiv.innerHTML = h1Code;
    textNode = document.createTextNode(h1Code);
    h1CodeBox.innerHTML = '';
    h1CodeBox.appendChild(textNode);
    h2Code = '<h2 class="activity ' + classNames + '">' + bannerText + '</h2>';
    textNode = document.createTextNode(h2Code);
    h2CodeBox.innerHTML = '';
    h2CodeBox.appendChild(textNode);
}

selected.onchange = changeBanner;
category.onchange = changeBanner;

/****************************************************************
    Table Code Generator
****************************************************************/
var type,
    headings,
    rowHeadings,
    columns,
    rows,
    tableHTML,
    i;

// Make it so that when one of the inputs in the form is focused then any previously generated code will disappear and it will be reset
var formInputs = document.querySelectorAll("form input");

for (i = 0; i < formInputs.length; i += 1) {
    formInputs[i].addEventListener("focus", function() {
        get("table-html").className = "hidden";
        get("table-html").innerHTML = "";
        get('copy-outcome-table').innerHTML = "";
    });
}

// Change defaults when table type is changed
function setDefaults() {
    if (get('rubric-table').checked) {
        get('col-head-yes').checked = true;
        get('row-head-yes').checked = true;
    } else {
        get('col-head-yes').checked = true;
        get('row-head-no').checked = true;
    }
}

function buildTable () {
    if (get('basic-table').checked) {
        type = "";
    } else {
        type = " class='rubric'";
    }
    if (get('col-head-no').checked) {
        headings = false;
    } else {
        headings = true;
    }
    if (get('row-head-no').checked) {
        rowHeadings = false;
    } else {
        rowHeadings = true;
    }
    columns = parseInt(get("num-of-columns").value);
    rows = parseInt(get("num-of-rows").value);
    tableHTML = "<table" + type + ">\n";
    for (var i = 0; i < rows; i++) {
        tableHTML += "  <tr>\n";
        for (var j = 0; j < columns; j++) {
            if (i == 0 && headings) {
                tableHTML += "    <th>Heading</th>\n"; 
            } else if (j == 0 && rowHeadings) {
                tableHTML += "    <th>Heading</th>\n";
            } else {
                tableHTML += "    <td>Text</td>\n"; 
            }
        }
        tableHTML += "  </tr>\n";
    }
    tableHTML += "</table>";
    get('table-html').className = "";
    get('table-html').innerHTML = tableHTML;
    
    // Copy the text to the clipboard
    var range = document.createRange();
    range.selectNode(document.querySelector('#table-html').childNodes[0]);
    window.getSelection().addRange(range);
    
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        get('copy-outcome-table').innerHTML = "Code copied to clipboard!";
        window.getSelection().removeAllRanges();
    }
}

/****************************************************************
    List Demo
****************************************************************/

function updateList(el) {
    var value = el.value,
        divs = document.querySelectorAll(".list-columns"),
        string = "list-columns",
        numColumns= document.querySelector("input[name='columns']:checked").value,
        position = document.querySelector("input[name='positionList']:checked").value,
        i;

    if (numColumns != "unspecified") {
        string += " " + numColumns;
    }
    if (position != "left") {
        string += " " + position;
    }
    
    get("listClass").innerHTML = string;
    
    for (i = 0; i < divs.length; i += 1) {
        divs[i].className = string;
    }
}

/****************************************************************
    Image Demo
****************************************************************/

function updateImage(el) {
    var classArray,
        newClass;
    if (el.name === "position" || el.name === "size" || el.name === "caption") {
        if (el.name != 'caption') {
            classArray = get('demoImage').className.split(" ");
            if (el.name == 'position') {
                classArray[0] = el.value;
            } else {
                classArray[1] = el.value;
            }
            get('demoImage').className = classArray[0] + ' ' + classArray[1];
            get(el.name).innerHTML = el.value;
        } else {
            if (el.value == 'noCaption') {
                get(el.name).style.display = 'none';
                get('demoCaption').style.display = 'none';
            } else {
                get(el.name).style.display = '';
                get('demoCaption').style.display = '';
            }
        }
    } else {
        classArray = get('demoCallout').className.split(" ");
        if (el.name === 'positionCallout') {
            classArray[1] = el.value;
        } else {
            classArray[2] = el.value;
        }
        newClass = classArray[0] + " " + classArray[1] + " " + classArray[2];
        get('demoCallout').className = newClass;
        get('calloutClass').innerHTML = newClass;
        get('calloutClassP').innerHTML = newClass;
    }
}