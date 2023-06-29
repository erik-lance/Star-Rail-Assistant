// Displays the history of the user's wishes on a table

// Template for each row of the table
// { time, name, item_type, rank }

// Import material ui table
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { GachaItem } from '@/api/import-gacha';
import { useEffect, useState } from 'react';
import ranks from '@/styles/ranks.module.css'

export default function History() {
    // Retrieve the gacha data from local storage

    const [isLoading, setIsLoading] = useState(true);
    const [gachaData, setGachaData] = useState([]);

    useEffect(() => {
        // Simulate data fetching delay (replace with your actual data fetching logic)
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


    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Item Type</TableCell>
                    <TableCell align="right">Rank</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {isLoading ? (
                    <TableRow>
                        <TableCell colSpan={4} align="center">
                            <CircularProgress />
                        </TableCell>
                    </TableRow>
                ) : gachaData.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={4} align="center">
                            No data to display
                        </TableCell>
                    </TableRow>
                ) : (
                    gachaData.map((row:GachaItem) => (
                        <TableRow 
                            key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            
                        >
                            <TableCell component="th" scope="row" className={ranks[`rank-${row.rank}`]}>
                                {row.id}
                            </TableCell>
                            <TableCell component="th" scope="row" className={ranks[`rank-${row.rank}`]}>
                                {row.time}
                            </TableCell>
                            <TableCell align="right" className={ranks[`rank-${row.rank}`]}>{row.name}</TableCell>
                            <TableCell align="right" className={ranks[`rank-${row.rank}`]}>{row.item_type}</TableCell>
                            <TableCell align="right" className={ranks[`rank-${row.rank}`]}>{row.rank}</TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    </TableContainer>

}

