import React, { useState, useEffect } from 'react';
export const useTableSort = (dataList) => {

    const [sortedDataList, setSortedDataList] = useState(dataList);

    useEffect(() => {
        setSortedDataList(dataList);
    }, [dataList])

    const sort = (property, sortOrder) => {

        let prop = property.split('.');

        if (property) {
            const sorted = [...sortedDataList].sort((a, b) => {
                if (a[property] === null) return 1;
                if (b[property] === null) return -1;
                if (a[property] === null && b[property] === null) return 0;
                if (prop.length < 2) {
                    return (
                        a[property].toString().localeCompare(b[property].toString(), "en", {
                            numeric: true,
                        }) * (sortOrder === "asc" ? 1 : -1)
                    );
                } else {
                    let i = 0;
                    while (i < prop.length) { a = a[prop[i]]; b = b[prop[i]]; i++; }
                    return (
                        a.toString().localeCompare(b.toString(), "en", {
                            numeric: true,
                        }) * (sortOrder === "asc" ? 1 : -1)
                    );
                }

            });
            setSortedDataList(sorted);
        }

    }

    return {
        sortedDataList,
        sort
    }
}