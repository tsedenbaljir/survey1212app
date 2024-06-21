import React, { Component } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';
import Utils from '../utils/Utils';

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinValue: new Animated.Value(0),
        };
    }

    componentDidMount() {
        Animated.loop(
            Animated.timing(this.state.spinValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }

    render() {
        const { spinValue } = this.state;

        const spin = spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg'],
        });

        return (
            <View style={styles.container}>
                <View style={styles.centered}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={Utils.LOGO}
                            style={{
                                position: "absolute",
                                marginTop: "40%",
                                bottom: -51,
                                width: 50,
                                height: 50,
                            }}
                        />
                    </View>
                    <Animated.View style={
                        [
                            styles.spinner,
                            {
                                transform: [{
                                    rotate: spin
                                }]
                            }
                        ]
                    } />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinner: {
        width: 52,
        height: 52,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#89befa',
        borderTopColor: '#005baa',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MyComponent;
