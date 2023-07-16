// Displays the history of the user's wishes on a table

// Template for each row of the table
// { time, name, item_type, rank }

// Import material ui table
import { CircularProgress } from '@mui/material';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { GachaItem } from '@/utils/gacha-details';
import { useEffect, useState } from 'react';
import Avatar from '@/components/Avatar'

import { get_rolls_since_last_x, get_rolls_until_soft_pity, get_rolls_until_hard_pity, get_is_guaranteed_five_star } from '@/utils/rolls-calculator';

import NoRowsOverlay from '@/components/NoRowsOverlay';

export default function History() {
    // Retrieve the gacha data from local storage

    const [isLoading, setIsLoading] = useState(true);
    const [gachaData, setGachaData] = useState([] as GachaItem[]);
    const [rows, setRows] = useState<any[]>([]);

    const columns: GridColDef[] = [
        { field: 'time', headerName: 'Time', width: 200 },
        { 
            field: 'name', headerName: 'Name', width: 300,
            renderCell(params) {
                const item = params.row as GachaItem;
                if (item.item_type === "Character") {
                    return <>
                        <Avatar name={item.name} /> 
                        <span className="ml-2">{item.name}</span>
                    </>
                }
                return params.value;
            },
    
        },
        { field: 'item_type', headerName: 'Item Type', width: 100 },
        { field: 'rank', headerName: 'Rank', width: 10, align: 'center' },
    ]

    useEffect(() => {
        // Simulate data fetching delay
        const fetchGachaData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Replace this with your actual data retrieval logic
            const storedGachaData = localStorage.getItem("star_rail_assistant_gacha_data");
            const parsedGachaData = storedGachaData ? JSON.parse(storedGachaData) : [];

            setGachaData(parsedGachaData);

            // Update rows
            const updatedRows = parsedGachaData.map((item: GachaItem, index: number) => ({
                id: index,
                time: item.time,
                name: item.name,
                item_type: item.item_type,
                rank: item.rank,
            }));
            setRows(updatedRows);

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
        <div
            className="h-full"
        >
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                loading={isLoading}
                className='bg-gray-100'
                disableRowSelectionOnClick={true}
                disableColumnMenu={true}
                slots={{
                    noRowsOverlay: NoRowsOverlay
                }}
                autoHeight={true}
            />
        </div >
    </>);



}

