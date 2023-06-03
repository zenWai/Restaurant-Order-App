import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useContext, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from "./screens/Onboarding";
import SplashScreen from "./shared/SplashScreen";
import {AuthContext, AuthProvider} from "./shared/AuthContext";
import {PaperProvider} from "react-native-paper";

async function checkAuthenticationStatus(setIsAuthenticated) {
    try {
        const name = await AsyncStorage.getItem('name');
        const email = await AsyncStorage.getItem('email');
        if(name !== null && email !== null) {
            setIsAuthenticated(true);
        }
    } catch (error) {
        console.error(error);
    }
}

const AuthenticatedStack = createNativeStackNavigator();
function AuthenticatedNavigator() {
    return (
        <AuthenticatedStack.Navigator>
            <AuthenticatedStack.Screen name="Profile" component={Onboarding} />
        </AuthenticatedStack.Navigator>
    );
}

const NonAuthenticatedStack = createNativeStackNavigator();
function NonAuthenticatedNavigator() {
    return (
        <NonAuthenticatedStack.Navigator>
            <NonAuthenticatedStack.Screen name="Onboarding" component={Onboarding} />
        </NonAuthenticatedStack.Navigator>
    );
}

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        checkAuthenticationStatus(setIsAuthenticated).then(() => {
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <SplashScreen />;
    }
    return (
        <NavigationContainer>
            {isAuthenticated ? <AuthenticatedNavigator /> : <NonAuthenticatedNavigator />}
        </NavigationContainer>
    );
}
export default () => (
    <PaperProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
    </PaperProvider>
);
