export interface SummaryItem {
    _id: string;
    count: number;
  }
  export interface FormState {
    name: string;
    email: string;
    password: string;
  }
  
  export interface User {
    name: string;
    email: string;
    password: string;
  }
  export interface EntryState {
    title: string;
    content: string;
    category: string;
    date: Date;
  }
  
  export interface JournalSummaryResponse extends Array<SummaryItem> {}