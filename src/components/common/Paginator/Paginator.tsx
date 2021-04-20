import React, {useState} from 'react';
import css from "./Paginator.module.css";

type PropsType = {
  totalItemsCount: number,
  pageSize: number,
  currentPage: number,
  onPageChanged: (page: number) => void,
  paginatorSize: number
}

function Paginator({totalItemsCount, pageSize, currentPage, onPageChanged, paginatorSize}: PropsType) {
    const [paginatorPortionNumber, setPaginatorPortionNumber] = useState(1);
    const pagesCount = Math.ceil(totalItemsCount / pageSize);

    const finishPaginatorPage = paginatorPortionNumber * paginatorSize < pagesCount
        ? paginatorPortionNumber * paginatorSize
        : pagesCount;
    const startPaginatorPage = (Math.ceil(finishPaginatorPage / paginatorSize) - 1) * paginatorSize + 1;

    let pages = [];

    for (let i = startPaginatorPage; i <= finishPaginatorPage; i++) {
        pages.push(i);
    }

    return <div className={css.paginator}>
        <button disabled={startPaginatorPage === 1}
            onClick={() => setPaginatorPortionNumber(paginatorPortionNumber - 1)}>prev</button>
        {pages.map(p => {
            return <span className={currentPage === p ? css.selectedPage : ''}
                         onClick={() => {
                             onPageChanged(p)
                         }}>{p}-</span>;
        })}
        <button disabled={finishPaginatorPage === pagesCount}
            onClick={() => setPaginatorPortionNumber(paginatorPortionNumber + 1)}>next</button>
    </div>
}

export default Paginator;