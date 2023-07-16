import { StandardCharacters, StandardLightCones } from '@/utils/gacha-details';
import { GachaItem } from '@/utils/gacha-details';


export function get_rolls_since_last_x(star: number, gachaData:any): number{
    // Returns the number of rolls since the last 4* item
    let rolls_since_last_x: number = 0;
    for (let i = 0; i < gachaData.length; i++) {
        if (gachaData[i].rank === star.toString()) {
            return rolls_since_last_x;
        } else {
            rolls_since_last_x++;
        }
    }
    return rolls_since_last_x;
}

export function get_rolls_until_soft_pity(gachaData:any){
    // Returns the number of rolls until soft pity
    const rolls_since_last_five_star:number = get_rolls_since_last_x(5, gachaData);
    const soft_pity:number = 75;

    if (rolls_since_last_five_star >= soft_pity){
        return 0;
    } else {
        return soft_pity - rolls_since_last_five_star;
    }
}

export function get_rolls_until_hard_pity(gachaData:any){
    // Returns the number of rolls until hard pity
    const rolls_since_last_five_star:number = get_rolls_since_last_x(5, gachaData);
    const hard_pity:number = 90;

    return hard_pity - rolls_since_last_five_star;
}

export function get_is_guaranteed_five_star(gachaData:any){
    // Find the last 5* item
    const nullGacha = {
        id: "",
        time: "",
        name: "",
        item_type: "",
        rank: "",
    }        

    let last_five_star:GachaItem = nullGacha;

    for (let i = gachaData.length - 1; i >= 0; i--) {
        if (gachaData[i].rank === "5") {
            last_five_star = gachaData[i];
            break;
        }
    }

    if (last_five_star === nullGacha){
        return "No";
    } else {
        // Check if last 5* item was from StandardCharacters or StandardLightCones
        const values_characters = Object.values(StandardCharacters);
        const values_light_cones = Object.values(StandardLightCones);
        if (values_characters.includes(last_five_star.name) || values_light_cones.includes(last_five_star.name)){
            return "Yes";
        } else {
            return "No";
        }
    }
}