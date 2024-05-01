import { useState } from 'react'
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'


const Table = ({ columns, data, filtered, title, filterData }) => {
    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')

    const getDay = () => {
        let currentDate = new Date();
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let dayIndex = currentDate.getDay();
        let monthIndex = currentDate.getMonth();
        let day = currentDate.getDate();
        let year = currentDate.getFullYear();
        
        // Format the date as "Day MMM DD YYYY"
        let formattedDate = months[monthIndex] + ' ' + day + ',' + year;
        return formattedDate.toString();
    };
    

    const getmonth = () => {
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const d = new Date();
        const name = month[d.getMonth()];
        return name
    }

    const all = ""
    const day = getDay()
    const month = getmonth()

    const table = useReactTable({
        data: (filtered.length > 0) ? filtered : data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pagination: {
                // pageIndex: 0, //custom initial page index
                pageSize: 15, //custom default page size
            },
        },
        
        state: {
            sorting: sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    })

    return (
        <div>
            <div className='w3-container'>
                <table id="sensors">
                    <caption style={{ fontSize: "150%", backgroundColor: "#25523b", color: "#f2f2f2", padding: "15px 0px 15px 15px", textAlign: "left" }}>{title}
                        <caption style={{ position: "absolute", display: "flex", gap: "10px", alignItems: "center", marginLeft: "18rem", marginTop: "-2.5rem" }}>
                            <caption style={{ color: "#f2f2f2", textAlign: "center", position: "relative" }}>Filter: </caption>
                            <caption><button className='filterData' onClick={() => filterData(data, getDay())} style={{}}>Today</button></caption>
                            <caption ><button className='filterData' onClick={() => filterData(data, month)} style={{}}>This Month</button></caption>
                            <caption><button className='filterData' onClick={() => filterData(data, all)} style={{}}>All Data</button></caption>
                            <caption><input type='text' className='filterData' value={filtering} onChange={e => setFiltering(e.target.value)} placeholder='search here' /></caption>
                        </caption>
                    </caption>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                <th>Sl. No</th>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {
                                                    { asc: '🔼', desc: '🔽' }[
                                                    header.column.getIsSorted() ?? null
                                                    ]
                                                }
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row, index) => (
                            <tr key={row.id}>
                                <td>
                                    {index + 1}
                                </td>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='pagination'>
                    <button className='filterData' onClick={() => table.setPageIndex(0)}>First page</button>
                    <button
                        className='filterData'
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => table.previousPage()}
                    >
                        Previous page
                    </button>
                    <button
                        className='filterData'
                        disabled={!table.getCanNextPage()}
                        onClick={() => table.nextPage()}
                    >
                        Next page
                    </button>
                    <button className='filterData' onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                        Last page
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Table

