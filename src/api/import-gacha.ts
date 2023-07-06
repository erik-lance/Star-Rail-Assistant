import { stringify } from "querystring";
import { GachaItem } from "@/utils/gacha-details";

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

    let gacha_data: GachaItem[] = [];

    function gacha_object(
        time: string,
        name: string,
        item_type: string,
        rank: string,
        id: string
    ) {
        return {
            time: time,
            name: name,
            item_type: item_type,
            rank: rank,
            id: id
        }
    }


    queryDetails.authkey = authkey;
    queryDetails.region = region;
    queryDetails.gacha_type = parseInt(gacha_type);

    while (still_has_pages) {
        console.log("Fetching data from the game's API");
        const response = await fetch(gachaURL + stringify(queryDetails), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const api_data = await response.json();

            if (api_data.data == null) {
                if (api_data.message == "visit too frequently") {
                    // Delay the next request by 1 second and loop again
                    console.log("Too many requests, delaying next request by 1 second");
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    continue;
                } else if (api_data.message == "authkey timeout") {
                    console.error("Authkey used is expired.");
                    throw new Error("Authkey used is expired.");
                }
            }

            const data_list: any[] = api_data.data.list;

            // Checks if the data_list is empty, if it is, then there are no more pages to fetch
            if (data_list.length === 0) {
                still_has_pages = false;
            }
            else {
                data_list.forEach((gacha: any) => {
                    let gacha_item = gacha_object(
                        gacha.time,
                        gacha.name,
                        gacha.item_type,
                        gacha.rank_type,
                        gacha.id
                    );

                    gacha_data.push(gacha_item);
                });

                // Get the last id of the last item in the list
                const last_id = data_list[data_list.length - 1].id;

                // Update the queryDetails object with the last_id
                queryDetails.end_id = last_id;


                console.log("Proceeding to next page");
            }
        } else {
            console.error("Error fetching data from the game's API");
            throw new Error("Error fetching data from the game's API");
        }

    }

    console.log("Gacha import completed successfully");

    // Store the gacha_data to the local storage
    return gacha_data;
}
