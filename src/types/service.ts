export interface Service {
  id: string;
  name: string;
  description: string;
  owner: string;
  tags: string[];
  docs_link: string;
  created_at?: string;
}