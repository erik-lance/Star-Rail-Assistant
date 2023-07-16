import React from 'react'
import Sticker from './Sticker'

const NoRowsOverlay = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Sticker name="sampo_dumpster" size={150}/>
            <div className="text-gray-400">No data</div>
        </div>
    )
}

export default NoRowsOverlay