import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  searchQuery: string;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs, searchQuery }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4" role="region" aria-label="Frequently Asked Questions">
      {filteredFaqs.map((faq, index) => {
        const isExpanded = openIndex === index;
        const headingId = `faq-question-${index}`;
        const panelId = `faq-answer-${index}`;

        return (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setOpenIndex(isExpanded ? null : index)}
              aria-expanded={isExpanded}
              aria-controls={panelId}
              id={headingId}
            >
              <span className="text-lg font-medium text-gray-700 dark:text-gray-200">
                {faq.question}
              </span>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              )}
            </button>
            {isExpanded && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headingId}
                className="px-6 py-4 bg-gray-50 dark:bg-gray-700"
              >
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
      {filteredFaqs.length === 0 && (
        <div className="text-center py-8" role="alert">
          <p className="text-gray-500 dark:text-gray-400">
            No FAQs found matching your search criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default FAQAccordion;
