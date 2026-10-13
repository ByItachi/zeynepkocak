import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSetting } from "@/lib/settings";
import AddToCartButton from "./_AddToCartButton";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const enabled = (await getSetting("ecommerce_mode_enabled")) === "true";
  if (!enabled) notFound();

  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product || !product.isPublished) notFound();

  return (
    <div className="mx-auto max-w-[800px] px-5 py-16 sm:px-8">
      {product.coverImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={product.coverImageUrl} alt={product.title} className="w-full rounded-xl object-cover max-h-[380px]" />
      )}
      <p className="mt-6 text-xs uppercase tracking-wide text-[#8b9a7a]">{product.type === "COURSE" ? "Online Eğitim" : "Dijital Ürün"}</p>
      <h1 className="mt-1 font-serif text-3xl">{product.title}</h1>
      <p className="mt-4 whitespace-pre-line text-[#444] leading-relaxed">{product.description}</p>
      <p className="mt-6 text-2xl font-semibold text-[#5e6b52]">{(product.priceCents / 100).toLocaleString("tr-TR")} {product.currency}</p>
      <div className="mt-6">
        <AddToCartButton productId={product.id} title={product.title} priceCents={product.priceCents} />
      </div>
    </div>
  );
}
