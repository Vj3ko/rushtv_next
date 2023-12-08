'use client'

import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

interface PaginationProps {
  changePage: (selected: number) => void
  totalPages: number
}

const PaginationCom = ({ changePage, totalPages }: PaginationProps) => {
  return (
    <section className={styles.pagination__section}>
      <ReactPaginate
        previousLabel='<'
        nextLabel='>'
        breakLabel='...'
        onPageChange={e => changePage(e.selected + 1)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        pageCount={totalPages > 500 ? 500 : totalPages}
        renderOnZeroPageCount={null}
        containerClassName={styles.pagination}
        pageClassName={styles.page__link}
        breakClassName={styles.page__link}
        previousLinkClassName={styles.page__link}
        nextLinkClassName={styles.page__link}
        activeClassName={styles.active}
      />
    </section>
  )
}

export const Pagination = React.memo(PaginationCom)
