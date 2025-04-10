// "use client";
// import React from "react";
// import "react-quill/dist/quill.snow.css";
// import { useEffect, useState } from "react";
// import "react-quill/dist/quill.snow.css";
// import { Quill } from "react-quill";
// import dynamic from "next/dynamic";
// import ImageUploader from "quill-image-uploader";

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
//   imageUploader: {
//     upload: (file) => {
//       return new Promise((resolve, reject) => {
//         const formData = new FormData();
//         formData.append("images", file);
//         fetch(
//           "https://test-node-vercel-production.up.railway.app/newsletter/images",
//           {
//             method: "POST",
//             body: formData,
//           }
//         )
//           .then((response) => response.json())
//           .then((result) => {
//             console.log(result);
//             resolve(result.data.images[0]);
//           })
//           .catch((error) => {
//             reject("Upload failed");
//             console.error("Error:", error);
//           });
//       });
//     },
//   },
// };

// interface RichTextEditorProps {
//   onChange: (content: string) => void;
//   value: string;
// }

// const RichTextEditor: React.FC<RichTextEditorProps> = ({ onChange, value }) => {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     Quill.register("modules/imageUploader", ImageUploader);
//   }, []);

//   if (!isClient) return null;

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

// "use client";
// import React from "react";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";
// import { useEffect, useState } from "react";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import "react-quill/dist/quill.snow.css";
// import { Quill } from "react-quill";
// import ImageUploader from "quill-image-uploader";

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
//   imageUploader: {
//     upload: (file) => {
//       return new Promise((resolve, reject) => {
//         const formData = new FormData();
//         formData.append("images", file);
//         fetch(
//           "https://test-node-vercel-production.up.railway.app/newsletter/images",
//           {
//             method: "POST",
//             body: formData,
//           }
//         )
//           .then((response) => response.json())
//           .then((result) => {
//             console.log(result);
//             resolve(result.data.images[0]);
//           })
//           .catch((error) => {
//             reject("Upload failed");
//             console.error("Error:", error);
//           });
//       });
//     },
//   },
// };

// const RichTextEditor = ({ onChange, value }) => {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     Quill.register("modules/imageUploader", ImageUploader);
//   }, []);

//   if (!isClient) return null;

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

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modulesBase = {
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
};

interface RichTextEditorProps {
  onChange: (content: string) => void;
  value: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ onChange, value }) => {
  const [modules, setModules] = useState<any>(modulesBase);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loadModules = async () => {
      const Quill = (await import("quill")).default;
      const ImageUploader = (await import("quill-image-uploader")).default;

      // Safely register the imageUploader module
      try {
        Quill.register("modules/imageUploader", ImageUploader);
      } catch (error) {
        // Ignore error if already registered
        console.error("Error registering imageUploader module:", error);
      }

      setModules({
        ...modulesBase,
        imageUploader: {
          upload: (file: File) => {
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
                .then((res) => res.json())
                .then((result) => {
                  resolve(result.data.images[0]);
                })
                .catch((err) => {
                  reject("Upload failed");
                  console.error("Upload error:", err);
                });
            });
          },
        },
      });

      setMounted(true);
    };

    loadModules();
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full">
      <ReactQuill
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
