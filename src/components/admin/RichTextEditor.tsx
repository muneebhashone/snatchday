"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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
};

const RichTextEditor = ({ onChange, value }) => {
//   const [content, setContent] = useState("");
//   const handleOnChange = (data) => {
//     setContent(data);
//     sendContent(data);
//   };
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
