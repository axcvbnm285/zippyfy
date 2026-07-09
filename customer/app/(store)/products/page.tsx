import ProductHeader from "@/components/product/ProductHeader";
import ProductFilters from "@/components/product/ProductFilters";
import ProductTable from "@/components/product/ProductTable";
import ProductPagination from "@/components/product/ProductPagination";

export default function ProductsPage() {
  return (
<div className="space-y-8">

    <ProductHeader />

    <ProductFilters />

    <ProductTable />

    <ProductPagination />

</div>
  );
}