interface H2BlockProps {
  children: React.ReactNode;
  className?: string;
}

export default function H3Block({ children, className }: H2BlockProps) {
  return (
    <h3
      className={`text-lg sm:text-xl md:text-2xl  font-semibold tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
}
