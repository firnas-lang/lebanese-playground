import { FiPlay, FiShare2 } from 'react-icons/fi'
import { Title } from './Title';
import { Logo } from './Logo';

interface ToolbarProps {
    onRun: Function,
    onShare: Function,
    onDropdownChange: (code: string) => void,
}

const codeMap: any = {
    "examples": ``,
    "comments": `// Hon btektob te3le2atak
// Firnas ha ynayyemla w ma ha ya3mella compile

kteble3andak("Hi, kifak? ca va?");
`,
    "function": `wazife fibo(n) {
    iza (n < 2) rajje3 n;
    rajje3 fibo(n - 2) + fibo(n - 1);
}

kteble3andak(fibo(20));
`,
    "classes": `// hayda l she l asesi
she Hayawen {
    kol() {
        kteble3andak("L hayawen 3am yekol");
    }
}

// hon l kalb byourat mnel hayawen sefato
she Kalb < Hayawen {
    kol() {
        bayye.kol();
        kteble3andak("3am yekol akel kleb");
    }

    aawe() {
        kteble3andak("aaw aaw");
    }
}

e3teber kalb = Kalb();
kalb.kol();
kalb.aawe();
`
}

export const Toolbar = ({ onRun, onShare, onDropdownChange }: ToolbarProps) => {
    return (
        <div className="flex flex-row items-center py-2">
            <Logo width={32} />

            <div className="px-1" />

            <Title />

            <div className="px-1" />

            <button onClick={() => {
                onRun()
            }}>
                <div className="pl-0 pr-0.5 flex flex-row border border-firnas-500 bg-firnas-500 items-center rounded-xl hover:border-firnas-700 hover:bg-firnas-700">
                    <FiPlay className="px-0.5 fill-white stroke-none" />
                    <p className="text-white px-2 text-s">Sha88el</p>
                </div>
            </button>

            <div className="px-1" />

            <button onClick={() => {
                onShare();
            }}>
                <div className="group pl-0 pr-1 flex flex-row border border-firnas-500 items-center rounded-xl hover:border-firnas-500 hover:bg-firnas-500">
                    <FiShare2 className="px-0.5 fill-firnas-500 stroke-firnas-500 group-hover:fill-white group-hover:stroke-white" />
                    <p className="text-firnas-500 px-2 text-s group-hover:text-white">Share fel kheir</p>
                </div>
            </button>

            <div className="px-1" />

            <select
                onChange={(e) => { const code = codeMap[e.target.value]; onDropdownChange(code); }}
                className="
                    p-0
                    px-1
                    flex
                    flex-row
                    border
                    border-firnas-500
                    items-center
                    rounded-xl
                    text-firnas-500
                    text-s
                    hover:bg-firnas-500
                    hover:text-white
                "
            >
                <option value="examples">Examples</option>
                <option value="comments">Comments</option>
                <option value="function">Functions</option>
                <option value="classes">Classes</option>
            </select>
        </div>
    );
}
