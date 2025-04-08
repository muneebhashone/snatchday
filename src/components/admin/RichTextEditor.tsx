// "use client";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// const modules = {
//   toolbar: [
//     [{ font: [] }, { size: [] }],
//     ["bold", "italic", "underline", "strike"],
//     [{ color: [] }, { background: [] }],
//     [{ script: "sub" }, { script: "super" }],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ indent: "-1" }, { indent: "+1" }],
//     [{ align: [] }],
//     ["blockquote", "code-block"],
//     ["link", "image", "video"],
//     ["clean"],
//   ],
// };

// const RichTextEditor = ({ onChange, value }) => {
//   return (
//     <div className="w-full">
//       <ReactQuill
//         theme="snow"
//         value={value}
//         modules={modules}
//         onChange={onChange}
//         className="h-64 mb-16"
//       />
//     </div>
//   );
// };

// export default RichTextEditor;
"use client";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import { useRef } from "react";

Quill.register("modules/imageUploader", ImageUploader);
const modules = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
  ],
  imageUploader: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("images", file);
        fetch(
          "https://test-node-vercel-production.up.railway.app/newsletter/images",
          {
            method: "POST",
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            resolve(result.data.images[0]);
          })
          .catch((error) => {
            reject("Upload failed");
            console.error("Error:", error);
          });
      });
    },
  },
};

const RichTextEditor = ({ onChange, value }) => {
  const ref = useRef();
  return (
    <div className="w-full">
      <ReactQuill
        ref={ref}
        theme="snow"
        value={value}
        modules={modules}
        onChange={onChange}
        className="h-64 mb-16"
      />
    </div>
  );
};

export default RichTextEditor;
