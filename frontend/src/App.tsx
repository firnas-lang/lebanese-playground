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
    <div className="">
      <div className="px-10">
        <Toolbar onRun={() => {
          compile(code, (result: any) => {
            setOutput(result);
          });
        }} onShare={() => {}} />
      </div>
      <div className="flex flex-row space-x-4 items-start py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            code={code}
            onChange={handleEditorChange}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow output={output} />
        </div>
      </div>
    </div>
  );
}
