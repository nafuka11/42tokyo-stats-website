export type CursusUser = {
  grade: string | null;
  level: number;
  skills: Skill[];
  blackholed_at: string | null;
  id: number;
  begin_at: string;
  end_at: string | null;
  cursus_id: number;
  has_coalition: boolean;
  created_at: string;
  updated_at: string;
  user: User;
  cursus: Cursus;
  launcher: null;
};

type Skill = {
  id: number;
  name: string;
  level: number;
};

type Cursus = {
  id: number;
  created_at: Date;
  name: string;
  slug: string;
};

type User = {
  id: number;
  "staff?": boolean;
  correction_point: number;
  pool_month: string | null;
  pool_year: number | null;
  location: string | null;
  wallet: number;
  anonymize_date: Date;
  created_at: Date;
  updated_at: Date;
  alumni: boolean;
  "is_launched?": boolean;
};
