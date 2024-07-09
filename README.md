# My-Journal 👋

My-Journal is a personal journaling application designed to help users keep track of their daily thoughts, experiences, and reflections. The app provides a simple and intuitive user interface for creating, managing, and viewing journal entries. It supports features such as user authentication, categorization of entries, and viewing summaries of journal entries over different periods (daily, weekly, monthly).

<div align="center">
  <br />
      <img src="https://i.postimg.cc/5NR9bxFM/Sora-README.png" alt="Project Banner">
    
  <br />

  <div>
    <img src="https://img.shields.io/badge/-React_Native-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/NativeWind-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="nativewind" />
  </div>

  <h3 align="center">Journal Entry App</h3>

</div>



## <a name="tech-stack">⚙️ Tech Stack</a>

- React Native
- Expo
- Nativewind
- Axios
- Context API for state mangement
- Typescript
  

## <a name="features">🔋 Features</a>

👉 **Onboarding Screen**: Engaging graphics and clear instructions welcome users to the app.

👉 **Robust Authentication & Authorization System**: Secure email login safeguards user accounts.

👉 **Dynamic Journal Screen with Animated Flat List**: Smoothly animated flat list showcases the latest created entries for seamless browsing.

👉 **Pull-to-Refresh Functionality**: Users can refresh content with a simple pull gesture for up-to-date information.

👉 **Tab Navigation**: Navigate between sections like Home, Journals, and Profile with ease using tab navigation.

👉 **Journal Entries Creation Screen **: Create, read, update, and delete journal entries.

👉 **Profile Screen with Detailed Insights**: View account details and activity, including uploaded videos and follower count, for a personalized experience.

👉 **Responsiveness**: Smooth performance and adaptability across various devices and screen sizes for a consistent user experience.

👉 **Categorization**:  Organize entries by categories for better management.

👉 **Summary Views**:  View summaries of journal entries for different periods.


## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/nhier17/my-journal.git
cd my-journal
```
**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npm start
```

**Expo Go**

Download the [Expo Go](https://expo.dev/go) app onto your device, then use it to scan the QR code from Terminal and run.

## API Endpoints
The app interacts with backend services to manage journal entries and user authentication. Below are the key API endpoints:

### User Authentication

Login: /api/auth/login

Register: /api/auth/register

Current User: /api/user/current

### Journal Entries

Get All Entries: /api/journal

Create Entry: /api/journal

Update Entry: /api/journal/:id

Delete Entry: /api/journal/:id

Get Summary: /api/journal/summary

### Contexts
The app uses React Context for global state management. The main context provider is GlobalProvider, which manages the state for user authentication, journal entries, and loading status.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>tailwind.config.js</code></summary>

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

</details>

<details>
<summary><code>tabs layout</code></summary>

```javascript
import { Tabs, Redirect } from 'expo-router';
import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import icons  from "@/constants/icons";
import { useGlobalContext } from "@/context/GlobalProvider";


const TabIcon = ({ icon, color, name, focused }) => {

  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return <Redirect href="/sign-in" />;


  return (
    <>
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: "#FFA001",
      tabBarInactiveTintColor: "#CDCDE0",
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#161622",
        borderTopWidth: 1,
        borderTopColor: "#232533",
        height: 84,
      },
    }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
            icon={icons.home}
            color={color}
            name="Home"
            focused={focused}
            />
          ),
        }}
      />
        <Tabs.Screen
        name="journals"
        options={{
          title: 'Journals',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
            icon={icons.bookmark}
            color={color}
            name="Journals"
            focused={focused}
            />
          ),
        }}
      />
          <Tabs.Screen
        name="create"
        options={{
          title: 'Create Entry',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
            icon={icons.plus}
            color={color}
            name="Create"
            focused={focused}
            />
          ),
        }}
      />
     <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
            icon={icons.profile}
            color={color}
            name="Profile"
            focused={focused}
            />
          ),
        }}
      />  
    <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
            icon={icons.setting}
            color={color}
            name="Settings"
            focused={focused}
            />
          ),
        }}
      />
    </Tabs>
      <StatusBar backgroundColor="#161622" style="light" />
      </>
  );
}

```

</details>

<details>
<summary><code>Global Context</code></summary>

```javascript
import React, { createContext, useContext, useEffect, useState } from "react";
import { currentUser } from "@/data/api";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [entries, setEntries] = useState([]);


  useEffect(() =>{
  const checkLoggedIn = async () => {
    try {
      const isLoggedIn = await currentUser();
      console.log('currentUser response:', isLoggedIn);
      if(isLoggedIn) {
        setIsLogged(true)
        setUser(isLoggedIn.user);
      } else {
        setIsLogged(false);
        setUser(null);
      }

    } catch (error) {
      console.error('Error checking login status:', error);
    }
  }

  checkLoggedIn();
  
}, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        setLoading,
        entries,
        setEntries,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

```

</details>

<details>
<summary><code>APIS</code></summary>

```typescript
import axios from 'axios'
import { JournalSummaryResponse } from '@/types';
import { 
    SummaryItem,
     AuthResponse,
     User,
     UpdateProfileResponse,
     JournalEntry,
     UpdatePasswordResponse

 } from '@/types';

export const base_url = "https://my-journal-api-oysu.onrender.com";

const axiosInstance = axios.create({
    baseURL: base_url,
    withCredentials: true,
});

// sign in
export const signIn = async (form: { email: string; password: string }): Promise<AuthResponse> => {
    try {
        const response = await axiosInstance.post<AuthResponse>('/api/auth/login', form);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// sign up
export const signUp = async (form: { name: string; email: string; password: string }): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(`${base_url}/api/auth/register`, form);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
//logout user
export const logout = async (): Promise<void> => {
    try {
        await axiosInstance.get(`/api/auth/logout`);
    } catch (error) {
        throw error.response.data;
    }
};
//show current user
export const currentUser = async () => {
    try {
        const response = await axiosInstance.get('/api/user/current');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// update user profile 
export const updateProfile = async (data: { name: string; email: string }): Promise<UpdateProfileResponse> => {
    try {
        const response = await axiosInstance.post<UpdateProfileResponse>('/api/user/update-user', data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
//update user password
export const updatePassword = async (oldPassword: string, newPassword: string): Promise<UpdatePasswordResponse> => {
    try {
        const response = await axiosInstance.patch<UpdatePasswordResponse>('/api/user/update-password', { oldPassword, newPassword });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
// create new journal entry
export const createJournalEntry = async (form: { title: string; content: string; category: string; date: string }): Promise<JournalEntry> => {
    try {
        const response = await axiosInstance.post<JournalEntry>('/api/journal', form);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

//view the journal entry
export const journalEntries = async (): Promise<JournalEntry[]> => {
    try {
        const response = await axiosInstance.get<JournalEntry[]>(`/api/journal`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
//get  journal summary 
export const journalSummary = async (period: string): Promise<SummaryItem[]> => {
    try {
        const response = await axiosInstance.get<SummaryItem[]>(`/api/journal/summary?period=${period}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
 //delete journal entry
 export const deleteEntry = async (id: string): Promise<void> => {
    try {
        await axiosInstance.delete(`/api/journal/${id}`);
    } catch (error) {
        throw error.response.data;
    }
};

```

</details>
