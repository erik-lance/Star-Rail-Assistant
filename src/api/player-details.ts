/**
 * This function returns the link to the player's data
 * @param uuid Player's uuid to fetch the data from
 * @returns a string containing the link to the player's data
 */
function player_api_link(uuid: string): string {
    return `https://api.mihomo.me/sr_info_parsed/${uuid}?lang=en`;
}

export default async function importPlayer(uuid: string) {
    console.log("Starting player import script")
    const player_url = player_api_link(uuid);
    const response = await fetch(player_url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Note: the last 3 keys are found inside space_info
    const player_data = {
        nickname: "",
        level: 0,
        world_level: 0,
        friend_count: 0,
        avatar: {
            name: "",
        },
        signature: "",

        light_cone_count: 0,
        avatar_count: 0,
        achievement_count: 0
    }

    console.log("Player import completed successfully");

    // Store the data
}
