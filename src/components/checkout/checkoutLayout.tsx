interface Props {
  children: React.ReactNode;
}

export const CheckoutLayout = ({ children }: Props) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem',
        padding: '2rem',
      }}
    >
      {children}
    </div>
  );
};
