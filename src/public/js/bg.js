const grafics = document.querySelectorAll('.grafic');
const graficArr = []
const colors = [
    "#E01018",
    '#681820',
    '#F89048',
    '#902828',
    '#783050',
    '#F87030'
]

grafics.forEach( e => graficArr.push(e) );
graficArr.map( e => {
    const index = graficArr.indexOf(e);
    const section = document.querySelector('section');
    e.addEventListener('mouseover', () => {
        section.style.backgroundColor = colors[graficArr.indexOf(e)]; 
    });
    // e.addEventListener('mouseout', () => {
    //     section.style.backgroundColor = '#a5a5a5' 
    // });
});


