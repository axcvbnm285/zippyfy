import { Role } from "@prisma/client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  store?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}