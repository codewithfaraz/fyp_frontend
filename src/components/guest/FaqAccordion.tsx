import { useState } from "react";
import { Accordion } from "rizzui";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
const faqs = [
  {
    question: "How does IdeasConnect protect my intellectual property?",
    answer:
      "We use advanced AI algorithms to detect duplicate ideas and ensure confidentiality. Your ideas are only visible to verified experts until you choose to share them with investors. We also have strict non-disclosure agreements in place for all platform users.",
  },
  {
    question: "What types of ideas can I submit on the platform?",
    answer:
      "IdeasConnect welcomes ideas from various sectors including technology, healthcare, sustainability, education, finance, and more. Our diverse network of experts covers a wide range of industries to provide relevant feedback.",
  },
  {
    question: "How do I get matched with the right expert?",
    answer:
      "Our platform uses an intelligent matching algorithm to connect you with experts in your field. Experts are verified professionals with experience in relevant industries who can provide valuable insights and help refine your idea.",
  },
  {
    question: "What happens after my idea is refined by experts?",
    answer:
      "Once experts mark your idea as refined, it becomes visible to our network of investors who are looking for promising opportunities. You maintain control over who can view your idea's details and can directly communicate with interested investors.",
  },
  {
    question: "How does the investment process work?",
    answer:
      "Investors can browse refined ideas and express interest through our platform. You can then engage in direct discussions, share more detailed information, and negotiate terms. Our platform facilitates the initial connection, while giving you freedom to structure the deal that works best.",
  },
];

const FaqAccordion = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            FAQ
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Everything you need to know about our platform
          </p>
        </div>
        {faqs.map((faq, index) => {
          return (
            <Accordion
              key={index}
              className="mx-8 border-b last-of-type:border-b-0"
            >
              <Accordion.Header>
                {({ open }) => (
                  <div className="flex w-full cursor-pointer items-center justify-between py-5 text-xl font-semibold">
                    {faq.question}
                    <ChevronDownIcon
                      className={`h-5 w-5 -rotate-90 transform transition-transform duration-300 ${
                        open && "-rotate-0"
                      }`}
                    />
                  </div>
                )}
              </Accordion.Header>
              <Accordion.Body className="mb-7">{faq.answer}</Accordion.Body>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default FaqAccordion;
