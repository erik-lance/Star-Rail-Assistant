import CodeBlock from "@/components/CodeBlock";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

export default function Import() {
    const [link, setLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleImport = async () => {
        setIsLoading(true);
        
        try {
            console.log("Handling Import");
            const response = await fetch("/api/import-gacha-endpoint", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ link }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);

                // Handle the successful response from the API
                if (data.success) {
                    console.log("Successfuly retrieved gacha data from API")
                    const gachaData = data.gachaData;
                    localStorage.setItem(
                        "star_rail_assistant_gacha_data",
                        JSON.stringify(gachaData)
                    );

                    // Perform any other actions with the gachaData as needed

                    console.log("Gacha data imported successfully and stored to local");
                } else {
                    console.error("Error importing gacha data:", data.error);
                    // Handle the error response from the API
                }
            } else {
                console.error("Error importing gacha data");
                // Handle the error response from the API
            }
        } catch (error) {
            console.error("Error importing gacha data", error);
            // Handle the fetch error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="rounded-lg p-4 m-2 border-2 border-gray-300 bg-gray-800 mb-10 w-1/2">
                <h1 className="text-2xl font-bold">How to import your gacha link?</h1>
                <p>Follow these steps!</p>
                <ol className="list-decimal list-inside">
                    <li>Open Windows PowerShell</li>
                    <li>Copy and paste the command below</li>
                    <CodeBlock
                        text={`
                        $scriptUrl = 'https://raw.githubusercontent.com/erik-lance/Star-Rail-Assistant/master/powershell_scripts/Get-Warp-History.ps1'
                        $scriptContent = Invoke-WebRequest -Uri $scriptUrl | Select-Object -ExpandProperty Content
                        Invoke-Expression -Command $scriptContent
                    `}
                    />
                    <li>This grabs your temporary authkey. Now paste that into the textbox of this page below.</li>
                </ol>
            </div>

            <div className="rounded-lg p-2 m-2 border-2 border-gray-300 bg-gray-800">
                <h1 className="text-2xl font-bold">Import</h1>
                <p>Input your link here</p>
                <input
                    type="text"
                    placeholder="https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog?"
                    className="border-2 border-gray-300 rounded-lg p-2 m-2 w-96"
                    id="import-link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <button
                    className="border-2 border-gray-300 rounded-lg p-2 m-2 w-20 h-15
                        hover:bg-gray-300 hover:text-gray-800
                    "
                    onClick={handleImport}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={15} /> : "Import"}
                </button>
            </div>
        </>
    );
}
