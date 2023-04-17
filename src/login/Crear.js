import { Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import React, {useState, useEffect} from 'react'
import { auth } from '../config/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";

const Crear = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const navigation = useNavigation()

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.replace("Inicio")
        }
      })
  
      return unsubscribe
    }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user
            updateProfile(user, { displayName: name})
            .then(() => {
                console.log(" usuario creado:" + user.displayName)
            })
        })
        .catch(error => Alert.alert("ups algo salio mal", error.message))
    }

  return (
    <SafeAreaView
        className="flex-1 items-center mt-20"
    > 
    <Text className="text-2xl font-bold">Bienvenido</Text>
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
        <TextInput 
            placeholder="Nombre"
            value={name}
            onChangeText={text => setName(text)}
            className="bg-white py-4 px-2 rounded-lg mt-1"            
        />
      </View>
      <View
        className="w-2/3 justify-center items-center mt-10"
      >
        <TouchableOpacity
            className="w-full p-4 rounded-lg items-center bg-white mt-1 border-[#0782F9] border-2"
            onPress={handleSignUp}
        >
            <Text
                className="font-bold text-xl"
            >Create</Text>
        </TouchableOpacity>
      </View>
      <Text className="font-bold mt-4" onPress={() => navigation.replace("Home")}>ya tienes cuenta? inicia sesion</Text>
    </SafeAreaView>
  )
}

export default Crear

