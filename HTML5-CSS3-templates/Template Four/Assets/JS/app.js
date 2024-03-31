let main_section = document.getElementById("main-section");
let up_arrow = document.getElementById("up-arrow");
let skills_section = document.getElementById("ourSkils");
let progress_span = document.querySelectorAll(".skill span");
let stats_section = document.getElementById("stats");
let stats_span = document.querySelectorAll(".stats-box span")
let discount_section = document.getElementById("Discount");
let started = false;

window.onscroll = function () {
    if (window.scrollY >= main_section.offsetTop && window.scrollY < discount_section.offsetTop) {
        up_arrow.style.visibility = "visible";
    }  else {
        up_arrow.style.visibility = "hidden";
    }

    if (window.scrollY >= skills_section.offsetTop - 100) {
        progress_span.forEach((span) => {
            span.style.width = span.dataset.width;
        })
    }

    if (window.scrollY >= stats_section.offsetTop) {
        if (!started) {
            stats_span.forEach((num) => startCount(num));
        }
        started = true;
    }

}

up_arrow.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})


function startCount(el) {
    let goal = el.dataset.goal;
    let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
        clearInterval(count);
    }
    }, 2000 / goal);
}



let countDownDate = new Date("Dec 31, 2024 23:59:59").getTime();

let counter = setInterval(() => {
    let dateNow = new Date().getTime();
    let dateDiff = countDownDate - dateNow;

    let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);

    document.querySelector(".days").innerHTML = days < 10 ? `0${days}` : days;
    document.querySelector(".hours").innerHTML = hours < 10 ? `0${hours}` : hours;
    document.querySelector(".minutes").innerHTML = minutes < 10 ? `0${minutes}` : minutes;
    document.querySelector(".seconds").innerHTML = seconds < 10 ? `0${seconds}` : seconds;

    if (dateDiff < 0) {
    clearInterval(counter);
    }
}, 1000);