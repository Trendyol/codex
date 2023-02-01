import { FC, ReactNode } from 'react';

type AuthLayoutProps = {
  children?: ReactNode;
};

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default AuthLayout;
