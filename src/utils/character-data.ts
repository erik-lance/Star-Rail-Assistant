// Enum of acceptable paths
export enum Path {
    "The Destruction",
    "The Hunt",
    "The Erudition",
    "The Harmony",
    "The Nihility",
    "The Preservation",
    "The Abundance"
}

// Enum of acceptable elements
export enum Element {
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