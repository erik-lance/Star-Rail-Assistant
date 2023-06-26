import React from 'react'

function copyText(text: string) {
    navigator.clipboard.writeText(text)
}

const CodeBlock = (
    { text }: { text: string }
) => {
    return (
        <div
            className='p-2 m-1 rounded-lg bg-black flex flex-col'
        >
            <p
                className='text-white font-sans'
            >
                {text}
            </p>
            <div
                className='flex flex-row justify-end items-center'
            >
                <p
                    className='text-white text-xs px-5'
                >Shell</p>
                <button
                    className='bg-gray-800 text-white rounded-lg p-2 text-xs'
                    onClick={() => copyText(text)}
                >Copy</button>
            </div>

        </div>
    )
};

export default CodeBlock;