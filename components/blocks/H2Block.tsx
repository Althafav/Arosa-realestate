interface H2BlockProps {
  children: React.ReactNode;
  className?: string;
}

export default function H2Block({ children, className }: H2BlockProps) {
  return (
    <h2
      className={`text-primary text-2xl sm:text-3xl md:text-4xl  font-bold tracking-tighter leading-tight ${className}`}
    >
      {children}
    </h2>
  );
}
