import { LuDot } from "react-icons/lu";

export function ProductDetailsColumns() {
  return (
    <div className="flex flex-col gap-6 mt-4 w-full">
      <div className="border rounded-md p-4 shadow-sm w-full">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-muted-foreground">{productDetails.description}</p>
      </div>

      <div className="border rounded-md p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Features</h3>
        <div className="flex flex-col gap-2 text-muted-foreground">
          {productDetails.Features.map((val, index) => (
            <div key={index} className="flex items-center py-0.5">
              <LuDot className="size-6" />
              <span>{val}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border rounded-md p-4 shadow-sm space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Shipping</h3>
          <p className="text-muted-foreground">{productDetails.shipping}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Care Instructions</h3>
          <p className="text-muted-foreground">{productDetails.care}</p>
        </div>
      </div>
    </div>
  );
}

const productDetails = {
  description:
    "Fresh, high-quality, and carefully sourced — this product is perfect for your daily grocery needs. Packed with natural goodness, it offers the right balance of taste, nutrition, and freshness. Ideal for home cooking, meal prep, and everyday use, ensuring you and your family enjoy healthy and delicious meals every time.",
  Features: [
    "Premium quality and freshness guaranteed",
    "Hygienically packed and quality tested",
    "Suitable for all types of cuisines",
    "Convenient for daily use",
    "Trusted by households for purity and flavor",
  ],
  shipping: "Ships within 2-3 business days. Free returns within 30 days.",
  care: "By using this app, you agree to our Terms & Conditions and Privacy Policy. Product prices, availability, and offers are subject to change without prior notice",
};
