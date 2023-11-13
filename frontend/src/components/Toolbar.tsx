import { FiPlay, FiShare2 } from 'react-icons/fi'

interface ToolbarProps {
    onRun: Function,
    onShare: Function,
}

export const Toolbar = ({ onRun, onShare }: ToolbarProps) => {
    return (
        <div className="flex flex-row items-center">
            <div className="px-4">
                <button onClick={() => { onRun() }}>
                    <FiPlay />
                </button>
            </div>
            <button onClick={() => { onShare() }}>
                <FiShare2 />
            </button>
        </div>
    );
}
