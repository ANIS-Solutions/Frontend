import Link from "next/link";

function CTASection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto bg-[#F8FAFC] rounded-3xl py-12 px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#2F3E4E] mb-4">
          Ready to create healthier digital habits?
        </h2>
        
        <p className="text-[#6B7280] mb-8 max-w-xl mx-auto">
          Join thousands of families who are building a better relationship with technology.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="inline-flex justify-center bg-[#E07A38] hover:bg-[#c96a2d] text-white rounded-lg px-6 py-3 font-medium transition-all duration-300"
          >
            Create Parent Account
          </Link>

          <Link
            href="/pricing"
            className="inline-flex justify-center text-[#2F3E4E] border border-[#D1D5DB] bg-white rounded-lg px-6 py-3 font-medium transition-all duration-300 hover:border-[#9CA3AF]"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTASection;