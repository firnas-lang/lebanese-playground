import { useEffect, useState } from 'react';
import init, { compile } from 'firnas_wasm';

import { CodeEditor } from './components/CodeEditorWindow';
import { OutputWindow } from './components/OutputWindow';
import { Toolbar } from './components/Toolbar';
import { Title } from './components/Title';
import { Divider } from './components/Divider';

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

  const handleRun = () => {
    compile(code, (result: any) => {
      setOutput(result);
    });
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-10">
      <Title />
      <Toolbar
        onRun={handleRun}
        onShare={() => { }}
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
