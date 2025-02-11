// // hook
// import { useState } from "react";
// // props validation
// import PropTypes from "prop-types";

// const Uploader = ({ register, errors }) => {
//   const [image, setImage] = useState(null);
//   const [fileName, setFileName] = useState("Ficher non sélectionné");

//   return (
//     <div className="relative 3xl:col-span-full">
//       <div className="mb-1 flex items-center gap-x-2 pl-1">
//         <label className="font-bold lg:mb-1">Photos / Vidéos</label>
//       </div>

//       <div className="flex w-full items-center justify-center">
//         <label
//           {...register("pictures")}
//           onClick={() => document.querySelector("#dropzone-file").click()}
//           className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-slate-500 hover:bg-[#e4e3e3] 3xl:flex-1"
//         >
//           {image ? (
//             <div className="relative flex min-h-24 min-w-28 flex-col items-center justify-center rounded-md bg-[#e4e3e3] px-2">
//               <i className="fa-solid fa-file mb-1 text-xl"></i>
//               <span className="break-words">{fileName}</span>
//               <i
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setFileName("Ficher non sélectionné");
//                   setImage(null);
//                 }}
//                 className="fa-solid fa-trash absolute right-3 top-2 text-sm transition-colors hover:text-red-600"
//               ></i>
//             </div>
//           ) : (
//             // <img src={image} width={100} height={100} alt={fileName} />
//             <>
//               <div className="flex flex-col items-center justify-center pb-6 pt-5">
//                 <svg
//                   className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 16"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                   />
//                 </svg>
//                 <p className="mb-2 text-sm text-gray-500 2xl:text-base dark:text-gray-400">
//                   <span className="font-semibold">Click to upload</span> or drag
//                   and drop
//                 </p>
//                 <p className="text-xs text-gray-500 2xl:text-sm dark:text-gray-400">
//                   PNG, JPG, MP4, MOV (MAX. 800x400px)
//                 </p>
//               </div>
//             </>
//           )}
//         </label>
//         <input
//           id="dropzone-file"
//           type="file"
//           hidden
//           accept="image/*"
//           onChange={({ target: { files } }) => {
//             files[0] && setFileName(files[0].name);
//             if (files) {
//               setImage(URL.createObjectURL(files[0]));
//             }
//             console.log(image);
//           }}
//         />
//       </div>

//       {errors && (
//         <p className="absolute -bottom-6 left-1 text-sm text-red-600 md:-bottom-7 md:text-base 3xl:-bottom-5">
//           {" "}
//           <i className="fa-solid fa-triangle-exclamation mr-1"></i>{" "}
//           {errors.message}
//         </p>
//       )}
//     </div>
//   );
// };

// Uploader.propTypes = {
//   register: PropTypes.func.isRequired,
//   errors: PropTypes.object,
// };

// export default Uploader;
