'use client';

export default function PageBreak({ totalItems, itemsPerPage, currentPage, onPageChange, onItemsPerPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 10;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            let startPage = Math.max(1, currentPage - 4);
            let endPage = Math.min(totalPages, currentPage + 5);

            if (currentPage < 5) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage > totalPages - 5) {
                startPage = totalPages - 9;
                endPage = totalPages;
            }

            if (startPage > 1) {
                pageNumbers.push(1);
                if (startPage > 2) {
                    pageNumbers.push('...');
                }
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pageNumbers.push('...');
                }
                pageNumbers.push(totalPages);
            }
        }


        return pageNumbers.map((number, index) =>
            typeof number === 'number' ? (
                <button
                    key={index}
                    onClick={() => handlePageChange(number)}
                    className={`px-4 py-2 text-sm ${currentPage === number ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'} border border-gray-300 rounded-md hover:bg-gray-50`}
                >
                    {number}
                </button>
            ) : (
                <span key={index} className="px-4 py-2 text-sm text-gray-500">
                    {number}
                </span>
            )
        );
    };

    return (
        <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-700">
                {totalItems} Total Items
            </p>
            <div className="mr-auto flex items-center space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                    &lt;
                </button>
                {renderPageNumbers()}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-4 py-2 text-sm bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                >
                    &gt;
                </button>
            </div>
            <div>
                 <select
                    value={itemsPerPage}
                    onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                    className="pl-3 pr-10 py-2 text-base text-black border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md bg-white"
                >
                    <option value={10}>10/Page</option>
                    <option value={20}>20/Page</option>
                    <option value={50}>50/Page</option>
                </select>
            </div>
        </div>
    );
}