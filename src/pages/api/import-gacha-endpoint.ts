import { NextApiRequest, NextApiResponse } from "next";
import importGacha, { GachaItem } from "@/api/import-gacha";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Starting gacha import");
    if (req.method === "POST") {
        try {
            const { link } = req.body;
            const gachaData: GachaItem[] = await importGacha(link);

            res.status(200).json({ success: true, result: gachaData });
        } catch (error) {
            console.error("Error importing gacha data", error);
            res.status(500).json({ success: false, error: "Error importing gacha data" });
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}
