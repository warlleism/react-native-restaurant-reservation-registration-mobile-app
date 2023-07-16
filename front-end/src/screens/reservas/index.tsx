import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import Arrow from "react-native-vector-icons/AntDesign";
import { ActivityIndicator } from "react-native";
import { InfoText, ViewStyledReservas } from "../../styled/styleds";
import useFetchReservas from "../../hooks/getAllReservas";

const Reservas = () => {
  const navigation = useNavigation();
  const [fanily, setFanily] = useState<boolean>(false);
  const { itens, isLoading, setEndDelete, endDelete } = useFetchReservas();

  //Lógica responsável por deletar uma reserva
  const deleteReserva = async (id: number) => {
    console.log(id);
    setFanily(true);
    const OptionsRegister = {
      data: { id: id },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setFanily(true);
      const response = await axios(
        "http://192.168.1.153:8080/deleteReserva",
        OptionsRegister
      );
      setTimeout(() => {
        setFanily(false);
        setEndDelete(!endDelete);
      }, 1000);
    } catch (error) {
      setFanily(false);
      console.log("Erro na requisição:", error, error);
      setEndDelete(!endDelete);
    }
  };

  return (
    <>
      {fanily && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size={100} color="#fff" />
        </View>
      )}
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("home" as never)}
          >
            <Arrow
              name="arrowleft"
              size={25}
              color="#fff"
              style={styles.headerButtonIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Reservas</Text>
          <View />
        </View>

        <View style={styles.reservasContainer}>
          {itens.map((e) => {
            return (
              <ViewStyledReservas key={e?.id}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `data:image/png;base64,${e?.img_restaurente}`,
                  }}
                />
                <View style={styles.itemContainer}>
                  <View style={styles.infoContainer}>
                    <View>
                      <Text style={styles.restaurantName}>
                        {e?.nome_restaurante}
                      </Text>
                    </View>
                    <View>
                      <InfoText>Data: {e?.data}</InfoText>
                      <InfoText>Hora: {e?.hora}</InfoText>
                      <InfoText>Mesa: {e?.numero}</InfoText>
                      <Text style={styles.descricaoText}>
                        Descrição: {e?.descricao}
                      </Text>
                      <TouchableOpacity onPress={() => deleteReserva(e?.id)}>
                        <Text style={styles.cancelText}>Cancelar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ViewStyledReservas>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    backgroundColor: "#0000006b",
    zIndex: 13,
    position: "absolute",
    top: 0,
    height: "100%",
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
  },
  scrollView: {
    padding: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: "#00000061",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  headerButtonIcon: {
    zIndex: 10,
  },
  headerText: {
    color: "#000",
    fontSize: 30,
    fontWeight: "800",
  },
  reservasContainer: {
    borderRadius: 10,
    display: "flex",
    marginTop: 50,
    marginBottom: 30,
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: "100%",
    borderRadius: 10,
  },
  itemContainer: {
    marginBottom: 26,
    flexDirection: "row",
    height: 150,
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  restaurantName: {
    color: "#000000bf",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -1,
  },
  infoText: {
    color: "#000000bf",
    fontSize: 13,
  },
  descricaoText: {
    color: "#000000bf",
    fontSize: 13,
    letterSpacing: -0.9,
  },
  cancelText: {
    fontWeight: "800",
    color: "#000000bf",
  },
});

export default Reservas;
