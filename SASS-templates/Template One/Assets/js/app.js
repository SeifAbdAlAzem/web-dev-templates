let blogs_heading = document.querySelectorAll(".blogs-heading h3");
let blogs_content = document.querySelectorAll(".blogs-content p");

blogs_heading.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        blogs_heading.forEach(tab => tab.classList.remove("active"));
        blogs_content.forEach(content => content.classList.remove("active"));

        tab.classList.add("active");
        blogs_content[index].classList.add("active");
    });
});