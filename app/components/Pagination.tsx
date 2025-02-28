import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const PaginationComponent = ({ currentPage, setCurrentPage, totalPages }: { currentPage:any, setCurrentPage:any, totalPages:any }) => (
  <Pagination className="my-3">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious 
          className="cursor-pointer" 
          href="#" 
          onClick={() => setCurrentPage((prev:any) => Math.max(prev - 1, 1))}
        />
      </PaginationItem>

      {[...Array(Math.min(5, totalPages))].map((_, index) => {
        const pageNum = index + 1;
        return (
          <PaginationItem key={pageNum}>
            <PaginationLink 
              href="#" 
              isActive={pageNum === currentPage}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        );
      })}

      <PaginationItem>
        <PaginationNext 
          className="cursor-pointer" 
          href="#" 
          onClick={() => setCurrentPage((prev:any)  => Math.min(prev + 1, totalPages))}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);
export default PaginationComponent;
