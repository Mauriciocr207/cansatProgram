// Get all dropdowns from the document
const dropdowns = document.querySelectorAll('.dropdown');
export const selected = document.querySelector('.selected');

// Loop through all dropdown elements
dropdowns.forEach(() => {
    // Get inner elements from each drowdown

    const select = document.querySelector('.select');
    const caret = document.querySelector('.caret');
    const menu = document.querySelector('.menu');
    const options = document.querySelectorAll('.menu li');


    /*
        We are using this method in order to have
        multiple dropwdown menus on the page work
    */
    // Add a click event to the select element
    select.addEventListener('click', () => {
        // Add the clicked select styles to the select element
        select.classList.toggle('select-clicked');
        // Add the rotate styles to the caret element
        caret.classList.toggle('caret-rotate');
        // Add the open styles to the menu element
        menu.classList.toggle('menu-open');
    });

    // Loop through all option element
    options.forEach(option => {
        console.log("ejecutando");
        // Add a click event to the option element
        option.addEventListener('click', () => {
            // Change selected inner text clicked option inner text
            selected.innerText = option.innerText;
            // Add the clicked select styles to the select element
            select.classList.remove('select-clicked');
            // Add the rotate styles to the caret element
            caret.classList.remove('caret-rotate');
            // Add the open styles to the menu element
            menu.classList.remove('menu-open');
            // Remove active class from all option elements
            options.forEach(option => {
                option.classList.remove('active');
            });
            // Add active class to clicked option element
            option.classList.add('active');
        });
    });
});