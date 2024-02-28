import React from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const API = 'https://jsonplaceholder.typicode.com/posts';
const MyContribution = () => {
    const [apiData, setApiData] = useState([]);
    const [filterApiData, setFilterApiData] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const nav = useNavigate();

    const handleDataFetch = () => {
        setIsProcessing(true)
        axios
            .get(API)
            .then((res) => {
                console.log('Data Process Successfuly');
                console.log(res.data);
                setApiData(res.data)
                setFilterApiData(res.data);
            })
            .catch((err) => {
                console.log('Data Process Error');
                console.log(err)
                setErrorText(err.message);
                setIsError(true)
            })
            .finally(() => setIsProcessing(false))
    }
    const columns = [
        {
            name: 'Quater',
            selector: 'id',
            sortable: true
        },
        {
            name: 'Finap Percentage',
            selector: 'id',
            sortable: true
        },
        {
            name:"Status",
            selector: 'id',
            sortable: true
        },
    ];

    const customStyle = {
        headRow: {
            style: {
                backgroundColor: '#b0c4de',
                color: "black"
            }
        },
        headCell: {
            style: {
                fontSize: '16px',
                fontWeight: '600',
                TextTransform: 'uppercase'
            }
        },
        cells: {
            style: {
                fontSize: '15px',

            }
        }
    }

    useEffect(() => {
        setIsProcessing(true);
        handleDataFetch()
    }, [])

    const handleFilter = (e) => {
        const newData = filterApiData.filter(row => row.title.toLowerCase().includes(e.target.value.toLowerCase()));
        setApiData(newData)
    }
    return (
        <div className='flex flex-col px-12 py-4'>
            <div className='flex justify-end mb-2'>
                <input className='outline-none border-5 border-gray-400 rounded px-4 py-2' placeholder='Search here' type='text' onChange={handleFilter} />
            </div>
            <DataTable
                columns={columns}
                data={apiData}
                pagination
                 paginationPerPage={10}
                 paginationRowsPerPageOptions={[5,10]}
                highlightOnHover
                customStyles={customStyle}
                onRowDoubleClicked={()=>nav('/taskDetails')}
                
            />
            <div className='flex justify-end mt-4'>
                <button className='relative inline-flex px-8 py-3 font-semibold text-xl traking-widset bg-slate-400  hover:bg-slate-600 hover:text-white rounded-full mr-10 bg-gray-300' onClick={()=>nav('/addTask')}>Add Contribution</button>
            </div>
        </div>
    )
}
export default MyContribution;