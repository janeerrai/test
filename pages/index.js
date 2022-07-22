import Head from 'next/head'
import Image from 'next/image'
import { getApi } from '../repository/base';
import { useTableSort } from '../utils/table-sort';
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
const SORT_DIRECTION = {
  asc: 'asc',
  desc: 'desc'
}

export default function Home() {

  const [dataList, setDataList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  const [sortDirectionObject, setSortDirectionObject] = useState();

  // sort data with sort function
  const { sortedDataList, sort } = useTableSort(dataList);
  // Get the data from api.
  useEffect(() => {
    getApi().then(res => {
      console.log(res);
      setDataList(res?.results);
    });

  }, [refresh]);



  // To render ui only in client side
  useEffect(() => {
    setIsBrowser(true);
  }, []);


  // Refresh data
  const refreshData = () => {
    setRefresh(!refresh);
  }


  // To get the current sort direction of the column
  // If any column is not sorted yet then sort direction 'asc'
  // If column is sorted previously then toggles the direction
  // If a new colun is to be sort which previously not sorted then
  // sort direction is 'asc'.
  const getSortDirection = (colName) => {
    if (!sortDirectionObject?.direction) {
      setSortDirectionObject({
        column: colName,
        direction: SORT_DIRECTION.asc
      });
      return SORT_DIRECTION.asc;
    } else if ((sortDirectionObject?.column == colName)) {
      if (sortDirectionObject?.direction == SORT_DIRECTION.asc) {
        setSortDirectionObject({
          column: colName,
          direction: SORT_DIRECTION.desc
        });
        return SORT_DIRECTION.desc;
      } else {
        setSortDirectionObject({
          column: colName,
          direction: SORT_DIRECTION.asc
        });
        return SORT_DIRECTION.asc;
      }
    } else {
      setSortDirectionObject({
        column: colName,
        direction: SORT_DIRECTION.asc
      });

      return SORT_DIRECTION.asc;
    }
  }


  return isBrowser ? (
    <div className={styles.container}>

      <table>
        <thead>
          <tr>
            <th>SN</th>
            <th><button onClick={() => sort('name.first', getSortDirection('name.first'))}>Name
              <span className={(sortDirectionObject?.column == 'name.first') ? 'active_sorting' : 'not_active_sorting'}>{((sortDirectionObject?.column == 'name.first') && sortDirectionObject?.direction == SORT_DIRECTION.asc) ? ' A' : ' D'}</span></button></th>
            <th><button onClick={() => sort('dob.date', getSortDirection('dob.date'))}>DOB<span className={(sortDirectionObject?.column == 'dob.date') ? 'active_sorting' : 'not_active_sorting'}>{((sortDirectionObject?.column == 'dob.date') && sortDirectionObject?.direction == SORT_DIRECTION.asc) ? ' A' : ' D'}</span></button></th>
          </tr>
        </thead>
        <tbody>
          {
            sortedDataList?.map((item, index) => {
              return (<tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <span><img src={item?.picture?.thumbnail} /></span>{item.name?.title} {" "}{item.name?.first} {" "} {item.name?.last}</td>
                <td>{item.dob?.date}</td>
              </tr>)
            })
          }


        </tbody>
      </table>

      <button onClick={() => refreshData()}>Refresh</button>
    </div>
  ) : null
}
