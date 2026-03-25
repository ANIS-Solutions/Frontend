import Link from "next/link";

function StillHaveQuestions() {
  return (
    <section className="py-12 md:py-16 px-4 bg-[#F9FAFB]">
      <div className="max-w-xl mx-auto bg-white rounded-2xl py-10 px-6 text-center shadow-sm border border-[#E5E7EB]">
        <h2 className="text-xl md:text-2xl font-semibold text-[#2F3E4E] mb-3">
          Still have questions?
        </h2>

        <p className="text-[#6B7280] mb-6">
          Our support team is here to help. We typically respond within 24 hours.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="mailto:support@anis.app"
            className="inline-flex justify-center text-[#2F3E4E] border border-[#D1D5DB] bg-white rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:border-[#9CA3AF]"
          >
            Email Support
          </Link>

          <Link
            href="/help"
            className="inline-flex justify-center bg-[#E07A38] hover:bg-[#c96a2d] text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-300"
          >
            Visit Help Center
          </Link>
        </div>
      </div>
    </section>
  );
}

export default StillHaveQuestions;