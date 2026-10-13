import ProductForm from "../_ProductForm";
import { createProduct } from "../actions";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-serif mb-6">Yeni Ürün</h1>
      <ProductForm action={createProduct} />
    </div>
  );
}
