// Displays the history of the user's wishes on a table

// Template for each row of the table
// { time, name, item_type, rank }

// Import material ui table
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const test_rows = [
    { time: '2021-10-01 12:00:00', name: 'Diluc', item_type: 'Character', rank: 'S' },
    { time: '2021-10-01 12:00:00', name: 'Diluc', item_type: 'Character', rank: 'A' },
    { time: '2021-10-01 12:00:00', name: 'Diluc', item_type: 'Character', rank: 'B' },
    { time: '2021-10-01 12:00:00', name: 'Diluc', item_type: 'Character', rank: 'C' },
]

export default function History() {
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
                {
                    test_rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.time}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.item_type}</TableCell>
                            <TableCell align="right">{row.rank}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </TableContainer>

}

