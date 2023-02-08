const grafics = document.querySelectorAll('.grafic');
const graficArr = []
const colors = [
    "#F52E00",
    '#4318F5',
    '#F59200',
    '#18F5A7',
    '#F5DB0C',
    '#F87030'
];
export const section = document.querySelector('section');

grafics.forEach( e => graficArr.push(e) );
graficArr.map( e => {
    e.addEventListener('mouseover', () => {
        const color = graficArr.indexOf(e)
        section.style.backgroundColor = colors[color];
    });
    // e.addEventListener('mouseout', () => {
    //     section.style.backgroundColor = '#a5a5a5' 
    // });
});

