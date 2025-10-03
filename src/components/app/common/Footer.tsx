import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 mt-4 w-full">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">EMart</h2>
          <p className="text-sm leading-5">
            We deliver fresh groceries and snacks straight to your door. Trusted
            by thousands, we aim to make your shopping experience simple and
            affordable.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-primary">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Best Sellers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Offers & Deals
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Need Help?</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-primary">
                Delivery Information
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Return & Refund Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Payment Methods
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Track your Order
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <ul className="flex flex-wrap space-x-4">
            <li>
              <a href="#" className="hover:text-primary">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                YouTube
              </a>
            </li>
          </ul>

          <div className="mt-6">
            <p className="text-sm mb-2">Subscribe to our newsletter</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="flex-1" />
              <Button className="text-black">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm">
        Copyright 2025 © <span className="font-semibold">EMart</span>. All
        Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
