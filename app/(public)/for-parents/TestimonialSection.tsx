import { Heart } from "lucide-react";

function TestimonialSection() {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#FAFBFC] border border-[#E5E7EB] rounded-2xl p-8 md:p-10 text-center">
          {/* <!-- Icon --> */}
          <div
            className="w-16 h-16 mx-auto mb-6 flex items-center justify-center 
                rounded-full  bg-red-100"
          >
            <Heart size={30} style={{ color: "red" }} />
          </div>

          {/* <!-- Title --> */}
          <h4 className="text-2xl md:text-2xl font-semibold text-slate-800 mb-6">
            &quot;Our family is happier now&quot;
          </h4>

          {/* <!-- Text --> */}
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            &quot;Before ANIS, bedtime was a daily battle. Now my 10-year-old
            knows the rules, and her tablet automatically locks at 8:30 PM. We
            spend that time reading together instead. She&apos;s sleeping
            better, doing better in school, and we&apos;re not fighting anymore.
            ANIS didn&apos;t just help us manage screen time—it gave us our
            evenings back.&quot;
          </p>

          {/* <!-- Author --> */}
          <p className="text-slate-500 text-base">— Sarah , mother of two</p>
        </div>
      </div>
    </section>
  );
}
//   return (
//     <section className="py-12 md:py-16 px-4">
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-[#FAFBFC] border border-[#E5E7EB] rounded-2xl p-8 md:p-10 text-center">
//           {/* Heart Icon */}
//           <div className="flex justify-center mb-6">
//             <Heart className="w-8 h-8 text-[#1E73BE]" fill="#1E73BE" />
//           </div>

//           {/* Quote Title */}
//           <h3 className="text-xl md:text-2xl font-semibold text-[#2F3E4E] mb-6">
//             &quot;Our family is happier now&quot;
//           </h3>

//           {/* Quote Text */}
//           <p className="text-[#6B7280] leading-relaxed mb-6 italic">
//             &quot;Before ANIS, bedtime was a daily battle. Now my 10-year-old knows the rules, and her tablet
//             automatically locks at 8:30 PM. We spend that time reading together instead. She&apos;s sleeping better,
//             doing better at school, and we&apos;re not fighting anymore. ANIS didn&apos;t just help us manage screen time—it
//             gave us our evenings back.&quot;
//           </p>

//           {/* Author */}
//           <p className="text-sm text-[#9CA3AF]">
//             — Sarah M., mother of two
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

export default TestimonialSection;
