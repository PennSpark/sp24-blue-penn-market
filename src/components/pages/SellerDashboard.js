import * as React from "react";
import Header from '../Header';

const products = [
  {
    id: 1,
    name: "University Physics Textbook",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ff57c1f5853a5b6e4d96294f97432d2a7f5de286a43f024a8e481fc2076bed39?apiKey=b8d09a4545bb49a8a3d7500b55db7534&",
    thumbnailSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/ece074034a620059676330e1952b29092d6f889fab13e5afee7524114e09a39d?apiKey=b8d09a4545bb49a8a3d7500b55db7534&",
    status: "Sold",
  },
  {
    id: 2,
    name: "TI-Nspire Graphing Calculator",
    imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f4cc14badd8850daa89cb3021f838ae4dacd6c03a650477f82d22a1a7e786fd?apiKey=b8d09a4545bb49a8a3d7500b55db7534&",
    status: "Selling",
  },
];

function ProductCard({ product }) {
  return (
    <div className="flex flex-col mt-16 max-w-full w-[338px] max-md:mt-10">
      <div className="flex overflow-hidden relative flex-col justify-center items-center px-16 w-full border border-black border-solid aspect-[1.84] max-md:px-5">
        <img
          src={product.imageSrc}
          alt=""
          className="object-cover absolute inset-0 size-full"
        />
        {product.thumbnailSrc && (
          <img
            src={product.thumbnailSrc}
            alt={product.name}
            className="max-w-full border border-black border-solid aspect-[1.06] w-[195px]"
          />
        )}
      </div>
      <div className="mt-6 text-xl font-bold tracking-wide text-black">
        Name: {product.name}
      </div>
    </div>
  );
}

function ProductStatus({ status }) {
  return (
    <div className="flex z-10 gap-2 self-center px-5 py-2.5 mt-0 ml-32 text-xl font-bold tracking-wide text-white whitespace-nowrap bg-sky-500 rounded-2xl border border-black border-solid">
      <div className="grow">{status}</div>
      <img
        src={status === "Sold" ? "https://cdn.builder.io/api/v1/image/assets/TEMP/a024fbed528f73aa602bf9ae65005c45032408554b2b006eb0db5d3d40d82c31?apiKey=b8d09a4545bb49a8a3d7500b55db7534&" : "https://cdn.builder.io/api/v1/image/assets/TEMP/a024fbed528f73aa602bf9ae65005c45032408554b2b006eb0db5d3d40d82c31?apiKey=b8d09a4545bb49a8a3d7500b55db7534&"}
        alt=""
        className="shrink-0 my-auto border border-white border-solid aspect-[1.89] fill-white stroke-[1px] stroke-white w-[15px]"
      />
    </div>
  );
}

function SellerDashboard() {
  return (

    <div className="flex flex-col pt-4 pr-5 pb-20 bg-white">
      
      <main className="flex z-10 flex-col self-center pb-20 mt-0 w-full max-w-[1117px] max-md:mt-0 max-md:max-w-full">
        <div className="flex gap-5 self-end max-w-full w-[1010px] max-md:flex-wrap">
        
          <h2 className="flex-auto self-end mt-20 text-6xl font-bold tracking-wider text-black max-md:mt-10 max-md:max-w-full max-md:text-4xl">
            <Header />
            Seller Dashboard
          </h2>
        </div>
        <h3 className="mt-10 text-3xl font-bold tracking-wide text-black max-md:max-w-full">
          Product Name
        </h3>
        <h3 className="z-10 self-center mt-0 ml-36 text-3xl font-bold tracking-wide text-black">
          Product Status
        </h3>
        {products.map((product) => (
          <React.Fragment key={product.id}>
            <ProductCard product={product} />
            <ProductStatus status={product.status} />
            <img
              src={product.id === 1 ? "https://cdn.builder.io/api/v1/image/assets/TEMP/a32492716550206900f6c80ecd5055ea28a4baf1b5ab13699dda7a39187f8d1b?apiKey=b8d09a4545bb49a8a3d7500b55db7534&" : "https://cdn.builder.io/api/v1/image/assets/TEMP/b2cc632d1738d4a95a37948e5ee84f87dce1115ec0dc933ebef29c9b2584ae3c?apiKey=b8d09a4545bb49a8a3d7500b55db7534&"}
              alt=""
              className={`self-end ${
                product.id === 1 ? "-mt-11" : "mt-0"
              } mr-12 w-7 aspect-square max-md:mr-2.5`}
            />
          </React.Fragment>
        ))}
      </main>
    </div>
  );
}

export default SellerDashboard;