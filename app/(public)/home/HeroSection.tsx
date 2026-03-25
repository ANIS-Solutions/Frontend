import { Heart } from "lucide-react";
import Link from "next/link";
import styles from "../../styles/HeroSection.module.css";

function HeroSection() {
  return (
    <section className="min-h-[85vh] flex items-center justify-center px-4">
      <div className="max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-8 bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7]">
          <Heart
            size={22}
            stroke="#E63946"
            fill="#E63946"
            className={styles.heartbeat}
          />
          Trusted by thousands of families
        </div>

        <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[#2F3E4E]">
          Helping parents raise{" "}
          <span className="text-[#1E73BE]">healthy digital habits</span> for
          their children
        </h1>

        <p className="mt-6 text-lg text-[#6B7280] max-w-xl mx-auto">
          ANIS is your gentle partner in guiding your child toward a balanced
          relationship with technology supporting growth, safety, and happiness.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/register"
            className="inline-flex justify-center bg-[#E07A38] hover:bg-[#c96a2d] text-white rounded-lg px-6 py-3 font-medium transition-all duration-300"
          >
            Get Started Free
          </Link>

          <Link
            href="/how-works"
            className="inline-flex justify-center text-[#2F3E4E] border border-[#D1D5DB] bg-white rounded-lg px-6 py-3 font-medium transition-all duration-300 hover:border-[#9CA3AF] hover:bg-gray-50"
          >
            See How It Works
          </Link>
        </div>
        <p className="mt-4 text-sm text-[#9CA3AF]">
          No credit card required • Free plan available
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
