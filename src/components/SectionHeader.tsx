type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="panel p-6">
      <p className="text-xs uppercase tracking-[0.35em] text-accent">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">{title}</h2>
      <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300 md:text-base">{description}</p>
    </div>
  );
}
