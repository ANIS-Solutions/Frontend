import Link from "next/link";
import { Facebook, Heart, Instagram, Linkedin, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className=" pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E5E7EB]">
                <Heart className="text-[#2692CF]" size={18} />
              </div>

              <span className="text-xl font-semibold text-slate-800">ANIS</span>
            </div>

            <p className="text-slate-600 leading-relaxed text-sm">
              Helping parents raise healthy digital habits for their children.
            </p>

            <div className="flex gap-4 pt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <div
                  key={index}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#E5E7EB] text-slate-600 hover:text-[#2692CF] transition cursor-pointer"
                >
                  <Icon size={16} />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-base font-semibold text-slate-800">Product</h3>
            <div className="flex flex-col gap-4 text-sm text-slate-600">
              <Link href="">Features</Link>
              <Link href="">How It Works</Link>
              <Link href="">Reports</Link>
              <Link href="">Pricing</Link>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-base font-semibold text-slate-800">
              Resources
            </h3>
            <div className="flex flex-col gap-4 text-sm text-slate-600">
              <Link href="">For Parents</Link>
              <Link href="">Safety & Privacy</Link>
              <Link href="">FAQ</Link>
              <Link href="">About Us</Link>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-base font-semibold text-slate-800">Contact</h3>
            <div className="flex flex-col gap-4 text-sm text-slate-600">
              <Link href="">support@anis.app</Link>
              <Link href="">Help Center</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-300 my-12"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© 2026 ANIS. All rights reserved.</p>

          <div className="flex gap-8 mt-4 md:mt-0">
            <Link href="" className="hover:text-slate-800 transition">
              Privacy Policy
            </Link>
            <Link href="" className="hover:text-slate-800 transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
