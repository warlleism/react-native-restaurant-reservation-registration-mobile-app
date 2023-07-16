import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ImageSourcePropType,
  StyleSheet,
  Button,
} from "react-native";
import Arrow from "react-native-vector-icons/AntDesign";
import { AppContext } from "../../context/Provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ButtonContainer, ButtonText } from "../../styled/styleds";

const { height } = Dimensions.get("window");

const Detail = () => {
  const navigation = useNavigation();
  const [centerImg, setCenterImg] = useState();
  const { data, setData } = useContext(AppContext);
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    const getUserId = async () => {
      const storedToken = await AsyncStorage.getItem("dados");
      if (storedToken !== null) {
        const parsedToken = JSON.parse(storedToken);
        const id = parsedToken.id;
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    getUserId();
  }, []);

  return (
    <View style={{ height: "100%", padding: 15 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate("home" as never)}
            >
              <Arrow name="arrowleft" size={30} color="#33363F" />
            </TouchableOpacity>
            <Text style={styles.title}>{data?.nome}</Text>
            <View />
          </View>

          {centerImg ? (
            <Image
              source={{ uri: `data:image/jpg;base64,${centerImg}` }}
              style={styles.image}
            />
          ) : (
            <Image
              source={{ uri: `data:image/jpg;base64,${data?.img1}` }}
              style={styles.image}
            />
          )}
          <View style={styles.thumbnailContainer}>
            <TouchableOpacity
              onPress={() => setCenterImg(data?.img1 as never)}
              style={styles.thumbnail}
            >
              <Image
                source={{ uri: `data:image/jpg;base64,${data?.img1}` }}
                style={styles.thumbnailImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCenterImg(data?.img2 as never)}
              style={styles.thumbnail}
            >
              <Image
                source={{ uri: `data:image/jpg;base64,${data?.img2}` }}
                style={styles.thumbnailImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCenterImg(data?.img3 as never)}
              style={styles.thumbnail}
            >
              <Image
                source={{ uri: `data:image/jpg;base64,${data?.img3}` }}
                style={styles.thumbnailImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCenterImg(data?.img4 as never)}
              style={styles.thumbnail}
            >
              <Image
                source={{ uri: `data:image/jpg;base64,${data?.img4}` }}
                style={styles.thumbnailImage}
              />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.title}>{data?.nome}</Text>
            <Text style={styles.description}>{data?.descricao}</Text>
          </View>
        </View>
      </ScrollView>

      {showButton ? (
        <ButtonContainer
          onPress={() => navigation.navigate("reservar" as never)}
        >
          <ButtonText>Reservar</ButtonText>
        </ButtonContainer>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    letterSpacing: -1,
    color: "#000000",
    fontWeight: "600",
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 16,
    borderRadius: 10,
  },
  thumbnailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 24,
  },
  thumbnail: {
    width: "23%",
    height: 60,
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    color: "#000",
  },
});

export default Detail;
