import { useEffect, useState } from 'react';
import init, { compile } from 'firnas_wasm';

import { CodeEditorWindow } from './CodeEditorWindow';
import { OutputWindow } from './OutputWindow';
import { Toolbar } from './Toolbar';

export const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    init().then(() => {
      setLoading(false);
    });
  }, []);

  const handleEditorChange = (value: string) => {
    setCode(value);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-10">
      <div>
        <h1 className="flex justify-center font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
          ملعب فرناس
        </h1>
        <Toolbar onRun={() => {
          compile(code, (result: any) => {
            setOutput(result);
          });
        }}
          onShare={() => { }}
        />
        <div className="border-b-2 border-black" />
      </div>
      <div className="flex flex-col space-x-4 items-start py-4">
        <div className="flex flex-col w-full h-full justify-start items-end border-4 border-gray-200">
          <CodeEditorWindow
            code={code}
            onChange={handleEditorChange}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-full flex-col">
          <OutputWindow output={output} />
        </div>
      </div>
    </div >
  );
}
