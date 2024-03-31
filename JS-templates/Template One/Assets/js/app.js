// Constants for elements
const settingBtn = document.getElementById("setting-btn");
const settingsContainer = document.getElementById("settings");
const colorsPicker = document.querySelectorAll(".pick-colors span");
const bgRandomControls = document.querySelectorAll(".random-bg .buttons button");
const landingPage = document.getElementById("banner");
const bulletsControls = document.querySelectorAll(".ShowBullets .buttons button");
const bullets = document.getElementById("bullets");
const resetBtn = document.getElementById("reset");
const languageControls = document.querySelectorAll(".change-language .buttons button");
const transatedElements = document.querySelectorAll("[data-i18n]");
let translations;
const skillsSection = document.getElementById("Skills");
const progressSpan = document.querySelectorAll(".our-skills .skill span");
const galleryImgs = document.querySelectorAll(".gallery .gallery-imgs img");
const toggleBtn = document.getElementById("nav-btn");
const tLinks = document.querySelector(".toggle-menu");

// Constants for intervals
let backgroundInterval;

// Constants for local storage keys
const COLOR_OPTION_KEY = "color_option";
const BACKGROUND_OPTION_KEY = "background_option";
const BULLETS_OPTION_KEY = "bullets_option";
const LANGUAGE_OPTION = "language-option";

// Styles editted in translating website

let settingsPosition = document.querySelector("main .banner .settings");
let timelineLeftPositions = document.querySelectorAll("main .timeline .season-timeline .timeline-point");
let timelineRightPosition = document.querySelector("main .timeline .season-timeline .timeline-point:nth-of-type(2)");
let timelineRightPositionSpan = document.querySelector("main .timeline .season-timeline .timeline-point:nth-of-type(2) .point");

// Event listener for setting button
settingBtn.addEventListener("click", () => {
    // Toggle the left value of the settings container
    if(localStorage.getItem("langauge-option") === "en" || localStorage.getItem("langauge-option") === null) {
        settingsContainer.style.left = settingsContainer.style.left === "0px" ? "-235px" : "0px";
    } else {
        settingsContainer.style.left = settingsContainer.style.left === "0px" ? "-211px" : "0px";
    }

    // Add or remove the class for rotation animation
    settingBtn.children[0].classList.toggle("rotate-infinite");
});

// Function to handle setting color
function setColorOption(color) {
    // Set color on root
    document.documentElement.style.setProperty('--primary-color', color);

    // Set color in local storage
    localStorage.setItem(COLOR_OPTION_KEY, color);
}

// Function to handle setting background
function setBackgroundOption(option) {
    // Set background option in local storage
    localStorage.setItem(BACKGROUND_OPTION_KEY, option);

    // Update background based on option
    if (option === "Yes") {
        startRandomBackground();
    } else {
        stopRandomBackground();
    }
}

// Function to start random background
function startRandomBackground() {
    backgroundInterval = setInterval(() => {
        // Get random image number
        const randomNumber = Math.floor(Math.random() * 5) + 1;

        // Change Background Image Url "The path of image is relative to the html file location"
        landingPage.style.backgroundImage = `url("Assets/imgs/0${randomNumber}.jpg")`;
    }, 10000);
}

// Function to stop random background
function stopRandomBackground() {
    clearInterval(backgroundInterval);
}

// Function to handle setting Bullets
function setBulletsOption(option) {
    // Set Bullets option in local storage
    localStorage.setItem(BULLETS_OPTION_KEY, option);

    // Update Bullets based on option
    if (option === "Yes") {
        showBullets();
    } else {
        hideBullets();
    }
}

// Function to show Bullets
function showBullets() {
    bullets.style.display = "flex";
}

// Function to hide Bullets
function hideBullets() {
    bullets.style.display = "none";
}

// Check if there's a bullets option in local storage
const bulletsOption = localStorage.getItem(BULLETS_OPTION_KEY);
if (bulletsOption !== null) {
    // Apply bullets option from local storage
    setBulletsOption(bulletsOption);

    // Update active state for Bullets option buttons
    bulletsControls.forEach(displayOption => {
        if (displayOption.getAttribute('data-i18n') === bulletsOption) {
            displayOption.classList.add("active");
        } else {
            displayOption.classList.remove("active");
        }
    });
} else {
    // Set default color option
    setBulletsOption("Yes");
}

// Add event listeners for Bullets option buttons
bulletsControls.forEach(displayOption => {
    displayOption.addEventListener("click", function () {
        // Set background option
        setBulletsOption(this.getAttribute('data-i18n'));
        // Call handleActive function to Update active state as it add active class to clicked span and remove active class from other spans
        handleActive(this);
    });
});

// Check if there's a color option in local storage
const colorOption = localStorage.getItem(COLOR_OPTION_KEY);
if (colorOption !== null) {
    // Apply color option from local storage
    setColorOption(colorOption);

    // Update active state for colors picker
    colorsPicker.forEach(colorPicker => {
        if (colorPicker.getAttribute('data-color') === colorOption) {
            colorPicker.classList.add("active");
        } else {
            colorPicker.classList.remove("active");
        }
    });
} else {
    // Set default color option
    setColorOption("#ff9800");
}

// Add event listeners for color picker
colorsPicker.forEach(colorPicker => {
    colorPicker.addEventListener("click", function () {
        // Set color option
        setColorOption(this.getAttribute('data-color'));
        // Update active state for colors picker
        handleActive(this);
    });
});

// Check if there's a background option in local storage
const bgOption = localStorage.getItem(BACKGROUND_OPTION_KEY);
if (bgOption !== null) {
    // Apply background option from local storage
    setBackgroundOption(bgOption);

    // Update active state for background option buttons
    bgRandomControls.forEach(randomOption => {
        if (randomOption.getAttribute('data-i18n') === bgOption) {
            randomOption.classList.add("active");
        } else {
            randomOption.classList.remove("active");
        }
    });
} else {
    // Set default color option
    setBackgroundOption("Yes");
}

// Add event listeners for background option buttons
bgRandomControls.forEach(randomOption => {
    randomOption.addEventListener("click", function () {
        // Set background option
        setBackgroundOption(this.getAttribute('data-i18n'));
        // Update active state for background option buttons
        handleActive(this);
    });
});

// Load translations from JSON file "path relative to the location where your HTML file is served from"
fetch('Assets/js/translations.json')
    .then(response => response.json())
    .then(data => {
        translations = data;

        // Check if there's a language option in local storage
        const languageOption = localStorage.getItem(LANGUAGE_OPTION);
        if (languageOption !== null) {
            // Apply Language option from local storage
            setLanguageOption(languageOption);

            // Update active state for Language option buttons
            languageControls.forEach((langOption) => {
                if (langOption.getAttribute('data-i18n') === languageOption) {
                    langOption.classList.add("active");
                } else {
                    langOption.classList.remove("active");
                }
            });
        }
    })
    .catch(error => console.error('Error loading translations:', error));

// Function to handle setting Language
function setLanguageOption(option) {
    // Set Language option in local storage
    localStorage.setItem(LANGUAGE_OPTION, option);

    // Update Language based on option
    if (option === "en") {
        enLang(option);
    } else {
        arLang(option);
    }
}

// Translate elements based on the selected language
function translateElements(language) {
    transatedElements.forEach((element) => {
        const translationKey = element.getAttribute("data-i18n");
        const translatedText = translations[language][translationKey];

        // Check if the element is an input with a data-placeholder attribute
        if (element.tagName.toLowerCase() === "input" || element.tagName.toLowerCase() === "textarea" && element.hasAttribute("placeholder")) {
            // Get the translation for the placeholder from the JSON data
            const placeholderTranslationKey = element.getAttribute("data-i18n");
            const translatedPlaceholder = translations[language][placeholderTranslationKey];
            // Set the translated placeholder and check if the input has value attribute to trnslate it
            if(element.hasAttribute("value")) {
                element.setAttribute("value", translatedPlaceholder);
            }
            element.setAttribute("placeholder", translatedPlaceholder);
            // Change the direction of inputs placeholders according to the language used
            if(language === "en") {
                element.style.direction = "ltr";
            } else {
                element.style.direction = "rtl";
            }
        } else {
            // Set the translated text content
            element.textContent = translatedText;
        }
    });
}

// Function to handle English language
function enLang(language) {
    translateElements(language);
    document.dir = language === "en" ? "ltr" : "rtl";
    document.body.style.fontFamily = "\"Open Sans\", sans-serif";

    settingsPosition.style.left = "-235px";
    timelineRightPosition.style.left = `${timelineRightOffset}%`;

    progressSpan.forEach((progress) => {
        progress.style.left = "0";
    });
}

// Function to handle Arabic language
function arLang(language) {

    translateElements(language);
    document.dir = language === "ar" ? "rtl" : "ltr";
    document.body.style.fontFamily = "\"Cairo Play\", sans-serif";

    settingsPosition.style.left = "-211px";

    // Get left timeline right offset
    const { left: leftTimelineRightOffset, right: rightTimelineRightOffset } = calculateTimelineRightOffset();

    // Apply left offset to timelineLeftPositions
    timelineLeftPositions.forEach((timeline) => {
        timeline.style.right = `${leftTimelineRightOffset}%`;
    });

    // Apply right offset to timelineRightPosition
    timelineRightPosition.style.right = `${rightTimelineRightOffset}px`;
    timelineRightPositionSpan.style.right = "105%";
    progressSpan.forEach((progress) => {
        progress.style.right = "0";
    });
}

// Function to calculate the left and right timeline right offset based on the device width
function calculateTimelineRightOffset() {
    // Get the window width
    const windowWidth = window.innerWidth;
    let leftTimelineRightOffset = 53; // Default percentage value for left timeline
    let rightTimelineRightOffset = 18; // Default percentage value for right timeline

    // Adjust for Galaxy Fold
    if (windowWidth <= 280) {
        leftTimelineRightOffset = 0; // Set left timeline right offset to 0
        rightTimelineRightOffset = 0; // Set right timeline right offset to 0
    }

    return { left: leftTimelineRightOffset, right: rightTimelineRightOffset };
}


// Add event listeners for Language option buttons
languageControls.forEach(langOption => {
    langOption.addEventListener("click", function () {
        // Set language option
        setLanguageOption(this.getAttribute('data-i18n'));
        // Update active state for language option buttons
        handleActive(this);
    });
});

// Function to handle active state
function handleActive(activeElement) {
    const parentElement = activeElement.parentElement;
    if (parentElement) {
        parentElement.querySelectorAll(".active").forEach(element => {
            element.classList.remove("active");
        });
        activeElement.classList.add("active");
    }
}

// Add event listeners for Reset Button
resetBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Remove local storage keys
    localStorage.clear();
    // localStorage.removeItem("COLOR_OPTION_KEY");
    // localStorage.removeItem("BACKGROUND_OPTION_KEY");
    // localStorage.removeItem("BULLETS_OPTION_KEY");

    // Reload Window
    window.location.reload();
})

// Function to handle Skills Progress when it comes to the skills section
window.onscroll = function () {
    // Check if ScrollY value of windows is greater than or egual the top of the skills section
    if (window.scrollY >= skillsSection.offsetTop - 100) {
        progressSpan.forEach((span) => {
            span.style.width = span.dataset.target;
        })
    }
}

// Function to handle pop-up boxs in gallery section
function createPoUpBox(BoxHeading, BoxIMage) {
    // Create Overlay Element
    let overlay = document.createElement("div");
    // Add Class To Overlay
    overlay.className = 'popup-overlay';
    // Append Overlay To The Body
    document.body.appendChild(overlay);
    // Create The Popup Box
    let popupBox = document.createElement("div");
    // Add Class To The Popup Box
    popupBox.className = 'popup-box';
    if (BoxHeading !== null) {
        // Create Heading
        let imgHeading = document.createElement("h3");
        // Create text For Heading
        let imgText = document.createTextNode(BoxHeading);
        // Append The Text To The Heading
        imgHeading.appendChild(imgText);
        // Append The Heading To The Popup Box
        popupBox.appendChild(imgHeading);
    }
    // Create The Image
    let popupImage = document.createElement("img");
    // Set Image Source
    popupImage.src = BoxIMage;
    // Add Image To Popup Box
    popupBox.appendChild(popupImage);
    // Append The Popup Box To Body
    document.body.appendChild(popupBox);
    // Create The Close Span
    let closeButton = document.createElement("span");
    // Create The Close Button Text
    let closeButtonText = document.createTextNode("x");
    // Append Text To Close Button
    closeButton.appendChild(closeButtonText);
    // Add Class To Close Button
    closeButton.className = 'close-button';
    // Add Close Button To The Popup Box
    popupBox.appendChild(closeButton);

    // Apply transition after a slight delay to allow for rendering
    setTimeout(() => {
        overlay.classList.add('active');
        popupBox.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10);
}

// Add Event Listener for Image
galleryImgs.forEach((Image) => {
    Image.addEventListener("click", () => {
        createPoUpBox(Image.alt, Image.src);
    })
});

// Add Event Listener For close Btn
document.addEventListener("click", function (e) {
    if (e.target.className == 'close-button') {
        const popupOverlay = document.querySelector(".popup-overlay");
        const popupBox = e.target.parentNode;

        // Remove The Current Popup
        popupBox.remove();
        // Remove Overlay
        popupOverlay.remove();
    }
});

// Add Event Listener for Menu Button
toggleBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // Stop event propagation to prevent triggering document click
    tLinks.classList.toggle("open"); // Toggle the "open" class on the menu links
});

// Click Anywhere Outside Menu and Toggle Button
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks && tLinks.classList.contains("open")) {
        tLinks.classList.toggle("open"); // Close the menu if it's open and the click is outside the menu and toggle button
    }
});










///////////////////////////////////////////////////////////////////////////

//////////////////////// Another Ideas / Tips

// Setting Btn Notes

// This selector willnot work as JS file of fontawesome delete the i tag and replace it by svg; you can use it but you must delete the script tag of fontawesome JS file in HTML
// let settingBtnIcon = document.querySelector(".fa-gear");


/////////////////////////////////////////
// Color (Another Way)

// It didn't work with SASS as primary-color value is compiled before it changed so, I make a css file called colors to change the primary color value before it is compiled.


//////////////////////////////
// Language Changing (Another Way)

// arabic.onclick = ()=>{
//     setLanugage("arabic");
//     localStorage.setItem("Lang","arabic");
// };

// english.onclick = ()=>{
//     setLanugage("english");
//     localStorage.setItem("Lang","english");
// };

// onload = ()=>{
//     setLanugage(localStorage.getItem("Lang"));
// };
// function setLanugage(getLanuage){
//     if(getLanuage === "arabic"){
//         title.innerHTML = "مبرمج شيار";
//         welcome.innerHTML = "مرحبا بكم  في صفحة مبرمج شيار";
//         about.innerHTML = "حولنا";
//         aboutText.innerHTML = "انا استاذ برمجيات و مهندس برمجيات";
//         contact.innerHTML = "اتصل بنا";
//     }else if(getLanuage ==="english"){
//         title.innerHTML = "Coder Shiyar";
//         welcome.innerHTML = "Welcome to website of Coder Shiyar";
//         about.innerHTML = "  About US";
//         aboutText.innerHTML = "  I am a teacher and a Software Developer";
//         contact.innerHTML = "Contact us";
//     }
// }

///////////////////////////////
// Another Way

// const languageSelector = document.querySelector("select");
// languageSelector.addEventListener("change", (event) => {
//     setLanguage(event.target.value);
//     localStorage.setItem("lang", event.target.value);
// });

// document.addEventListener("DOMContentLoaded", () => {
//     const language = localStorage.getItem("lang") || "en"; // اذا لم تكن اللغة متوفرة استخدم الانجليزية
//     setLanguage(language);
// });

// const setLanguage = (language) => {
//     const elements = document.querySelectorAll("[data-i18n]");
//     elements.forEach((element) => {
//         const translationKey = element.getAttribute("data-i18n");
//         element.textContent = translations[language][translationKey];
//     });
//     document.dir = language === "ar" ? "rtl" : "ltr";
// };