import { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';

import { OutputWindow } from './components/OutputWindow';
import { Toolbar } from './components/Toolbar';
import { Divider } from './components/Divider';
import { FirnasAdapter } from './services/firnasAdapter';
import { b64Encode } from './services/encoDeco';
import { Logo } from './components/Logo';

export const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => { initialize(); }, []);

  const initialize = async () => {
    await FirnasAdapter.initialize();
    // const params = new URLSearchParams(window.location.search);
    // const codeParam: string | null = params.get('code');
    // if (codeParam) {
    //   console.warn(codeParam);
    //   setCode(b64Decode(codeParam));
    // }
    setLoading(false);
  }

  const handleEditorChange = (value: string) => {
    setCode(value);
  };

  const handleRun = async () => {
    try {
      let result = await FirnasAdapter.execute(code);
      setOutput(result.join("\n"));
    } catch (e) {
      console.error(e);
    }
  }

  const handleEncoding = () => {
    let encodedCode = b64Encode(code);
    console.log(encodedCode);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <div>
          <Logo width={64} />
          <p className='text-center'>جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-10 min-h-screen">
      <Toolbar
        onRun={handleRun}
        onShare={handleEncoding}
        onDropdownChange={(newCode) => {
          handleEditorChange(newCode);
        }}
      />
      <Divider />
      <div className="flex flex-col pt-4">
        <div className="w-full border-4 border-gray-200">
          <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
            <CodeMirror
              value={code}
              height="50vh"
              onChange={handleEditorChange}
            />
          </div>
        </div>

        <OutputWindow output={output} />
      </div>
    </div >
  );
}
