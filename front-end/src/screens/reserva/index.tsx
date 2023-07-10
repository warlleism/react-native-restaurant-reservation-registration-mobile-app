import React from "react"
import { Dimensions, Image, ScrollView, View } from "react-native";

const { height } = Dimensions.get('screen')

const Reserva = () => {


    return (
        <View>

            <Image style={{ width: "100%", height: height - 500 }} source={require('../../../assets/img1.png')} />

            <ScrollView>

            </ScrollView>

        </View>
    );
}

export default Reserva;