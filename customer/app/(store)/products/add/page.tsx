import ProductForm from "@/components/product/ProductForm";

export default function AddProductPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Add Product
        </h1>

        <p className="mt-2 text-slate-500">
          Create a new product for your store.
        </p>
      </div>

      <ProductForm />
    </div>
  );
}