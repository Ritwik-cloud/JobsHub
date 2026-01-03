import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: PaginationControlsProps) {
  // REMOVED: if (totalPages <= 1) return null;

  // Handle case where totalPages might be 0 (e.g. no results) to display "1 of 1"
  const safeTotalPages = Math.max(1, totalPages);

  return (
    <Pagination className="mt-8 justify-end">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            // Disable if on page 1
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            aria-disabled={currentPage <= 1}
          />
        </PaginationItem>
        
        {/* Current Page Number */}
        <PaginationItem>
          <PaginationLink isActive className="cursor-default hover:bg-transparent hover:text-primary">
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        
        {/* Total Pages Count */}
        <PaginationItem>
           <span className="px-2 text-sm text-muted-foreground whitespace-nowrap">
             of {safeTotalPages}
           </span>
        </PaginationItem>

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext 
            onClick={() => onPageChange(Math.min(safeTotalPages, currentPage + 1))}
            // Disable if current page is last page OR if there is only 1 page
            className={currentPage >= safeTotalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            aria-disabled={currentPage >= safeTotalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
