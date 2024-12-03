export default function HeadingSecondary({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles?: string;
}) {
  return <h2 className={`text-3xl ${styles} md:text-left`}>{children}</h2>;
}
