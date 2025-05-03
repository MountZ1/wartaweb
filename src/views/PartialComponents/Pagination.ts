interface PaginationLayout {
  current: number;  // Fixed typo in 'current'
  total: number;
  baseUrl: string;
}

export const Pagination = (props: PaginationLayout): string => {
  return `
  <div class="flex justify-between items-center mt-6">
    <div class="flex-grow">
      <button 
        class="w-full px-4 py-2 ${props.current === 1 ? 'invisible' : ''} text-sm text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
        hx-get="${props.baseUrl}?page=${props.current - 1}"
        hx-target="#main-content"
        hx-swap="innerHTML"
      >
        Previous
      </button>
    </div>
    <div class="text-sm text-gray-600 text-center mx-4">Page ${props.current} of ${props.total}</div>
    <div class="flex-grow">
      <button 
        class="w-full px-4 py-2 ${props.current === props.total ? 'invisible' : ''} text-sm text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
        hx-get="${props.baseUrl}?page=${props.current + 1}"
        hx-target="#main-content"
        hx-swap="innerHTML"
      >
        Next
      </button>
    </div>
  </div>`;
};

