import { updateThemeConfig } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { SectionCard, SubmitButton, TextField } from "@/components/forms/base";

const colorFields = [
  ["primaryColor", "Primary color"],
  ["secondaryColor", "Secondary color"],
  ["accentColor", "Accent color"],
  ["backgroundColor", "Background color"],
  ["surfaceColor", "Surface color"],
  ["textColor", "Text color"],
  ["successColor", "Success color"],
  ["warningColor", "Warning color"],
  ["errorColor", "Error color"]
] as const;

export default async function ThemePage() {
  const theme = await prisma.themeConfig.findUnique({ where: { id: 1 } });

  return (
    <SectionCard title="Theme Settings" description="Adjust UI colors and style tokens.">
      <form action={updateThemeConfig} className="grid gap-3 md:grid-cols-2">
        {colorFields.map(([name, label]) => (
          <TextField key={name} name={name} label={label} defaultValue={theme?.[name]} />
        ))}
        <TextField name="borderRadius" label="Border radius" defaultValue={theme?.borderRadius} />
        <TextField name="shadowStyle" label="Card shadow" defaultValue={theme?.shadowStyle} />
        <TextField name="fontHeading" label="Heading font" defaultValue={theme?.fontHeading} />
        <TextField name="fontBody" label="Body font" defaultValue={theme?.fontBody} />
        <div className="md:col-span-2">
          <SubmitButton />
        </div>
      </form>
    </SectionCard>
  );
}
