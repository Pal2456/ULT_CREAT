'use client';

import { Pagination, Space, Typography } from 'antd';

const { Text } = Typography;

export default function PageBreak({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}) {
  return (
    <>
      <Space size="middle" align="center" style={{ flexWrap: 'wrap', width: '100%' }} className="custom-pagination">
        <Text style={{ color: '#2B2C30' }}>{totalItems} Total items</Text>

        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={itemsPerPage}
          onChange={onPageChange}
          showSizeChanger
          onShowSizeChange={(_page, size) => onItemsPerPageChange(size)}
          pageSizeOptions={['10', '20', '50']}
        />
      </Space>

      <style jsx global>{`
        /* Active page */
        .custom-pagination .ant-pagination-item-active {
          background-color: #76108F;
          border-color: #76108F;
        }

        .custom-pagination .ant-pagination-item-active a {
          color: white !important;
        }

        /* Hover on page item */
        .custom-pagination .ant-pagination-item:hover {
          border-color: #76108F;
        }

        /* Default page item color */
        .custom-pagination .ant-pagination-item a {
          color: #2B2C30;
        }

        /* Prompt font for dropdown */
        .custom-pagination .ant-pagination-options {
          font-family: 'Prompt', sans-serif;
        }

        /* Optional: change dropdown arrow color */
        .custom-pagination .ant-select-selector {
          color: #2B2C30;
        }

        .custom-pagination .ant-select-arrow {
          transform: rotate(-90deg);
          transform-origin: center;
          transition: transform 0.3s ease;
          color: #2B2C30;
        }

        .custom-pagination .ant-select-open .ant-select-arrow {
          transform: rotate(0deg); /* ▼ */
        }

        .custom-pagination .ant-select-dropdown .ant-select-item-option-active:not(.ant-select-item-option-disabled),
        .custom-pagination .ant-select-dropdown .ant-select-item-option:hover {
          background-color: #7B41B3 !important;
          color: white !important;
        }

        .custom-pagination .ant-select {
          font-family: 'Prompt', sans-serif !important;
        }
          
      `}</style>
    </>
  );
}