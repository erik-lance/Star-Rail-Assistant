import { stringify } from "querystring";

const gachaURL = "https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog?";
const queryDetails = {
    authkey_ver: 1,
    sign_type: 2,
    region: "",
    default_gacha_type: 0,
    lang: "en",
    authkey: "",
    game_biz: "hkrpg_global",
    size: 20,
    gacha_type: 0,
    end_id: 0,
};

export default async function importGacha(link: string) {
    console.log("Starting gacha import script")
    console.log(link);
    const authkey: string = link.split("authkey=")[1].split("&")[0].replaceAll("%2F", "/").replaceAll("%2B", "+").replaceAll("%3D", "=");
    const region: string = link.split("region=")[1].split("&")[0];
    const gacha_type: string = link.split("&gacha_type=")[1].split("&")[0];

    let still_has_pages = true;

    while (still_has_pages) {
        queryDetails.authkey = authkey;
        queryDetails.region = region;
        queryDetails.gacha_type = parseInt(gacha_type);

        console.log("Fetching data from the game's API");
        console.log(gachaURL + stringify(queryDetails));
        const response = await fetch(gachaURL + stringify(queryDetails), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);

            // const last_id = data.data.list[data.data.list.length - 1].id;
            // still_has_pages = data.data.list.length === queryDetails.size;
            still_has_pages = false;
        } else {
            console.error("Error fetching data from the game's API");
            throw new Error("Error fetching data from the game's API");
        }
    }

    console.log("Gacha import completed successfully");
}
