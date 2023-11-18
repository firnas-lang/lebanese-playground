import { ReactNode } from 'react';
import { FiPlay, FiShare2 } from 'react-icons/fi'

interface ToolbarProps {
    onRun: Function,
    onShare: Function,
}

export const Toolbar = ({ onRun, onShare }: ToolbarProps) => {
    return (
        <div className="flex flex-row items-center">
            <div className="px-4">
                <ToolbarButton onClick={onRun} tooltip={'Run'}>
                    <FiPlay />
                </ToolbarButton>
            </div>

            <ToolbarButton onClick={onShare} tooltip={'Share'}>
                <FiShare2 />
            </ToolbarButton>
        </div>
    );
}

interface ToolbarButtonProps {
    onClick: Function,
    tooltip: string,
    children: ReactNode
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ onClick, children }) => {
    return (
        <button
            data-tooltip-target="tooltip-default"
            type="button"
            onClick={() => { onClick() }}
        >
            {children}
        </button>
    );
}

