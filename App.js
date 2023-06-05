import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from "./screens/Onboarding";
import SplashScreen from "./shared/SplashScreen";
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper";
import ProfilePage from "./screens/Profile";
import { NativeBaseProvider } from 'native-base';
import Home from "./screens/Home";

async function checkAuthenticationStatus() {
    try {
        const firstName = await AsyncStorage.getItem('firstName');
        const lastName = await AsyncStorage.getItem('lastName');
        const email = await AsyncStorage.getItem('email');
        const profile = await AsyncStorage.getItem('profile');

        if(firstName !== null && lastName !== null && email !== null) {
            if(profile === "true") {
                return "Home";
            } else {
                return "Profile";
            }
        } else {
            return "Onboarding";
        }
    } catch (error) {
        console.error(error);
        return "Onboarding";
    }
}

const Stack = createNativeStackNavigator();
function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [initialRoute, setInitialRoute] = useState("Onboarding");

    useEffect(() => {
        checkAuthenticationStatus().then(route => {
            setInitialRoute(route);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <SplashScreen />;
    }
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="Profile" component={ProfilePage} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#495E57',
        accent: '#f1c40f',
    },
};
export default () => (
    <PaperProvider theme={theme}>
        <NativeBaseProvider>
            <App />
        </NativeBaseProvider>
    </PaperProvider>
);
