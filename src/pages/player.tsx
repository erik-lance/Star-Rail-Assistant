import { useState } from "react";
import { CircularProgress } from "@mui/material";
import Avatar from "@/components/Avatar"
import { PlayerDetails } from "@/api/player-details";
import { AiFillTrophy } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import player from "@/styles/player.module.css"

export default function Player() {
    const [uuid, setUuid] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loadedPlayer, setLoadedPlayer] = useState(false);
    const [playerData, setPlayerData] = useState({} as PlayerDetails);
    const [characterData, setCharacterData] = useState({} as any);

    const handleImport = async () => {
        setIsLoading(true);

        try {
            console.log("Handling player import");
            const response = await fetch("/api/import-player-endpoint", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ uuid }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);

                // Handle the successful response from the API
                if (data.success) {
                    console.log("Successfuly retrieved player data from API")
                    const playerDataAPI = data.playerData.player;
                    localStorage.setItem(
                        "star_rail_assistant_player_data",
                        JSON.stringify(playerDataAPI)
                    );

                    const parsed_player_data = JSON.parse(localStorage.getItem("star_rail_assistant_player_data") || "{}");

                    setPlayerData(parsed_player_data);
                    setLoadedPlayer(true);

                    // Perform any other actions with the playerData as needed

                    console.log("Player data imported successfully and stored to local");
                    console.log(playerData)
                } else {
                    console.error("Error importing player data:", data.error);
                    // Handle the error response from the API
                }
            } else {
                console.error("Error importing player data");
                // Handle the error response from the API
            }
        } catch (error) {
            console.error("Error importing player data", error);
            // Handle the fetch error
        } finally {
            setIsLoading(false);
        }
    }


    return <>
        <div className="rounded-lg p-4 m-2 border-2 border-gray-300 bg-gray-800 mb-10 w-1/2">
            <h1 className="text-2xl font-bold">Import your UUID</h1>
            <input className="rounded-lg p-2 m-2 border-2 border-gray-300 bg-gray-700 text-gray-100" type="text" placeholder="UUID" value={uuid} onChange={(e) => setUuid(e.target.value)} />
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

        {/* This is doesn't reveal until player details exist */}
        {playerData.uuid && <>
            <div className="rounded-lg p-4 m-2 border-2 border-gray-300 bg-gray-800 mb-10 w-1/2">
                <h1 className="text-2xl font-bold">Player Details</h1>
                <div
                    className='p-2 m-1 flex h-20 gap-5'
                >
                    <Avatar name={playerData.avatar_name} />
                    <div>
                        <p>UUID: {playerData.uuid}</p>
                        <p>Nick: {playerData.nickname}</p>
                        <p>Level: {playerData.level}</p>
                    </div>
                    <div
                        className={player[`player_details`]}
                    >
                        <p><BsFillPersonFill /> {playerData.friend_count}</p>
                        <p><AiFillTrophy /> {playerData.achievement_count}</p>
                    </div>
                </div>

                {/* Display signature in a box */}
                <div
                    className='p-2 mt-2 mb-4 border-2 border-gray-300 bg-gray-700 rounded-lg h-20'
                >
                    <p>Signature: {playerData.signature}</p>
                </div>

                <div
                    className={player[`player_details`]}
                >
                    <p>World Level: {playerData.world_level}</p>
                    <p>Light Cones: {playerData.light_cone_count}</p>
                    <p>Avatars: {playerData.avatar_count}</p>
                </div>

                {/* Display Avatar */}

            </div>
        </>}
    </>
}