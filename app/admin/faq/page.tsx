import { createFaqItem } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { SectionCard, SubmitButton, TextArea, TextField } from "@/components/forms/base";

export default async function FaqPage() {
  const faq = await prisma.faqItem.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="space-y-4">
      <SectionCard title="FAQ Configuration" description="Manage frequently asked questions block.">
        <form action={createFaqItem} className="space-y-3">
          <TextField name="question" label="Question" required />
          <TextArea name="answer" label="Answer" rows={3} />
          <TextField name="sortOrder" label="Sort order" defaultValue="0" />
          <SubmitButton label="Add FAQ" />
        </form>
      </SectionCard>

      <SectionCard title="FAQ Items">
        <div className="space-y-2">
          {faq.map((item) => (
            <div key={item.id} className="rounded-lg border border-slate-200 p-3 text-sm">
              <p className="font-semibold">{item.question}</p>
              <p className="text-slate-600">{item.answer}</p>
            </div>
          ))}
          {!faq.length && <p className="text-sm text-slate-500">No FAQ items yet.</p>}
        </div>
      </SectionCard>
    </div>
  );
}
