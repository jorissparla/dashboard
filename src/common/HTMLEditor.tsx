import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from "react";

type HTMLEditorProps = {
  enabled?: boolean;
  value: string;
  label?: string;
  onChange: (v: string) => void;
};

const HTMLEditor: React.FC<HTMLEditorProps> = ({ enabled = false, value, onChange = console.log, label = "Content" }) => {
  // const [config, setConfig] = useState<{
  //   toolbar?: string;
  //   ckfinder?: {
  //     uploadUrl: string;
  //   };
  // }>({
  //   toolbar: "",
  // });
  // useEffect(() => {
  //   if (enabled) {
  //     setConfig({
  //       ckfinder: {
  //         uploadUrl: "https://nlbavwixs.infor.com:3001/upload",
  //       },
  //     });
  //   } else {
  //     setConfig({
  //       toolbar: "",
  //     });
  //   }
  // }, [enabled]);
  const config = enabled
    ? {
        ckfinder: {
          uploadUrl: "https://nlbavwixs.infor.com:3001/upload",
        },
      }
    : {
        toolbar: "",
      };
  return (
    <div className="mt-2">
      <label htmlFor="content" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <CKEditor
        editor={ClassicEditor}
        disabled={!enabled}
        config={config}
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
