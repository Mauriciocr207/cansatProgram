import { Grafic } from "./grafic";
import Page from "./grafics/presion";

export function GraficSection() {
    const colors = [
        "#F52E00",
        '#4318F5',
        '#F59200',
        '#18F5A7',
        '#F5DB0C',
        '#F87030'
    ];

  function createGrafics() {
    return colors.map( color => {
        return (
            <Grafic >
              <Page/>
            </Grafic>
          );

    }) 
  }  

  return (
    <>
      <header className="drag w-full"></header>

      <div
        className="
          px-[32px] 
          py-[24px]
          grid 
          grid-rows-2 
          grid-cols-3 
          gap-x-[24px] 
          gap-y-[12px]
          overflow-y-scroll
          max-[1400px]:grid
          max-[1400px]:grid-rows-[300px_300px_300px]
          max-[1400px]:grid-cols-2
          max-[1010px]:flex
          max-[1010px]:basis-full
          max-[1010px]:flex-wrap
          max-[1010px]:items-center
          scroll
          
      "
      >
       {createGrafics()} 
      </div>
    </>
  );
}
