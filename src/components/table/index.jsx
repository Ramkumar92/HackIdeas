import { useEffect, useState } from 'react';
import { AutoSizer, Column, Table as VirtualizedTable } from 'react-virtualized';
import 'react-virtualized/styles.css';
import { getCookie } from '../../utils/cookies';
import { tags } from '../../utils/tags';
import Tag from '../tag';
import './style.css';

const Table = ({ data = [], headers = [], handleUpvote }) => {

    const [sortBy, setSortBy] = useState({ key: '', sort: '' });
    const [rowData, setRowData] = useState(Array.from(data));
    const empId = getCookie('hack_auth_cookie');

    const toggleSort = (dataKey) => {
        if (sortBy.key === dataKey && sortBy.sort === 'asc') {
            setSortBy({ key: dataKey, sort: 'desc' });
        } else if (sortBy.key === dataKey && sortBy.sort === 'desc') {
            setSortBy({ key: '', sort: '' });
        } else {
            setSortBy({ key: dataKey, sort: 'asc' });
        }
    }

    const getSortClassName = (dataKey) => {
        if (sortBy.key === dataKey && sortBy.sort === 'asc') {
            return 'table__header--sort-asc';
        } else if (sortBy.key === dataKey && sortBy.sort === 'desc') {
            return 'table__header--sort-desc';
        }
        return '';
    }

    useEffect(() => {

        const handleSort = () => {
            if (!Boolean(sortBy.key)) return data;
            if (sortBy.sort === 'asc') return Array.from(data).sort((prev, next) => {
                if (sortBy.key === 'createdon') {
                    return prev[sortBy.key].seconds > next[sortBy.key].seconds ? 1 : -1
                }
                return prev[sortBy.key] > next[sortBy.key] ? 1 : -1;
            });
            return Array.from(data).sort((prev, next) => prev[sortBy.key] > next[sortBy.key] ? -1 : 1);
        }

        setRowData(handleSort());

    }, [sortBy, data]);

    const getHeader = ({ dataKey, label }) => {
        switch (dataKey) {
            case 'upvotes': return (
                <button
                    className={"table__header-button " + getSortClassName(dataKey)}
                    type="button"
                    onClick={() => toggleSort(dataKey)}
                >
                    {label}
                </button>
            );
            case 'createdon': return (
                <button
                    className={"table__header-button " + getSortClassName(dataKey)}
                    type="button"
                    onClick={() => toggleSort(dataKey)}
                >
                    {label}
                </button>
            );
            default: return <>
                {label}
            </>;
        }
    }

    const renderCell = (data) => {
        if (data.dataKey === 'createdon') return new Date(data.cellData.seconds * 1000).toLocaleString();
        if (data.dataKey === 'tags') {
            return (
                data.cellData.map(tag => {
                    const matchingTag = tags.find(({ key }) => key === tag);
                    return (
                        <Tag
                            key={matchingTag.key}
                            text={matchingTag.text}
                            color={matchingTag.color}
                            selected
                        />);
                })
            );
        }
        if (data.dataKey === 'upvotes') {
            return (
                <span onClick={() => handleUpvote(data.rowData)}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className={data.rowData.upvotedBy.includes(empId) ? 'table__upvote-icon--active' : 'table__upvote-icon'}
                        height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                        <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
                        <path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z" />
                    </svg>
                    <label className='table__upvote'>{data.cellData}</label>

                </span>
            );
        }
        return data.cellData;
    }

    return (
        <AutoSizer>
            {({ height }) => (
                <VirtualizedTable
                    width={1280}
                    height={height}
                    headerHeight={50}
                    rowHeight={40}
                    rowCount={rowData.length}
                    rowGetter={({ index }) => rowData[index]}
                >
                    {headers.map(({ label, dataKey, width }) =>
                        <Column
                            headerRenderer={getHeader}
                            key={dataKey}
                            label={label}
                            dataKey={dataKey}
                            cellRenderer={renderCell}
                            width={width}
                        />
                    )}
                </VirtualizedTable>
            )}
        </AutoSizer>
    );

}

export default Table;