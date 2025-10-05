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
import { useState } from "react";

export function OrderSummaryDialog() {
  const [quantity, _] = useState(1);

  // console.log(setQuantity);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Place Order</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Order Summary</DialogTitle>
          <DialogDescription>
            Review your order details before confirming.
          </DialogDescription>
        </DialogHeader>

        {/* 🛒 Order Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Organic Avocados</p>
              <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
            </div>
            <p className="font-semibold">$4.99</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Italian Olive Oil</p>
              <p className="text-sm text-muted-foreground">Qty: 1</p>
            </div>
            <p className="font-semibold">$14.99</p>
          </div>
        </div>

        <Separator className="my-4" />

        {/* 📦 Delivery Address */}
        <div className="grid gap-3">
          <Label htmlFor="address">Delivery Address</Label>
          <Input
            id="address"
            placeholder="Enter your delivery address"
            defaultValue="123 Green Street, Chennai"
          />
        </div>

        {/* 💳 Payment Method */}
        <div className="grid gap-3 mt-4">
          <Label>Payment Method</Label>
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="">
              Cash on Delivery
            </Button>
            <Button variant="outline" className="">
              UPI
            </Button>
            <Button variant="outline" className="">
              Card
            </Button>
          </div>
        </div>

        <Separator className="my-4" />

        {/* 💰 Price Details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$19.98</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>$2.00</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>$21.98</span>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Confirm Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
