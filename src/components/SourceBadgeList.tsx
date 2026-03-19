type SourceBadgeListProps = {
  pages: number[];
};

export function SourceBadgeList({ pages }: SourceBadgeListProps) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {pages.map((page) => (
        <span key={page} className="tag">
          source p.{page}
        </span>
      ))}
    </div>
  );
}
