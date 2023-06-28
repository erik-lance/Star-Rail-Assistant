// Displays the history of the user's wishes on a table

// Template for each row of the table
// { time, name, item_type, rank }

// Import material ui table
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { GachaItem } from '@/api/import-gacha';

export default function History() {
    // Retrieve the gacha data from local storage
    let stored_gacha_data;

    console.log("Retrieving gacha data from local storage")
    if (typeof window !== "undefined") {
        stored_gacha_data = localStorage.getItem('star_rail_assistant_gacha_data');
    } else {
        console.log("Window is undefined, cannot retrieve gacha data from local storage")
        stored_gacha_data = null;
    }

    // Parse the JSON string into an object
    const gacha_data = stored_gacha_data ? JSON.parse(stored_gacha_data) : [];


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
                {/* If there is no data, display a message */}
                {gacha_data != null && <TableRow>
                    <TableCell colSpan={4} align="center">No data to display</TableCell>
                </TableRow>}
                {/* If there is data, display it */}
                {gacha_data != null && gacha_data.map((row:GachaItem) => (
                    <TableRow
                        key={row.time}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.time}
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.item_type}</TableCell>
                        <TableCell align="right">{row.rank}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>

}

