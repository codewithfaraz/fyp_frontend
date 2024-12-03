export default function Card({
  styles,
  children,
}: {
  styles: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`max-w-4xl mx-auto my-12 ${styles} md:max-w-6xl`}>
      {children}
    </div>
  );
}
