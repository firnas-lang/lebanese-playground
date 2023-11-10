import { useState } from "react";
import CodeMirror from '@uiw/react-codemirror';

interface CodeEditorWindowProps {
    onChange: Function,
    code: string
}

export const CodeEditorWindow = ({ onChange, code }: CodeEditorWindowProps) => {
    const [value, setValue] = useState(code || "");

    const handleEditorChange = (value: string, _viewUpdate: any) => {
        setValue(value);
        onChange(value);
    };

    return (
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
            <CodeMirror
                value={value}
                height="100vh"
                onChange={handleEditorChange}
            />
        </div>
    );
};
