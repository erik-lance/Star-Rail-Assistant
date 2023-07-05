/**
 * This function returns the link to the player's data
 * @param uuid Player's uuid to fetch the data from
 * @returns a string containing the link to the player's data
 */
function player_api_link(uuid: string): string {
    return `https://api.mihomo.me/sr_info_parsed/${uuid}?lang=en`;
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

export interface PlayerData {
    player: PlayerDetails,
    characters: DisplayedCharacters
}

export interface PlayerDetails {
    uuid: string,
    nickname: string,
    level: number,
    world_level: number,
    friend_count: number,
    avatar_name: string,
    signature: string,
    light_cone_count: number,
    avatar_count: number,
    achievement_count: number
}

export interface DisplayedCharacters {
    characters: Character[],
}

export interface Character {
    name: string,
    rarity: number,    // Rank (4* / 5*)
    rank: number,      // Eidolon
    level: number,
    promotion: number, // Ascension
    path: Path,
    element: Element,
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
    const player_details: PlayerDetails = {
        uuid: uuid,
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
    
    const displayed_characters: DisplayedCharacters = {
        characters: []
    }

    const player_data: PlayerData = {
        player: player_details,
        characters: displayed_characters
    }

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

    

    if (response.ok) {
        const api_data = await response.json();

        if (api_data.player == null) {
            console.log("Player not found");
            return null;
        }

        // Grab Player's data
        const player_json = api_data.player;

        // Fill player_details
        player_details.nickname = player_json.nickname;
        player_details.level = player_json.level;
        player_details.world_level = player_json.world_level;
        player_details.friend_count = player_json.friend_count;
        player_details.avatar_name = player_json.avatar.name;
        player_details.signature = player_json.signature;

        // Grab space_info data
        player_details.light_cone_count = player_json.space_info.light_cone_count;
        player_details.avatar_count = player_json.space_info.avatar_count;
        player_details.achievement_count = player_json.space_info.achievement_count;

        // Grab displayed_characters data




    } else {
        console.error("Error fetching data from the game's API (player)");
        throw new Error("Error fetching data from the game's API (player)");
    }


    console.log("Player import completed successfully");

    // Store the data
    return player_data;
}
