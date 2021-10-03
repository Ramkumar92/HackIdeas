import { useEffect, useState } from 'react';
import { AutoSizer, Column, Table as VirtualizedTable } from 'react-virtualized';
import 'react-virtualized/styles.css';
import './style.css';

const Table = ({ data = [], headers = [] }) => {

    const [sortBy, setSortBy] = useState({ key: '', sort: '' });
    const [rowData, setRowData] = useState(Array.from(data));

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
            if (sortBy.sort === 'asc') return Array.from(data).sort((prev, next) => prev[sortBy.key] > next[sortBy.key] ? 1 : -1);
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

    return (
        <AutoSizer>
            {({ height }) => (
                <VirtualizedTable
                    width={920}
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
                            width={width}
                        />
                    )}
                </VirtualizedTable>
            )}
        </AutoSizer>
    );

}

export default Table;