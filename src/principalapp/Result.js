import { Text, View, SafeAreaView } from 'react-native'
import React from 'react'

const Result = ({ route }) => {
    const { text } = route.params;

  return (
    <SafeAreaView className="flex p-2">
        <View className="justify-center items-center">
            <Text className="text-xl font-extrabold my-3">La sugerencias que encontramos son:</Text>
            <Text className="font-bold">{text}</Text>
        </View>
    </SafeAreaView>
  )
}

export default Result
