import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import Search from 'react-native-vector-icons/AntDesign';
import Drink from 'react-native-vector-icons/Entypo';

interface IRestaurante {
  id: number;
  nome: string;
  aberto: string;
  horarioSem: string;
  horarioFimSem: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  img5: string;
  descricao: string;
  capacidade_maxima_reservas: number;
}


function Home() {

  const navigation = useNavigation();
  const [data, setData] = useState<IRestaurante[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');

        if (storedToken) {
          const headers = {
            Authorization: `Bearer ${storedToken}`,
          };

          const response = await axios.get(
            'http://192.168.1.153:8080/todosRestaurantes',
            { headers }
          );

          setData(response.data.data)
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Encontre os Melhores</Text>
          <Text style={[styles.title, { color: "#000" }]}>Restaurantes da sua Cidade</Text>
        </View>
        <TouchableOpacity>
          <Image source={require('../../../assets/user.png')} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Search name='search1' size={30} color={"#525252"} style={styles.searchIcon} />
        <TextInput
          placeholder='Procurar Restaurante...'
          placeholderTextColor={'#525252'}
          style={styles.searchInput}
        />
        <Drink name='drink' size={30} color={"#525252"} style={styles.drinkIcon} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>

        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Gourmet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Japonês</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Italiano</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Fast Food</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Petiscos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Bebidas</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.restaurantContainer}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantHeaderText}>Restaurantes</Text>
          <TouchableOpacity>
            <Text style={styles.viewMoreText}>VER MAIS</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.restaurantList}>
          {data?.map(item => (
            <TouchableOpacity key={item?.id} style={styles.restaurantItem} onPress={() => navigation.navigate("detail" as never)}>
              <Image source={item.img1 as never} style={styles.restaurantImage} />
              <Text style={styles.restaurantName}>{item?.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#FFFFFF",
    height: "100%"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  title: {
    color: "#929292",
    fontSize: 26,
    letterSpacing: -2,
    fontWeight: '700'
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#151515"
  },
  searchBar: {
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: "#151515",
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 24
  },
  searchIcon: {
    width: '10%'
  },
  searchInput: {
    width: "80%"
  },
  drinkIcon: {
    width: '10%'
  },
  categories: {
    marginBottom: 24
  },
  categoryButton: {
    backgroundColor: "#151515",
    borderRadius: 15,
    paddingHorizontal: 17,
    paddingVertical: 20,
    marginRight: 10
  },
  categoryText: {
    fontWeight: "800",
    color: "#fff"
  },
  restaurantContainer: {
    width: '100%',
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,

  },
  restaurantHeaderText: {
    color: "#151515",
    fontSize: 25,
    letterSpacing: -2,
    fontWeight: "600"
  },
  viewMoreText: {
    color: "#151515",
    fontSize: 13,
    letterSpacing: -1,
    fontWeight: "700"
  },
  restaurantList: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  restaurantItem: {
    marginBottom: 16,
    width: '49%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  restaurantImage: {
    width: '100%',
    height: 120,
    borderRadius: 5
  },
  restaurantName: {
    color: "#000000",
    fontWeight: "700",
    letterSpacing: -1,
    fontSize: 15
  }
});

export default Home;
