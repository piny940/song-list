import ReactPaginate from 'react-paginate'

export type PagingProps = {
  setPageNumber: (page: number) => void
  totalPages: number
}

export const Paging: React.FC<PagingProps> = ({
  setPageNumber,
  totalPages,
}) => {
  const handlePageChange = ({ selected }: { selected: number }) => {
    setPageNumber(selected + 1)
  }

  return (
    <ReactPaginate
      breakLabel="..."
      previousLabel="<前"
      nextLabel="次>"
      onPageChange={handlePageChange}
      pageCount={totalPages}
      containerClassName="pagination justify-content-center"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      activeClassName="active"
    />
  )
}
