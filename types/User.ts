export type User = {
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
