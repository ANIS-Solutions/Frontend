import { Heart } from "lucide-react";
import Link from "next/link";
import styles from "../../styles/HeroSection.module.css";

function HeroSection() {
  return (
    <section className="min-h-[85vh] flex items-center justify-center">
      <div className="max-w-3xl text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[#2F3E4E] text-sm mb-20"
          style={{ backgroundColor: "#4aa9e487" }}
        >
          <Heart
            size={22}
            stroke="#E63946"
            fill="#E63946"
            // className={styles.heartbeat}
          />{" "}
          Trusted by thousands of families
        </div>

        <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[#2F3E4E]">
          Helping parents raise{" "}
          <span className="text-[#2692CF]">healthy digital habits</span> for
          their children
        </h1>

        <p className="mt-6 text-lg text-[#6B7280]">
          ANIS is your gentle partner in guiding your child toward a balanced
          relationship with technology supporting growth, safety, and happiness.
        </p>

        <div
          className="
  mt-10
  flex
  flex-col
  sm:flex-row
  gap-4
  justify-center
  items-center
"
        >
          <Link
            href="/register"
            className="
      inline-flex
      justify-center
      bg-[#4aa9e4b3]
      text-[#181818]
      rounded-lg
      px-6 py-4
      font-medium
      transition
      hover:bg-[#4aa9e4]
    "
          >
            Get Started Free
          </Link>

          <Link
            href="/how-works"
            className="
      inline-flex
      justify-center
      text-[#0B7731]
      border-2
      border-green-600
      rounded-lg
      px-6 py-4
      font-medium
      transition
      hover:bg-green-50
    "
          >
            See How It Works
          </Link>
        </div>
        <p className="mt-6 text-sm text-[#6B7280]">
          No credit card required • Free plan available
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
