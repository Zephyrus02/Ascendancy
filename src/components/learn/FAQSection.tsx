import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I register my team?",
    answer: "Create an account, go to the Create Team page, fill in your team details and members' information. Make sure all players meet the eligibility requirements before registering. Once the payment gets completed successfully the team will be verified and eligible to play."
  },
  {
    question: "What is the tournament format?",
    answer: "The tournament begins with online qualifiers, followed by a group stage where teams are divided into 4 groups. Top 2 teams from each group advance to single elimination playoffs."
  },
  {
    question: "Are substitute players allowed?",
    answer: "Yes, each team can have 2 substitute players in addition to their 5 main players. Substitutes can be switched between matches with prior notification."
  },
  {
    question: "What happens if there's a technical issue?",
    answer: "Each team gets one technical pause per map. If issues persist, contact an admin immediately through Discord. Extended technical issues may result in rescheduling."
  },
  {
    question: "How is prize money distributed?",
    answer: "The $10,000 prize pool is distributed as follows: 1st place - $5,000, 2nd place - $3,000, 3rd place - $2,000. Prizes are paid out within 30 days of tournament completion."
  },
  {
    question: "What are the match scheduling rules?",
    answer: "Match schedules are fixed for the tournament. Teams must be ready 15 minutes before their scheduled match time. Schedule conflicts should be reported at least 48 hours in advance."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-[#1a1a1a] transition-all duration-300
                   hover:shadow-[0_0_20px_rgba(255,70,85,0.15)]"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 flex items-center justify-between"
          >
            <span className="text-lg font-medium text-left">{faq.question}</span>
            {openIndex === index ? (
              <Minus className="w-5 h-5 text-[#FF4655]" />
            ) : (
              <Plus className="w-5 h-5 text-[#FF4655]" />
            )}
          </button>
          
          <div
            className={`px-6 overflow-hidden transition-all duration-300 ease-in-out
                      ${openIndex === index ? 'max-h-48 pb-4' : 'max-h-0'}`}
          >
            <p className="text-white/70">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}