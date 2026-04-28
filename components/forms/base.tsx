export function SectionCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="admin-card rounded-2xl bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>
      {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

export function TextField({ name, label, defaultValue, type = "text", required = false }: { name: string; label: string; defaultValue?: string | null; type?: string; required?: boolean }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-slate-600">
        {label}
        {required ? <span className="ml-1 text-rose-500">*</span> : null}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="w-full border-0 border-b-2 border-slate-300 bg-transparent px-1 py-2 outline-none transition duration-200 focus:-translate-y-0.5 focus:border-sky-500"
      />
    </label>
  );
}

export function TextArea({
  name,
  label,
  defaultValue,
  rows = 4,
  required = false
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  rows?: number;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-slate-600">
        {label}
        {required ? <span className="ml-1 text-rose-500">*</span> : null}
      </span>
      <textarea
        name={name}
        defaultValue={defaultValue ?? ""}
        rows={rows}
        required={required}
        className="w-full border-0 border-b-2 border-slate-300 bg-transparent px-1 py-2 outline-none transition duration-200 focus:-translate-y-0.5 focus:border-sky-500"
      />
    </label>
  );
}

export function CheckField({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="mt-1 flex min-h-[42px] items-center gap-2 text-sm">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 rounded border-slate-300" />
      <span>{label}</span>
    </label>
  );
}

export function SubmitButton({ label = "Save changes" }: { label?: string }) {
  return <button className="admin-button rounded-lg px-4 py-2 text-sm text-white">{label}</button>;
}
