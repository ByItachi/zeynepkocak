import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "../_ProductForm";
import { updateProduct } from "../actions";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id }, include: { assets: true } });
  if (!product) notFound();

  return (
    <div>
      <h1 className="text-2xl font-serif mb-6">Ürünü Düzenle</h1>
      <ProductForm
        initial={{
          title: product.title,
          slug: product.slug,
          description: product.description,
          type: product.type,
          price: product.priceCents / 100,
          coverImageUrl: product.coverImageUrl ?? "",
          isPublished: product.isPublished,
          meetingUrl: product.meetingUrl ?? "",
          meetingProvider: product.meetingProvider ?? "zoom",
          assets: product.assets.map((a) => ({ label: a.label, fileUrl: a.fileUrl, fileType: a.fileType })),
        }}
        action={updateProduct.bind(null, id)}
      />
    </div>
  );
}
