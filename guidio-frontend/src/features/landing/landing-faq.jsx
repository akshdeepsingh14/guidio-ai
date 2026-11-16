import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/features/landing/landing-data";
import { SectionHeading } from "@/features/landing/section-heading";

export function LandingFaq() {
  return (
    <section id="faq" className="scroll-mt-20 py-16 sm:py-24">
      <div className="container max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions students ask."
          description="Straight answers, including the limits of the free AI tier."
        />

        <Accordion className="mt-10 rounded-2xl border bg-card px-5 sm:px-6">
          {faqs.map((faq) => (
            <AccordionItem key={faq.value} value={faq.value}>
              <AccordionTrigger className="py-4 text-base">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent>
                <p className="pr-8 text-base leading-7 text-muted-foreground">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}