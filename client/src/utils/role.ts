import { User } from '@hooks/data/models/types';
import { Roles } from '@models/role';

export const hasPermission = (user: User, role: Roles): boolean => {
  return user.role === role;
};
