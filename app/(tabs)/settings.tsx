import { Text, SafeAreaView, ScrollView } from 'react-native';
import { CustomButton, FormField } from "@/components"
import React, { useState } from 'react';
import { useGlobalContext } from "@/context/GlobalProvider";

const Settings: React.FC = () => {
    const { user, setUser } = useGlobalContext();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUpdateProfile = async () => {
        setIsSubmitting(true);
        try {
            if(user) {
           const data = await updateProfile(user._id, { name, email});
           setUser(data) 
           Alert.alert('Password updated successfully!');
            }
        } catch (error) {
            console.error('Error updating user profile', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    //update password
    const handleUpdatePassword = async () => {
        setIsSubmitting(true);
        try {
          await updatePassword({ oldPassword, newPassword });
          Alert.alert('Password updated successfully!'); 
        } catch (error) {
            console.error('Error updating password', error);
        } finally {
            setIsSubmitting(false);
        }
    };


  return (
    <SafeAreaView className="bg-primary h-full">
    <ScrollView className="px-4 my-6">
    <FormField
    title="Name"
    value={name}
    handleChangeText={(text) => setName(text)}
    otherSyles="mt-7"
    />
    <FormField
    title="Email"
    value={email}
    handleChangeText={(text) => setEmail(text)}
    />
    <CustomButton
       title="Update Profle"
       isLoading={isSubmitting}
       handlePress={handleUpdateProfile}
       containerStyles="w-full mt-7"
    />
<FormField
    title="Old Password"
    value={oldPassword}
    handleChangeText={(text) => setOldPassword(text)}
    otherStyles="mt-7"
/>
<FormField
    title="New Password"
    value={newPassword}
    handleChangeText={(text) => setNewPassword(text)}
    otherStyles="mt-7"
/>
    <CustomButton
       title="Update Password"
       isLoading={isSubmitting}
       handlePress={handleUpdatePassword}
       containerStyles="w-full mt-7"
       />
       </ScrollView>
    </SafeAreaView>
  )
}

export default Settings

