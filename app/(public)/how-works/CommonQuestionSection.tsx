import CommonQuestionComponent from '@/app/components/how-work/CommonQuestionComponent'
import { CommonQuestionData } from '@/app/data/HowWork/CommonQuestion'
import React from 'react'

function CommonQuestionSection() {
  return (
 <section className="py-5">
      <div className="flex justify-center">
        <div className="w-full max-w-4xl space-y-12 mx-auto px-4">
          {CommonQuestionData.map((card, index) => (
            <CommonQuestionComponent
              key={index}
             
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CommonQuestionSection
