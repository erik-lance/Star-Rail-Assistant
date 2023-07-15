import { useRouter } from 'next/router';

import { useState } from "react";
import { CircularProgress } from "@mui/material";
import Avatar from "@/components/Avatar"
import { Character, DisplayedCharacters, PlayerDetails } from "@/utils/character-data";
import { AiFillTrophy } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import player from "@/styles/player.module.css"

export default function UserPage() {
    const router = useRouter();
    const { uuid } = router.query;

    const [isLoading, setIsLoading] = useState(false);
    const [loadedPlayer, setLoadedPlayer] = useState(false);
    const [playerData, setPlayerData] = useState({} as PlayerDetails);
    const [characterData, setCharacterData] = useState({} as DisplayedCharacters);

    const handleImport = async () => {
        try {
            console.log("Loading a player page");
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
                console.log("Successfuly retrieved player data from API")
                const playerDataAPI = data.playerData;
                localStorage.setItem(
                    "star_rail_assistant_player_data_" + uuid,
                    JSON.stringify(playerDataAPI)
                );

                const parsed_player_data = JSON.parse(localStorage.getItem("star_rail_assistant_player_data_" + uuid) || "{}");

                setPlayerData(parsed_player_data.player);
                setCharacterData(parsed_player_data.characters);
                setLoadedPlayer(true);

                // Perform any other actions with the playerData as needed

                console.log("Player data imported successfully and stored to local");
                console.log(playerData)
                console.log(characterData)
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

    // Begin importing player data on page load
    if (!isLoading && !loadedPlayer) {
        setIsLoading(true);
        handleImport();
    }

    return <>
        {/* This shows a loading icon while loading details */}
        {isLoading && <div className="flex justify-center items-center h-screen">
            <CircularProgress />
        </div>}

        {/* This is doesn't reveal until player details exist */}
        {playerData.uuid && <>
            <div className="rounded-lg p-4 m-2 border-2 border-gray-300 bg-brown mb-10 w-1/2">
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
                    className='p-2 mt-2 mb-4 border-2 border-gray-300 bg-dark-red rounded-lg h-20'
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

            </div>
        </>}

        {/* This is doesn't reveal until character details exist */}
        {characterData && characterData.characters && (
            <div className="flex flex-col rounded-lg p-4 m-2 border-2 border-gray-300 bg-brown mb-10 w-1/2">
                <h1 className="text-2xl font-bold">Displayed Characters</h1>
                <div className="flex flex-col items-center">
                    {characterData.characters.map((character: Character) => (
                        <div key={character.name} className="p-2 m-1 flex gap-5">
                            <div
                                className="flex flex-row gap-5"
                            >
                                <Avatar 
                                    name={character.name}
                                />
                                <div>
                                    <p>{character.name}</p>
                                    <p>Level: {character.level}</p>
                                    <p>Eidolons: {character.rank}</p>
                                    <p>Rarity: {character.rarity}</p>
                                </div>
                                <div>
                                    <p>Promotion: {character.promotion}</p>
                                    <p>Path: {character.path}</p>
                                    <p>Element: {character.element}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}


    </>
}
