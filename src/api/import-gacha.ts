// This script is used to import gacha data from the game to the database.
// It grabs the auth token from the game and uses it to make requests to the game's API.
// It then parses the data and inserts it into the database.
// or just display wishes if the user wishes.

import { stringify } from "querystring"

const queryDetails = {
    "authkey_ver": 1,
    "sign_type": 2,
    "region": "",
    "default_gacha_type": 0,
    "lang": "en",
    "authkey": "",
    "game_biz": "hkrpg_global",
    "size": 20,
    "end_id": 0
}

const gachaURL = "https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog?";

export default async function importGacha(link: string) { 
    const authkey = link.split("authkey=")[1].split("&")[0];
    const region = link.split("region=")[1].split("&")[0];
    
    let last_id:number = 0;
    let still_has_pages:boolean = true;

    // Loop through all pages of gacha data
    // by replacing last_id with the last id of the last item in the previous page
    // until the last page is reached

    // Fill in queryDetails
    queryDetails.authkey = authkey;
    queryDetails.region = region;

    console.log(queryDetails);
    console.log(stringify(queryDetails));

    while (still_has_pages) {
        // Fetch data from the game's API
        const response = await fetch(gachaURL + stringify(queryDetails));

        // Parse and print data
        const data = await response.json();
        console.log(data);


    }

    
}
