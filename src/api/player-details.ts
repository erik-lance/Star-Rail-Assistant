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
        uid: uuid,
        nickname: "",
        level: 0,
        world_level: 0,
        friend_count: 0,
        avatar_name: "",
        signature: "",

        light_cone_count: 0,
        avatar_count: 0,
        achievement_count: 0
    }

    const displayed_characters_data = [];

    function character_data(
        name: string,
        rarity: number,    // Rank (4* / 5*)
        rank: number,      // Eidolon
        level: number,
        promotion: number, // Ascension
        path: Path,
        element: Element,

    ) {
        return {
            name: name,
            rarity: rarity,
            rank: rank,
            level: level,
            promotion: promotion,
            path: path,
            element: element
        }
    }

    // Enum of acceptable paths
    enum Path {
        "The Destruction",
        "The Hunt",
        "The Erudition",
        "The Harmony",
        "The Nihility",
        "The Preservation",
        "The Abundance"
    }

    // Enum of acceptable elements
    enum Element {
        "Physical",
        "Fire",
        "Ice",
        "Lightning",
        "Wind",
        "Quantum",
        "Imaginary"
    }

    if (response.ok) {
        const api_data = await response.json();

        if (api_data.data == null) {
            console.log("Player not found");
            return null;
        }

        // Grab Player's data
        const player_json = api_data.player;

        if (player_json == null) {
            console.log("Player not found");
            return null;
        }

        // Fill player_data
        player_data.nickname = player_json.nickname;
        player_data.level = player_json.level;
        player_data.world_level = player_json.world_level;
        player_data.friend_count = player_json.friend_count;
        player_data.avatar_name = player_json.avatar.name;
        player_data.signature = player_json.signature;

        // Grab space_info data
        player_data.light_cone_count = api_data.space_info.light_cone_count;
        player_data.avatar_count = api_data.space_info.avatar_count;
        player_data.achievement_count = api_data.space_info.achievement_count;

        // Grab displayed_characters data




    } else {
        console.error("Error fetching data from the game's API (player)");
        throw new Error("Error fetching data from the game's API (player)");
    }


    console.log("Player import completed successfully");

    // Store the data
}
