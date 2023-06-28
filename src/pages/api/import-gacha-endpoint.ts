// pages/api/import.ts

import { NextApiRequest, NextApiResponse } from "next";
import importGacha from "@/api/import-gacha";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Starting gacha import");
    if (req.method === "POST") {
        try {
            const { link } = req.body;
            await importGacha(link);

            res.status(200).json({ message: "Gacha import completed successfully" });
        } catch (error) {
            console.error("Error importing gacha data", error);
            res.status(500).json({ error: "Error importing gacha data" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
