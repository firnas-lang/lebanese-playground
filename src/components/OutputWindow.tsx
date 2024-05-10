interface OutputWindowProps {
    output: string
}

export const OutputWindow = ({ output }: OutputWindowProps) => {
    return (
        <div className="flex flex-col w-full">
            <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
                Nateji
            </h1>
            <pre className="w-full h-[30vh] bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto px-2 py-1">
                {output}
            </pre>
        </div>
    );
}
