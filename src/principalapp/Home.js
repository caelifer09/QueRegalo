import { Text, SafeAreaView, TouchableOpacity, View, Alert, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { auth } from '../config/firebase'
import { signOut } from "firebase/auth";
import generateText from '../config/openai';


const Home = () => {
  const navigation = useNavigation()
  const user = auth.currentUser
  const [persona, setPersona] = useState('')
  const [edad, setEdad] = useState('')
  const [gusto, setGusto] = useState('')

  function checkEmptyStates(states) {
    for (let state of states) {
      if (state === null || state === undefined || state === '') {
        return true;
      }
    }
    return false; 
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Home")
      })
      .catch(error => Alert.alert("algo salio mal", error.message))
  }

  const Consultar = async () => {
    const emptyStates = checkEmptyStates([persona, edad, gusto]);
    if (emptyStates) {
      Alert.alert("Faltan datos", 'Alguno de los estados está vacío');
      return
    }
    const prompt = `necesito 3 idead de regalo para mi ${persona} que tiene la edad de ${edad} años y sus guston son ${gusto}`
    const resp = await generateText(prompt)
    if (resp) {
      setPersona('')
      setEdad('')
      setGusto('')
      navigation.navigate('Resultado', {text: resp})
    } else {
      Alert.alert("algo salio mal", "algo fallo")
    }
  }

  return (
    <SafeAreaView
      className="flex-1 justify-start items-center mt-2"
    >
      <View
        className="flex-row w-full items-center justify-between"
      > 
        <Text className="font-bold">Bienvenido: {user.displayName}</Text>
          <TouchableOpacity
                className="bg-[#0782F9] p-1 rounded-lg items-center"
                onPress={handleSignOut}
            >
                <Text
                    className="font-bold text-sm"
                >Logout</Text>
            </TouchableOpacity>
      </View>
      <View className="flex-col justify-start items-center w-full h-1/2 p-2">
        <View className="w-full items-center mt-1">
          <Text>estoy buscando un regalo para:</Text>
          <TextInput 
            placeholder="madre, padre, esposo..."
            value={persona}
            onChangeText={text => setPersona(text)}
           className="bg-white p-2 rounded-lg mt-1 w-full"
          />
        </View>
        <View className="w-full items-center mt-1">
        <Text>que tiene una edad de :</Text>
          <TextInput 
            placeholder="ingresa su edad"
            keyboardType='numeric'
            value={edad}
            onChangeText={text => setEdad(text)}
            className="bg-white p-2 rounded-lg mt-1 w-full"
          />
        </View>
        <View className="w-full items-center mt-1">
        <Text>disfruta de:</Text>
          <TextInput 
            placeholder="pasa tiempos, gustos..."
            value={gusto}
            onChangeText={text => setGusto(text)}
            className="bg-white p-2 rounded-lg mt-1 w-full"
          />
        </View>
          <TouchableOpacity
                className="w-1/2 bg-blue-200 py-2 px-4 mt-5 rounded-lg items-center"
                onPress={Consultar}
            >
                <Text
                    className="font-bold text-sm"
                >Buscar</Text>
            </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Home

