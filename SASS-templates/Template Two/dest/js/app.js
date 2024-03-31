// Resize the Grid Container to show columns in it

let screenType = document.getElementById('screenType');
let gridcontainer = document.getElementById('grid-container');

screenType.addEventListener('change', function() {

    let screenTypeValue = this.value;

    switch (screenTypeValue) {
        case 'mobile':
            gridcontainer.style.width = '500px';
            break;
        case 'tablet':
            gridcontainer.style.width = '800px';
            break;
        case 'desktop':
            gridcontainer.style.width = '100%';
            break;
        default:
            gridcontainer.style.width = '100%';
    }

    updateColumnClasses();
});


function updateColumnClasses() {
    let containerWidth = gridcontainer.offsetWidth;
    let columns = gridcontainer.querySelectorAll('.col');

    columns.forEach( (column) => {
        if (containerWidth < 768) {
            column.className = 'col col-12-xs';
        } else if (containerWidth < 992) {
            column.className = 'col col-5-sm';
        } else {
            column.className = 'col col-3-lg';
        }
    });
}


// Copy Code

document.addEventListener('DOMContentLoaded', function() {
    var copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var codeSnippet = button.parentElement.querySelector('.code-snippet');
            var range = document.createRange();
            range.selectNode(codeSnippet);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
            alert('Code copied!');
        });
    });
});


// Code Snippet Slider

document.addEventListener('DOMContentLoaded', function() {
    const codeSliders = document.querySelectorAll('.code-slider');

    codeSliders.forEach((codeSlider) => {
        let currentSlide = 0;
        const codeSlides = codeSlider.querySelectorAll('.code-slider-container');

        function showSlide(index) {
            codeSlides.forEach((slide, i) => {
                if (i === index) {
                    slide.style.display = 'block';
                } else {
                    slide.style.display = 'none';
                }
            });
        }

        if (codeSlider) {
            codeSlider.querySelector('.prev-btn').addEventListener('click', function() {
                currentSlide = (currentSlide - 1 + codeSlides.length) % codeSlides.length;
                showSlide(currentSlide);
            });
            codeSlider.querySelector('.next-btn').addEventListener('click', function() {
                currentSlide = (currentSlide + 1) % codeSlides.length;
                showSlide(currentSlide);
            });
        }

        showSlide(currentSlide);
    });
});