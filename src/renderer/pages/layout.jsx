import Head from "next/head";

export default function Layout({ children, title}) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <body className="w-screen h-screen relative overflow-hidden">
        <div className="bg-hardLightBlue dark:bg-black transition-color grid grid-rows-[25px_1fr_90px] gap-[10px] grid-cols-[320px_minmax(495px,1fr)] h-screen  px-[10px] transition-color duration-300">
          <div className="drag w-full h-full col-span-2 bg-blue-50"></div>
          {children}
          <footer className="bg-blue dark:bg-blackDark-3 col-span-2 transition-color duration-300 pb-[1rem] flex justify-center">
            <div className="w-[80%] max-w-[80rem] h-full flex justify-evenly gap-[4rem]">
              <img srcSet="./img/EEK__logo.webp" alt=""  />
              <img srcSet="./img/NASA_logo.webp" alt=""  />
              <img srcSet="./img/peu.webp" alt="" />
            </div>
          </footer>
        </div>
      </body>
    </>
  );
}
