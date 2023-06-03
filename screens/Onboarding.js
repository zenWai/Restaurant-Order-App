import React, {useContext, useRef, useState} from 'react';
import { View, StyleSheet, ImageBackground, Image} from 'react-native';
import {Text} from "react-native-paper";
import HeroSection from '../shared/HeroSection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from "../shared/AuthContext";
import {Dialog, Button, Portal, TextInput} from "react-native-paper";

function Onboarding() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const { setIsAuthenticated } = useContext(AuthContext);

    const saveInfo = async () => {
        if(name.trim() !== '' && email.trim() !== '' && email.includes('@')) {
            try {
                await AsyncStorage.setItem('name', name);
                await AsyncStorage.setItem('email', email);
                setIsAuthenticated(true);  // update isAuthenticated in our context
                hideDialog();
            } catch (error) {
                console.error(error);
            }
        } else {
            alert("Please ensure name and email are not empty and email is valid!");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <HeroSection
                    title="Little Lemon"
                    subTitle={"Chicago"}
                    text="We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist."
                    imageSrc={require('../assets/Hero_image.png')}
                />
            </View>

            <View style={styles.middleContainer}>
                <ImageBackground
                    source={require('../assets/Bruschetta.png')}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <View style={styles.overlay}>
                        <Text style={styles.title}>Dish of the Day</Text>
                        <Text style={styles.text}>
                            The famous Greek salad of crispy lettuce, peppers, olives, and our...
                        </Text>
                    </View>
                </ImageBackground>
            </View>

            <View style={styles.bottomContainer}>
                <Text style={styles.text} variant="displaySmall">Feeling hungry?</Text>
                <Button
                    mode="contained"
                    onPress={showDialog}
                    buttonColor='#F4CE14' // set color
                    contentStyle={{ flexDirection: "row-reverse", elevation: 5, height:60, width: 260}}
                    icon={({size, color}) => (
                        <Image
                            source={require('../assets/delivery-man.png')}
                            style={{width: 60, height: 60}}
                        />
                    )}
                >
                    <Text style={{color:'black', fontWeight: 'bold'}} variant="titleLarge">Order Now</Text>
                </Button>

                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Order Now</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                label="First and Last Name"
                                value={name}
                                onChangeText={setName}
                                mode="flat"
                                style={styles.input}
                            />
                            <TextInput
                                label="Email"
                                value={email}
                                onChangeText={setEmail}
                                mode="flat"
                                style={styles.input}
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button
                                icon={() => <Image source={require('../assets/check-mark.png')} style={{width: 24, height: 24}} />}
                                mode="contained"
                                onPress={saveInfo}
                                disabled={name.trim() === '' || email.trim() === '' || !email.includes('@')}
                            >
                                Choose your Food
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
    },
    topContainer: {
        flex: 1,
        backgroundColor: '#495E57',
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#495E57',
        marginTop: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 20,
        paddingVertical: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    text: {
        color: 'white',
        textAlign: 'auto',
        marginBottom: 40,
    },
    input: {
        width: '80%',
        height: 50,
        paddingHorizontal: 20,
        marginTop: 10,
    },
});

export default Onboarding;