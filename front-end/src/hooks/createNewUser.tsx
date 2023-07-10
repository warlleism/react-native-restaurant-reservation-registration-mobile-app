import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IForm } from '../interfaces/IForm';

const useCreateUser = (showField: IForm, setShowField: React.Dispatch<React.SetStateAction<IForm>>) => {
  const [error, setError] = useState<boolean>(false);
  const navigation = useNavigation();

  const createUser = async () => {
    if (!showField.email || !showField.senha || !showField.nome || !showField.foto) {
      return; // Não faz a requisição se algum campo estiver vazio
    }

    const OptionsRegister = {
      data: {
        nome: showField.nome,
        foto: showField.foto,
        email: showField.email,
        senha: showField.senha,
      },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios('http://192.168.1.153:8080/cadastrar', OptionsRegister);
      const data = response.data;
      if (response.status === 200) {
        await AsyncStorage.setItem('token', data.token);
        console.log('Token definido com sucesso!');
        navigation.navigate('home' as never);
      } else {
        console.log('Requisição não retornou status 200.');
      }
    } catch (error) {
      setError(true);
      console.log('Erro na requisição:', error, 'Email já cadastrado');
    }
  };

  return {
    error,
    createUser,
  };
};

export default useCreateUser;
