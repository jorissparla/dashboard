import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import React from "react";

type HTMLEditorProps = {
  enabled?: boolean;
  value: string;
  label?: string;
  onChange: (v: string) => void;
};

const HTMLEditor: React.FC<HTMLEditorProps> = ({ enabled = false, value, onChange = console.log, label = "Content" }) => {
  const editorConfiguration = {
    fontFamily: {
      options: ["default", "Ubuntu, Arial, sans-serif", "Poppins", "Ubuntu Mono, Courier New, Courier, monospace"],
    },
    image: {
      // Configure the available styles.
      styles: ["alignLeft", "alignCenter", "alignRight"],
    },
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "blockquote",
      "|",
      "bulletedlist",
      "numberedlist",
      "horizontalLine",
      "|",
      "indent",
      "outdent",
      "|",
      "imageupload",
      "imageStyle:full",
      "imageStyle:side",
      "|",
      "imageTextAlternative",
      "imageStyle:alignLeft",
      "imageStyle:alignCenter",
      "imageStyle:alignRight",
      "|",
      "resizeImage",
      "|",
      "imageTextAlternative",

      "inserttable",

      "|",
      "fontFamily",
      "fontSize",
      "highlight",
      "|",
      "subscript",
      "superscript",
      "|",
      "undo",
      "redo",
    ],
    ckfinder: {
      // Upload the images to the server using the CKFinder QuickUpload command.
      uploadUrl: "https://nlbavwixs.infor.com:3001/upload",
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", "tableProperties", "tableCellProperties"],
    },
  };

  const NoEditorConfiguration = {
    toolbar: "",
  };

  return (
    <div className="mt-2">
      {label !== "nolabel" && (
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <CKEditor
        editor={Editor}
        disabled={!enabled}
        config={!enabled ? NoEditorConfiguration : editorConfiguration}
        // disabled={readOnly}
        data={value}
        onReady={(_editor: any) => {
          // You can store the "editor" and use when it is needed.
        }}
        onChange={(_event: any, editor: { getData: () => any }) => {
          const data = editor.getData();
          // console.log("Change", { event, editor, data });
          onChange(data);
        }}
      />
    </div>
  );
};

export default HTMLEditor;
