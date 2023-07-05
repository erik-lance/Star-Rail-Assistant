import { NextApiRequest, NextApiResponse } from "next";
import importPlayer from "@/api/player-details";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Starting player import");
    if (req.method === "POST") {
        try {
            const { uuid } = req.body;
            const playerData = await importPlayer(uuid);

            res.status(200).json({ success: true, playerData });
        } catch (error: any) {
            console.log("[import-player-endpoint] Error importing player data"+ error);
            res.status(500).json({ success: false, error: error.message, detailedError: error });
        }
    } else {
        res.status(405).json({ success: false, error: "Method Not Allowed" });
    }
}
