export default function HeadingPrimary({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles?: string;
}) {
  return (
    <h1 className={`text-3xl md:text-6xl space-y-6 ${styles}`}>{children}</h1>
  );
}
