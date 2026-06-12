export interface InitialContact {
  name: string;
  title?: string;
  prompt?: string;
  bio?: string; // New field for short biography
}

export const initialContacts: InitialContact[] = [];
