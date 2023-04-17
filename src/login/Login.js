import { SafeAreaView, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { auth } from '../config/firebase'
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.replace("Inicio")
        }
      })  
      return unsubscribe
    }, [])

    const handlerCrear = () => {
      navigation.replace("Nuevo")
    }

    const handleLoginIn = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user
        console.log("login with: " + user.email)
      })
    }

  return (
    <SafeAreaView
        className="flex-1 items-center mt-20"
    > 
    <Text className="text-2xl font-bold">Sugerencias de regalo</Text>
    <Text className="text-1xl font-bold text-gray-500/70">Provider by CHATGPT</Text>
      <View
        className="w-4/5 mt-5"
      >
        <TextInput 
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
           className="bg-white py-4 px-2 rounded-lg mt-1"
        />
        <TextInput 
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
           className="bg-white py-4 px-2 rounded-lg mt-1"
            secureTextEntry
        />
      </View>
      <View 
        className="w-2/3 justify-center items-center mt-10"
      >
        <TouchableOpacity
            className="bg-[#0782F9] w-full p-4 rounded-lg items-center"
            onPress={handleLoginIn}
        >
            <Text
                className="font-bold text-xl"
            >Login</Text>
        </TouchableOpacity>
        <View className="flex-row justify-evenly mt-4">
          <Text
                  className="font-bold"
                  onPress={handlerCrear}
              >No tienes cuenta aun? Register</Text>
        </View>            
      </View>
    </SafeAreaView>
  )
}

export default Login
