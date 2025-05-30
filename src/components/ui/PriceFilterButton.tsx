import { DownOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Radio, Space } from "antd";
import { useState } from "react";

interface PriceFilterProps {
  onFilterChange: (filters: {
    sortOrder?: "asc" | "desc";
    priceRange?: string;
  }) => void;
}

const PriceFilterDropdown = ({ onFilterChange }: PriceFilterProps) => {
  const [priceFilter, setPriceFilter] = useState<{
    sortOrder?: "asc" | "desc";
    priceRange?: string;
  }>({});
  const [visible, setVisible] = useState(false);

  const handleSortChange = (e: any) => {
    const newFilter = {
      sortOrder: e.target.value,
      priceRange: undefined, // Clear range when sorting
    };
    setPriceFilter(newFilter);
    onFilterChange(newFilter);
  };

  const handleRangeChange = (range: string) => {
    const newFilter = {
      priceRange: range,
      sortOrder: undefined, // Clear sort when selecting range
    };
    setPriceFilter(newFilter);
    onFilterChange(newFilter);
  };

  const menu = (
    <Menu style={{ padding: "16px", width: "200px" }}>
      {/* Sort by Price */}
      <Menu.ItemGroup title="Sort by Price">
        <Menu.Item key="sort">
          <Radio.Group
            onChange={handleSortChange}
            value={priceFilter.sortOrder}
          >
            <Space direction="vertical">
              <Radio value="asc">Low to High</Radio>
              <Radio value="desc">High to Low</Radio>
            </Space>
          </Radio.Group>
        </Menu.Item>
      </Menu.ItemGroup>

      {/* Price Ranges */}
      {/* <Menu.ItemGroup title="Price Ranges">
        <Menu.Item key="ranges">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Button
              type={priceFilter.priceRange === "0-20" ? "primary" : "text"}
              onClick={() => handleRangeChange("0-20")}
              block
            >
              Under $20
            </Button>
            <Button
              type={priceFilter.priceRange === "20-50" ? "primary" : "text"}
              onClick={() => handleRangeChange("20-50")}
              block
            >
              $20 - $50
            </Button>
            <Button
              type={priceFilter.priceRange === "50+" ? "primary" : "text"}
              onClick={() => handleRangeChange("50+")}
              block
            >
              Over $50
            </Button>
          </Space>
        </Menu.Item>
      </Menu.ItemGroup> */}

      {/* Action Buttons */}
      <Menu.Divider />
      <Menu.Item key="actions">
        <Button
          block
          onClick={() => {
            setPriceFilter({});
            onFilterChange({});
          }}
        >
          Clear Filters
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      visible={visible}
      onVisibleChange={setVisible}
    >
      <Button>
        <Space>
          <FilterOutlined />
          Price
          <DownOutlined />
          {(priceFilter.sortOrder || priceFilter.priceRange) && (
            <span style={{ marginLeft: 5 }}>•</span>
          )}
        </Space>
      </Button>
    </Dropdown>
  );
};

export default PriceFilterDropdown;
