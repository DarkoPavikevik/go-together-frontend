import type { PaginationProps } from "antd";
import type { TFunction } from "i18next";

interface PaginationConfigParams {
  currentPage: number;
  pageSize: number;
  total: number;
  handlePageChange: (page: number, pageSize?: number) => void;
  t: TFunction;
}

export const getPaginationConfig = ({
  currentPage,
  pageSize,
  total,
  handlePageChange,
  t,
}: PaginationConfigParams): PaginationProps => ({
  current: currentPage,
  pageSize: pageSize,
  total: total,
  onChange: handlePageChange,
  showSizeChanger: false,
  showTotal: () => "",
  itemRender: (_current, type, originalElement: any) => {
    if (type === "prev") {
      return `${t("table_previous")}`;
    }
    if (type === "next") {
      return t("table_next");
    }
    return originalElement;
  },
  className: "custom-pagination",
});
