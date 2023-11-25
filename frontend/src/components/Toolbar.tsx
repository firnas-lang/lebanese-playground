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
                <ToolbarButton onClick={onRun} tooltip={'تشغيل'}>
                    <FiPlay className="fill-green-700 stroke-none" />
                </ToolbarButton>
            </div>

            {/* <ToolbarButton onClick={onShare} tooltip={'شارك'}>
                <FiShare2 />
            </ToolbarButton> */}
        </div>
    );
}

interface ToolbarButtonProps {
    onClick: Function,
    tooltip: string,
    children: ReactNode
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ onClick, children, tooltip }) => {
    return (
        <>
            <button
                data-tooltip-target="tooltip-default"
                type="button"
                onClick={() => { onClick() }}
                className="group relative inline-block duration-300"
            >
                <span className="absolute hidden group-hover:flex translate-x-1/4 -translate-y-full px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm">
                    {tooltip}
                </span>
                {children}
            </button>
        </>
    );
}

