import CodeBlock from '@/components/CodeBlock'

export default function Import() {
    return <>
        <div
            className='rounded-lg p-4 m-2 border-2 border-gray-300 bg-gray-800 mb-10 w-1/2'
        >
            <h1 className='text-2xl font-bold'>How to import your gacha link?</h1>
            <p>Follow these steps!</p>
            <ol className='list-decimal list-inside'>
                <li>Open Windows PowerShell</li>
                <li>Copy and paste the command below</li>
                <CodeBlock
                    text={`
                        $scriptUrl = 'https://raw.githubusercontent.com/erik-lance/Star-Rail-Assistant/master/powershell_scripts/Get-Warp-History.ps1'
                        $scriptPath = Join-Path -Path $env:TEMP -ChildPath 'Get-Warp-History.ps1'
                        Invoke-WebRequest -Uri $scriptUrl -OutFile $scriptPath
                        powershell -NoExit -File $scriptPath
                        Remove-Item -Path $scriptPath -Force
                    `}
                />
                <li>This grabs your temporary authkey. Now paste that into the textbox of this page below.</li>


            </ol>
        </div>

        <div
            className='rounded-lg p-2 m-2 border-2 border-gray-300 bg-gray-800'
        >
            <h1 className='text-2xl font-bold'>Import</h1>
            <p>Input your link here</p>
            <input type="text" placeholder="https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog?" className='
                        border-2 border-gray-300 rounded-lg p-2 m-2 w-96
                        '/>
            <button className='
                        border-2 border-gray-300 rounded-lg p-2 m-2
                        '>Import</button>
        </div>

    </>
}