// URL ENDPOINT: https://api.mihomo.me/sr_info_parsed/${uuid}?lang=en

/**
 * This function returns the link to the player's data
 * @param uuid Player's uuid to fetch the data from
 * @returns a string containing the link to the player's data
 */
function player_api_link(uuid: string): string {
    return `https://api.mihomo.me/sr_info_parsed/${uuid}?lang=en`;
}
