import React, { useState } from 'react';
import { Search } from 'lucide-react';
import FAQAccordion from '../../components/admin/FAQAccordion';

const faqs = [
  {
    question: "How do I customize the chat widget?",
    answer: "Navigate to Chat Management > Widget Settings. Here you can customize colors, logo, welcome message, and other appearance settings."
  },
  {
    question: "How do I manage user permissions?",
    answer: "Go to User Management, select a user, and click 'Edit Permissions'. You can assign roles and specific permissions for each team member."
  },
  {
    question: "How do I create departments?",
    answer: "In Department Management, click 'Add Department'. Enter department details and assign team members. You can also set routing rules for each department."
  },
  {
    question: "How do I view chat analytics?",
    answer: "Visit the Analytics section to view detailed reports on chat volume, response times, satisfaction ratings, and other key metrics."
  },
  {
    question: "How do I set up automated responses?",
    answer: "In Chat Management > Automations, you can create triggers and automated responses based on specific conditions or keywords."
  },
  {
    question: "How do I manage the knowledge base?",
    answer: "Access the Knowledge Base section to create, edit, and organize help articles. You can categorize articles and set visibility permissions."
  },
  {
    question: "How do I configure working hours?",
    answer: "Go to Settings > Business Hours to set your company's operating hours. This affects chat availability and automated messages."
  },
  {
    question: "How do I export chat transcripts?",
    answer: "In Chat Management > History, use the export feature to download chat transcripts. You can filter by date, department, or agent."
  }
];

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleEmailSupport = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = 'mailto:support@company.com';
  };

  const handleDocumentation = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('/docs', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Help & Support
        </h1>
        <form className="relative max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            id="faq-search"
            name="faq-search"
            className="block w-full pl-10 pr-3 py-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type keywords to find answers"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
          />
        </form>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={faqs} searchQuery={searchQuery} />
        </div>

        {/* Additional Support Options */}
        <div className="mt-12 bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Need More Help?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Contact Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get in touch with our dedicated support team for personalized assistance.
              </p>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                onClick={handleEmailSupport}
              >
                Email Support
              </button>
            </div>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Documentation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Access our comprehensive documentation for detailed guides and tutorials.
              </p>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                onClick={handleDocumentation}
              >
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
