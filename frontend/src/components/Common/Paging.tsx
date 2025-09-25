import { PageItem } from './PageItem'
import { useMemo } from 'react'

export type PagingProps = {
  setPageNumber: (page: number) => void
  totalPages: number
  currentPage: number
}

export const Paging: React.FC<PagingProps> = ({
  setPageNumber,
  totalPages,
  currentPage,
}) => {
  const handlePageChange = (selected: number) => {
    setPageNumber(selected)
    window.scroll(0, 0)
  }

  const items = useMemo(() => {
    let start = Math.max(1, currentPage - 2)
    let end = Math.min(totalPages, currentPage + 2)
    if (end - start < 4) {
      start = Math.max(1, end - 4)
      end = Math.min(totalPages, start + 4)
    }
    return [...Array(end - start + 1)].map((_, i) => i + start)
  }, [currentPage, totalPages])

  return (
    <ul className="pagination justify-content-center">
      <PageItem
        pageClassName={currentPage === 1 ? 'disabled' : ''}
        onClick={() => handlePageChange(1)}
      >
        &laquo;
      </PageItem>
      <PageItem
        pageClassName={currentPage === 1 ? 'disabled' : ''}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        &lt;
      </PageItem>
      {items.map(i => (
        <PageItem
          pageClassName={currentPage === i ? 'active' : ''}
          key={i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PageItem>
      ))}
      <PageItem
        pageClassName={currentPage === totalPages ? 'disabled' : ''}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        &gt;
      </PageItem>
      <PageItem
        pageClassName={currentPage === totalPages ? 'disabled' : ''}
        onClick={() => handlePageChange(totalPages)}
      >
        &raquo;
      </PageItem>
    </ul>
  )
}
