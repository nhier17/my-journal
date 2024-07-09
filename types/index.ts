export interface SummaryItem {
    _id: string;
    count: number;
  }
  export interface FormState {
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

  export interface FormFieldProps {
    title: string;
    value: string;
    handleChangeText: (text: string) => void;
    otherStyles?: string;
  }
  export interface CustomButtonProps {
    title: string;
    isLoading: boolean;
    handlePress: () => void;
    containerStyles?: string;
  }
  
  export interface User {
    _id: string;
    name: string;
    email: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface UpdateProfileResponse {
    user: User;
}

export interface UpdatePasswordResponse {
    msg: string;
}

export interface JournalEntry {
    _id: string;
    title: string;
    content: string;
    category: string;
    date: string;
    user: User;
}

  export interface JournalSummaryResponse extends Array<SummaryItem> {}