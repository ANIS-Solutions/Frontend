import CommonQuestionComponent from '@/app/components/how-work/CommonQuestionComponent'
import { CommonQuestionData } from '@/app/data/HowWork/CommonQuestion'
import Link from 'next/link';

function CommonQuestionSection() {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-[#2F3E4E] text-center mb-10">
          Common questions
        </h2>

        {/* Questions */}
        <div className="space-y-4">
          {CommonQuestionData.map((card, index) => (
            <CommonQuestionComponent
              key={index}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1 text-[#1E73BE] font-medium hover:underline transition-all"
          >
            View all FAQs
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CommonQuestionSection;