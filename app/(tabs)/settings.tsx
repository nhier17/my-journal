import { Text, SafeAreaView, ScrollView } from 'react-native';
import { CustomButton, FormField } from "@/components"
import React, { useState } from 'react';
import { useGlobalContext } from "@/context/GlobalProvider";
import { updateProfile, updatePassword } from "@/data/api"

const Settings: React.FC = () => {
    const { user, setUser } = useGlobalContext();
    const [name, setName] = useState<string>(user?.name || '');
    const [email, setEmail] = useState<string>(user?.email || '');
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [isProfileSubmitting, setIsProfileSubmitting] = useState<boolean>(false);
    const [isPasswordSubmitting, setIsPasswordSubmitting] = useState<boolean>(false)


    const handleUpdateProfile = async () => {
        setIsProfileSubmitting(true);
        try {
            if(user) {
           const data = await updateProfile( name, email);
           setUser(data) 
           Alert.alert('Password updated successfully!');
            }
        } catch (error) {
            console.error('Error updating user profile', error);
        } finally {
            setIsProfileSubmitting(false);
        }
    }

    //update password
    const handleUpdatePassword = async () => {
        setIsPasswordSubmitting(true);
        try {
          const data = await updatePassword(oldPassword, newPassword );
          if(data) {
          Alert.alert('Password updated successfully!'); 
          setOldPassword('');
          setNewPassword('');
          }
        } catch (error) {
            console.error('Error updating password', error.response?.data || error);
         } finally {
            setIsPasswordSubmitting(false);
         }
    };


  return (
    <SafeAreaView className="bg-primary h-full">
    <ScrollView className="px-4 my-6">
    <FormField
    title="Name"
    value={name}
    handleChangeText={setName}
    otherSyles="mt-7"
    />
    <FormField
    title="Email"
    value={email}
    handleChangeText={setEmail}
    otherStyles="mt-7"
    keyboardType="email-address"
    />
    <CustomButton
       title="Update Profle"
       isLoading={isProfileSubmitting}
       handlePress={handleUpdateProfile}
       containerStyles="w-full mt-7"
    />
<FormField
    title="Old Password"
    value={oldPassword}
handleChangeText={setOldPassword}
    otherStyles="mt-7"
/>
<FormField
    title="New Password"
    value={newPassword}
handleChangeText={setNewPassword}
    otherStyles="mt-7"
/>
    <CustomButton
       title="Update Password"
       isLoading={isPasswordSubmitting}
       handlePress={handleUpdatePassword}
       containerStyles="w-full mt-7"
       />
       </ScrollView>
    </SafeAreaView>
  )
}

export default Settings

