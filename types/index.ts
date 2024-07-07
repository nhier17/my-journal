export interface SummaryItem {
    _id: string;
    count: number;
  }
  
  export interface JournalSummaryResponse extends Array<SummaryItem> {}