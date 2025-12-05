import React from 'react'

function SpinLoader() {
    return (
        <>
        
            <div className="flex-col gap-4 w-full flex items-center justify-center">
                <div
                    className="w-12 h-12 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
                >
                    <div
                        className="w-9 h-9 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                    ></div>
                </div>
            </div>

        </>
    )
}

export default SpinLoader