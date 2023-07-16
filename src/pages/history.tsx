// Displays the history of the user's wishes on a table

// Template for each row of the table
// { time, name, item_type, rank }

// Import material ui table
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { GachaItem } from '@/utils/gacha-details';
import { useEffect, useState } from 'react';
import Sticker from '@/components/Sticker';

import { get_rolls_since_last_x, get_rolls_until_soft_pity, get_rolls_until_hard_pity, get_is_guaranteed_five_star } from '@/utils/rolls-calculator';

export default function History() {
    // Retrieve the gacha data from local storage

    const [isLoading, setIsLoading] = useState(true);
    const [gachaData, setGachaData] = useState([] as GachaItem[]);

    useEffect(() => {
        // Simulate data fetching delay
        const fetchGachaData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Replace this with your actual data retrieval logic
            const storedGachaData = localStorage.getItem("star_rail_assistant_gacha_data");
            const parsedGachaData = storedGachaData ? JSON.parse(storedGachaData) : [];
            setGachaData(parsedGachaData);
            setIsLoading(false);
        };

        fetchGachaData();
    }, []);



    return (<>
        <div
            className="flex flex-col items-center justify-center py-2 gap-5"
        >
            {/* This contains the stats of the wishes */}
            <div
                className="flex flex-col items-center justify-center py-2 gap-5"
            >
                <h1>Warp Stats</h1>
                <div
                    className="flex flex-row items-center justify-center py-2 gap-5"
                >
                    {isLoading ? (
                        <CircularProgress />
                    ) : gachaData.length === 0 ? (
                        <p>No data</p>
                    ) : (
                        <>
                            <div>
                                <div>Number of Warps: {gachaData.length}</div>
                                <div>Rolls since last <span className={`rank-4`}>4*</span>: {get_rolls_since_last_x(4, gachaData)}</div>
                                <div>Rolls since last <span className={`rank-5`}>5*</span>: {get_rolls_since_last_x(5, gachaData)}</div>
                            </div>
                            <div>
                                <div>Rolls until soft pity: {get_rolls_until_soft_pity(gachaData)}</div>
                                <div>Rolls until hard pity: {get_rolls_until_hard_pity(gachaData)}</div>
                                <div>Guaranteed Promo <span className={`rank-5`}>5*</span>?: {get_is_guaranteed_five_star(gachaData)}</div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div >

        {/* This contains the table of the wish history */}
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Item Type</TableCell>
                            <TableCell align="right">Rank</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : gachaData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <div
                                        className="flex flex-col items-center justify-center py-2 gap-5"
                                    >
                                    <Sticker name="pom_sad" size={250}/>
                                    No data to display (try importing your gacha data first)
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            gachaData.map((row: GachaItem) => (
                                <TableRow
                                    key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}

                                >
                                    <TableCell component="th" scope="row" className={`rank-${row.rank}`}>
                                        {row.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row" className={`rank-${row.rank}`}>
                                        {row.time}
                                    </TableCell>
                                    <TableCell align="right" className={`rank-${row.rank}`}>{row.name}</TableCell>
                                    <TableCell align="right" className={`rank-${row.rank}`}>{row.item_type}</TableCell>
                                    <TableCell align="right" className={`rank-${row.rank}`}>{row.rank}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    </>);



}

