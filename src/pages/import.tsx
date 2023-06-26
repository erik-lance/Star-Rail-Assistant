import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Import() {
    return <>
        <div>
            <h1>How to import your gacha link?</h1>
            <p>Some steps...</p>
        </div>

        <div
            className='rounded-lg p-2 m-2 border-2 border-gray-300 bg-gray-800'
        >
            <h1>Import</h1>
            <p>Input your link here</p>
            <input type="text" placeholder="https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog?" className='
                        border-2 border-gray-300 rounded-lg p-2 m-2 w-96
                        '/>
        </div>

    </>
}