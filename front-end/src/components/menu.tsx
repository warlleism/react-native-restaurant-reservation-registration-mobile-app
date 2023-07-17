import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Food from "react-native-vector-icons/Ionicons";
import { MenuItem, MenuText } from "../styled/styleds";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

interface IProps {
  value: boolean;
  setValue: (value: boolean) => void;
  img: string;
  nome: string;
}

const Menu: React.FC<IProps> = ({ value, setValue, img, nome }) => {
  const [posicao] = useState(new Animated.Value(3200));
  const navigation = useNavigation();

  useEffect(() => {
    if (value == true) {
      Animated.timing(posicao, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(posicao, {
        toValue: 3200,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [value]);

  const Logout = () => {
    AsyncStorage.clear()
      .then(() => {
        console.log("Dados do AsyncStorage limpos com sucesso!");
      })
      .catch((error) => {
        console.log("Erro ao limpar os dados do AsyncStorage:", error);
      });
    navigation.navigate("/" as never);
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: posicao }] }]}
    >
      <View
        style={{
          justifyContent: "space-evenly",
          overflow: "hidden",
          alignItems: "flex-start",
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          width: "90%",
          paddingHorizontal: 20,
          height: "100%",
          backgroundColor: "#f2f2f2",
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => setValue(false)}
          style={styles.closeButton}
        >
          <Icon name="close" size={26} color={"#fff"} />
        </TouchableOpacity>
        <View style={styles.menuContainer}>
          <View>
            <View style={styles.userInfoContainer}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  borderWidth: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#151515",
                }}
              >
                <Image
                  source={{ uri: `data:image/png;base64,${img}` }}
                  style={styles.profileImage}
                />
              </View>
              <View>
                <Text style={styles.userName}>{nome}</Text>
              </View>
            </View>

            <View style={styles.menuItems}>
              <MenuItem>
                <Icon name="user" size={23} color={"#535252"} />
                <MenuText>Perfil</MenuText>
              </MenuItem>

              <MenuItem
                onPress={() => navigation.navigate("reservas" as never)}
              >
                <Food
                  name="md-restaurant-outline"
                  size={23}
                  color={"#535252"}
                />
                <MenuText>Reservas</MenuText>
              </MenuItem>

              <MenuItem>
                <Icon name="setting" size={23} color={"#535252"} />
                <MenuText>Configurações</MenuText>
              </MenuItem>

              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}></Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.logoutContainer}
            onPress={() => Logout()}
          >
            <Icon name="logout" size={23} color={"#535252"} />
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    overflow: "hidden",
    alignItems: "flex-end",
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#00000061",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#151515",
  },
  backgroundImage: {
    width: "200%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  closeButton: {
    alignSelf: "flex-start",
    borderWidth: 2,
    borderColor: "#53525269",
    backgroundColor: "#000000c7",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    marginLeft: 10,
    height: 44,
  },
  menuContainer: {
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    height: "80%",
    alignSelf: "center",
    width: "90%",
    paddingVertical: 20,
  },
  userInfoContainer: {
    gap: 16,
    zIndex: 3,
    marginLeft: 16,
    display: "flex",
    marginBottom: 50,
    alignItems: "center",
    flexDirection: "row",
  },
  userImage: {
    borderWidth: 2,
    borderColor: "#535252",
    width: 58,
    height: 60,
    borderRadius: 100,
  },
  userName: {
    fontWeight: "600",
    color: "#0F0F0F",
    letterSpacing: -1,
    fontSize: 19,
  },
  userRole: {
    fontWeight: "400",
    color: "#535252",
    fontSize: 16,
  },
  menuItems: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    marginLeft: 16,
    zIndex: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  menuText: {
    fontWeight: "600",
    color: "#0F0F0F",
    fontSize: 15,
  },
  logoutContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 16,
  },
  logoutText: {
    fontWeight: "500",
    color: "#0F0F0F",
    fontSize: 19,
  },
});

export default Menu;
