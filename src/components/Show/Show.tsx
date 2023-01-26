export interface ShowProps {
  when: any;
  children: React.ReactNode;
}

export const Show: React.FC<ShowProps> = ({ when, children }) => {
  if (!when) return null;
  return <>{children}</>;
};
