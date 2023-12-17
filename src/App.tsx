import { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import 'react-toastify/dist/ReactToastify.css';

import { OutputWindow } from './components/OutputWindow';
import { Toolbar } from './components/Toolbar';
import { Divider } from './components/Divider';
import { Logo } from './components/Logo';
import { FirnasAdapter } from './services/firnasAdapter';
import { b64Encode, b64Decode } from './services/encoDeco';
import { ToastContainer, toast } from 'react-toastify';

export const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => { initialize(); }, []);

  const initialize = async () => {
    await FirnasAdapter.initialize();
    const params = new URLSearchParams(window.location.search);
    const codeParam: string | null = params.get('code');
    if (codeParam) {
      setCode(b64Decode(codeParam));
    }
    setLoading(false);
  }

  const handleEditorChange = (value: string) => {
    setCode(value);
  }

  const handleRun = async () => {
    try {
      let result = await FirnasAdapter.execute(code);
      setOutput(result.join("\n"));
    } catch (e) {
      console.error(e);
    }
  }

  const handleShare = async () => {
    let encodedCode = b64Encode(code);
    let url = `${window.location.hostname}?code=${encodedCode}`;
    toast.info('تم نسخ الرابط', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return await navigator.clipboard.writeText(url);
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
    <>
      <div className="px-10 min-h-screen">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          rtl
          theme="light"
        />
        <Toolbar
          onRun={handleRun}
          onShare={handleShare}
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
    </>
  );
}
