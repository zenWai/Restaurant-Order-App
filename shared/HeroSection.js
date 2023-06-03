import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';

function HeroSection({ title, subTitle, text, imageSrc }) {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title} variant="displaySmall">{title}</Text>
                <Text style={styles.subTitle} variant="headlineMedium">{subTitle}</Text>
                <Text style={styles.text} variant="bodyMedium">{text}</Text>
            </View>
            <Image source={imageSrc} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    image: {
        width: 115,
        height: 145,
        marginRight: 20,
        marginTop: 20,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: '#000000',
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#F4CE14',
        paddingLeft: 10,
    },
    subTitle: {
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'rgba(255,255,255,0.88)',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
        paddingLeft: 10,
    },
    text: {
        textAlign: 'left',
        color: 'rgba(255,255,255,0.88)',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
        paddingLeft: 10,
    },
});

export default HeroSection;