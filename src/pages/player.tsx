import { useState } from "react";
import { CircularProgress } from "@mui/material";

export default function Player() {
    const [uuid, setUuid] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
                    const playerData = data.playerData;
                    localStorage.setItem(
                        "star_rail_assistant_player_data",
                        JSON.stringify(playerData)
                    );

                    // Perform any other actions with the playerData as needed

                    console.log("Player data imported successfully and stored to local");
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
    </>
}