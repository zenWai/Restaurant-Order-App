import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {RFValue} from "react-native-responsive-fontsize";

function HeroSection({ title, subTitle, text, imageSrc }) {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>
                <Text style={styles.text}>{text}</Text>
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
        fontSize: RFValue(45),
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#F4CE14',
        paddingLeft: 10,
    },
    subTitle: {
        fontSize: RFValue(34),
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'rgba(255,255,255,0.88)',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
        paddingLeft: 10,
    },
    text: {
        fontSize: RFValue(16),
        textAlign: 'left',
        color: 'rgba(255,255,255,0.88)',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
        paddingLeft: 10,
    },
});

export default HeroSection;