import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { CartItemsType, ProductType } from "@/types/types";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { BsCurrencyRupee } from "react-icons/bs";

type OrderSummaryDialogPropsTypes = {
  cart: CartItemsType[];
};

export const OrderSummaryDialog: React.FC<OrderSummaryDialogPropsTypes> = ({
  cart,
}) => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const subtotal = useMemo(() => {
    return cart.reduce(
      (acc, item) =>
        acc + (item.product as ProductType).discountPrice * item.quantity,
      0
    );
  }, [cart]);

  const deliveryFee = 40;
  const total = subtotal + deliveryFee;

  const handleConfirmOrder = async () => {
    if (!address?.trim()) {
      toast.error("Address is invalid");
      return;
    }
    if (!paymentMethod.trim()) {
      toast.error("Payment mode is invalid");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Order confirmed !");
      setLoading(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="text-black">
          Place Order
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Order Summary</DialogTitle>
          <DialogDescription>
            Review your order details before confirming.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">
          {cart.map((item) => {
            const product = item.product as ProductType;
            return (
              <div
                key={product._id}
                className="flex items-center justify-between text-sm"
              >
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold flex items-center gap-1">
                  <BsCurrencyRupee />
                  {(product.discountPrice * item.quantity).toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>

        <Separator className="my-4" />

        <div className="grid gap-3">
          <Label htmlFor="address">Delivery Address</Label>
          <Input
            id="address"
            placeholder="Enter your delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="grid gap-3 mt-4">
          <Label>Payment Method</Label>
          <div className="flex gap-2 flex-wrap">
            {["Cash on Delivery", "UPI", "Card"].map((method) => (
              <Button
                key={method}
                variant={paymentMethod === method ? "default" : "outline"}
                className={`${
                  paymentMethod === method
                    ? "bg-green-600 text-black"
                    : "hover:bg-green-50"
                }`}
                onClick={() => {
                  if (method === "Cash on Delivery") {
                    setPaymentMethod(method);
                  } else {
                    toast.error("Currently unavailable");
                  }
                }}
              >
                {method}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="flex items-center gap-1">
              <BsCurrencyRupee />
              {subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span className="flex items-center gap-1">
              <BsCurrencyRupee />
              {deliveryFee.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="flex items-center gap-1 text-green-600">
              <BsCurrencyRupee />
              {total.toFixed(2)}
            </span>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="bg-green-600 hover:bg-green-700 text-black"
            disabled={loading}
            onClick={handleConfirmOrder}
          >
            {loading ? "Processing..." : "Confirm Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
