import React from "react"
import { View, Text, Dimensions, StyleSheet } from "react-native"

import Button from "./Button";
const { width, height } = Dimensions.get("window");
export const SLIDER_HEIGHT = 0.61 * height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 44
    },
    subtitle: {
        fontWeight: "bold",
        textTransform: "capitalize",
        fontSize: 24,
        lineHeight: 30,
        marginTop: 24,
        marginBottom: 12,
        color: "#0C0D34"
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: "#0C0D34",
        textAlign: "center",
        marginBottom: 36
    }
})

const SubSlide = ({subtitle, description, onPress, last}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Text style={styles.description}>{description}</Text>
            <Button 
                label={last ? "Let's get started" : "Next"}
                variant={last ? "primary" : "default"}
                {...{ onPress }}
            />
        </View>
    )
}

export default SubSlide;