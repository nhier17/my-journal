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
  
  export interface JournalSummaryResponse extends Array<SummaryItem> {}