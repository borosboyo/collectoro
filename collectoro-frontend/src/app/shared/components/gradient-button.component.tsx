import React from "react";
import {LinearGradient} from "expo-linear-gradient";
import {Button, View} from "native-base";
export default function GradientButtonComponent(props: any) {
   return (
           <View style={{
               overflow: 'hidden',
               borderRadius: 25,
               elevation: props.elevation
           }}>
               <LinearGradient
                   colors={['#6E1DCE', '#7DD6FF']}
                   start={{ x: 0, y: 0 }}
                   end={{ x: 1, y: 1 }}
               >
                   <Button onPress={props.onPress} background={'transparent'}>{props.text}
                   </Button>
               </LinearGradient>
           </View>
   )
}







