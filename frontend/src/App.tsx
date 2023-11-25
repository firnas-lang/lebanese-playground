import { useEffect, useState } from 'react';

import { CodeEditor } from './components/CodeEditorWindow';
import { OutputWindow } from './components/OutputWindow';
import { Toolbar } from './components/Toolbar';
import { Title } from './components/Title';
import { Divider } from './components/Divider';
import { FirnasAdapter } from './services/firnasAdapter';
import { b64Encode, b64Decode } from './services/encoDeco';

export const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => { initialize(); }, []);

  const initialize = async () => {
    await FirnasAdapter.initialize();
    const params = new URLSearchParams(window.location.search)
    const codeParam: string | null = params.get('code');
    if (codeParam) {
      console.warn(codeParam);
      setCode(b64Decode(codeParam));
    }
    setLoading(false);
  }

  const handleEditorChange = (value: string) => {
    setCode(value);
  };

  const handleRun = async () => {
    try {
      let result = await FirnasAdapter.execute(code);
      setOutput(result);
    } catch (e) {
      console.error(e);
    }
  }

  const handleEncoding = () => {
    let encodedCode = b64Encode(code);
    console.log(encodedCode);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-10">
      <Title />
      <Toolbar
        onRun={handleRun}
        onShare={handleEncoding}
      />
      <Divider />
      <div className="flex flex-col pt-4">
        <div className="w-full border-4 border-gray-200">
          <CodeEditor
            code={code}
            onChange={handleEditorChange}
          />
        </div>

        <OutputWindow output={output} />
      </div>
    </div >
  );
}
