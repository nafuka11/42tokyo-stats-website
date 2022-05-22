import { Cursus } from "./Cursus";
import { Skill } from "./Skill";
import { User } from "./User";

type DateString =
  `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;

export type CursusUser = {
  grade: string;
  level: number;
  skills: Skill[];
  blackholed_at: DateString | null;
  id: number;
  begin_at: DateString;
  end_at: DateString | null;
  cursus_id: number;
  has_coalition: boolean;
  created_at: DateString;
  updated_at: DateString;
  user: User;
  cursus: Cursus;
  launcher: null;
};
