import { useState } from "react";
import CodeMirror from '@uiw/react-codemirror';

interface CodeEditorProps {
    onChange: Function,
    code: string
}

export const CodeEditor = ({ onChange, code }: CodeEditorProps) => {
    const [value, setValue] = useState(code || "");

    const handleEditorChange = (value: string, _viewUpdate: any) => {
        setValue(value);
        onChange(value);
    };

    return (
        <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
            <CodeMirror
                value={value}
                height="50vh"
                onChange={handleEditorChange}
            />
        </div>
    );
};
