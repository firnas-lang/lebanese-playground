import { useEffect, useState } from 'react';
import init, { compile } from 'firnas_wasm';

import { CodeEditorWindow } from './CodeEditorWindow';
import { OutputWindow } from './OutputWindow';

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
    <>
      <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end px-10">
          <div className="w-full h-full font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
            <h1>لوحة الترميز</h1>
          </div>
          <CodeEditorWindow
            code={code}
            onChange={handleEditorChange}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow output={output} />
          <div className="flex flex-col items-start">
            <button
              className="mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0"
              onClick={() => {
                setOutput("");
                compile(code, (result: string) => {
                  setOutput(output + result);
                });
              }}
            >
              جمّع ونفّذ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
