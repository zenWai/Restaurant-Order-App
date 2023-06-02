import React, {useContext, useRef, useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image} from 'react-native';
import PagerView from 'react-native-pager-view';
import HeroSection from '../shared/HeroSection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from "../shared/AuthContext";

function Onboarding() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const viewPagerRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);

    const { setIsAuthenticated } = useContext(AuthContext);

    const saveInfo = async () => {
        if(name.trim() !== '' && email.trim() !== '' && email.includes('@')) {
            try {
                await AsyncStorage.setItem('name', name);
                await AsyncStorage.setItem('email', email);
                setIsAuthenticated(true);  // update isAuthenticated in our context
            } catch (error) {
                console.error(error);
            }
        } else {
            alert("Please ensure name and email are not empty and email is valid!");
        }
    };

    const onPageSelected = (e) => {
        setCurrentPage(e.nativeEvent.position);
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
                <PagerView
                    style={styles.pager}
                    initialPage={0}
                    onPageSelected={onPageSelected}
                    ref={viewPagerRef}
                >
                    <View key="1" style={styles.page}>
                        <Text style={styles.pageText}>Are you hungry?</Text>
                        <Button title="Yes!" onPress={() => viewPagerRef.current.setPage(1)} />
                    </View>

                    <View key="2" style={styles.page}>
                        <TextInput
                            style={styles.input}
                            placeholder="First and Last Name"
                            onChangeText={text => setName(text)}
                        />
                        <Button title="Next" onPress={() => viewPagerRef.current.setPage(2)} />
                    </View>

                    <View key="3" style={styles.page}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={text => setEmail(text)}
                        />
                        <Button title="Finish" onPress={saveInfo} />
                    </View>
                </PagerView>

                <View style={styles.dotsContainer}>
                    {[0, 1, 2].map((index) => (
                        <View
                            key={index}
                            style={[styles.dot, currentPage === index ? styles.activeDot : null]}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4CE14',
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
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

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
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    pager: {
        flex: 1,
        width: '100%',
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    pageText: {
        fontSize: 20,
        marginBottom: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'left',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
        paddingLeft: 10,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'white',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    activeDot: {
        backgroundColor: 'white',
    },
    cardImage: {
        height: '70%',
        aspectRatio: 1,
        resizeMode: 'cover',
    },
});

export default Onboarding;