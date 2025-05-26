import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "How accurate are the AI-generated astrological readings?",
      answer:
        "Our AI is trained on traditional Vedic astrology principles and modern astrological techniques. While no astrological reading can be 100% accurate, our system provides insights that many users find helpful and relevant to their situations.",
    },
    {
      question: "What information do I need to provide for a reading?",
      answer:
        "For most accurate readings, you'll need to provide your name, date of birth, time of birth, and place of birth. Gender information is also helpful for certain types of readings.",
    },
    {
      question: "How many free questions do I get?",
      answer:
        "You get 3 free questions in each module (Kundli, Relationship, Career, Partner Compatibility, Business, and Gemstone). After that, you'll need to subscribe to continue asking questions.",
    },
    {
      question: "Can I use the service on mobile devices?",
      answer:
        "Yes, our platform is fully responsive and works on smartphones, tablets, and desktop computers.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription anytime from your account settings. Your access will continue until the end of your billing period.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we take privacy seriously. Your personal information is encrypted and securely stored. We do not share your data with third parties without your consent.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-purple">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Find answers to common questions about our astrological services.
          </p>
        </div>
        <div className="mt-16 mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
