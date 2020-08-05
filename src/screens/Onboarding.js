import React, { useRef } from "react";
import { View, ScrollView, Text, Dimensions, StyleSheet } from "react-native";
import Slide, { SLIDER_HEIGHT } from "../components/Slide";
import SubSlide from "../components/SubSlide";
import { interpolateColors, multiply } from "react-native-reanimated";
import { useValue, onScrollEvent } from "react-native-redash";
import Animated from "react-native-reanimated"

const BORDER_RADIUS = 75;
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    slider: {
        height: SLIDER_HEIGHT,
        borderBottomRightRadius: BORDER_RADIUS
    },
    footer: {
        flex: 1
    },
    footerContent: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        borderTopLeftRadius: BORDER_RADIUS
    }
})

const slides = [
    { 
        title: "relaxed",
        subtitle: "find your outfits",
        description: "Confused about your outfit? Don't worry! Find the best outfit here!",
        color: "#BFEAF5"
    },
    { 
        title: "playful",
        subtitle: "hear it first, wear it first",
        description: "Hating the clothes in your wardobe? Explore hundreds of outfit ideas",
        color: "#BEECC4" },
    { 
        title: "excentric",
        subtitle: "your style, your way",
        description: "Create your invidual & unique style and look amazing everyday",
        color: "#FFE4D9" },
    { 
        title: "funky",
        subtitle: "look good, feel good",
        description: "Discover the latest trends in fashion and explore your personality",
        color: "#FFDDDD" 
    }
]

const Onboarding = () => {
    const scroll = useRef(null);
    const x = useValue(0);
    const onScroll = onScrollEvent({ x });
    const backgroundColor = interpolateColors(x, {
        inputRange: slides.map((_, i) => i * width),
        outputColorRange: slides.map(slide => slide.color)
    });
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.slider, { backgroundColor }]}>
                <Animated.ScrollView
                    ref={scroll}
                    horizontal
                    snapToInterval={width}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    scrollEventThrottle={1}
                    {...{onScroll}}
                >
                    { slides.map(({ title }, index) => (
                        <Slide key={index} right={(index % 2)} {...{title}} />
                    ))}
                </Animated.ScrollView>
            </Animated.View>
            <View style={styles.footer}>
                <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor }}/>
                <Animated.View style={[styles.footerContent, { width: width * slides.length, flex: 1, transform: [{translateX: multiply(x, -1)}]}]}>
                    { slides.map(({ subtitle, description }, index) => (
                        <SubSlide 
                            key={index}
                            last={index === slides.length - 1}
                            {...{subtitle, description}}
                            onPress={() => {
                                if (scroll.current) {
                                    scroll.current.getNode().scrollTo({ x: width * (index + 1), animated: true})
                                }
                            }}
                        />
                    ))}
                </Animated.View>
            </View>
        </View>
    )
}

export default Onboarding;