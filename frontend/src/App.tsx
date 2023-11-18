import { useEffect, useState } from 'react';

import { CodeEditor } from './components/CodeEditorWindow';
import { OutputWindow } from './components/OutputWindow';
import { Toolbar } from './components/Toolbar';
import { Title } from './components/Title';
import { Divider } from './components/Divider';
import { FirnasAdapter } from './services/firnasAdapter';

export const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    FirnasAdapter.initialize().then(() => {
      setLoading(false);
    });
  }, []);

  const handleEditorChange = (value: string) => {
    setCode(value);
  };

  const handleRun = async () => {
    let result = await FirnasAdapter.execute(code);
    setOutput(result);
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
