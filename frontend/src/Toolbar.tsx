interface ToolbarProps {
    onRun: Function,
    onShare: Function,
}

export const Toolbar = ({onRun, onShare}: ToolbarProps) => {
    return (
        <div className="flex flex-row">
            <div className="px-4">
                <button
                    className="mt-4 border-2 border-black rounded-md px-4 py-2 bg-white flex-shrink-0"
                    onClick={() => {
                        onRun()
                    }}
                    >
                    شغّل ▶️
                </button>
                </div>
            <button
                className="mt-4 border-2 border-black rounded-md px-4 py-2 bg-white flex-shrink-0"
                onClick={() => {
                    onShare()
                }}
            >
                شارك
            </button>
        </div>
    );
}
