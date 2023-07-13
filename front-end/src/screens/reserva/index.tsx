import React, { useContext, useEffect, useState } from "react"
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'
import { AppContext } from "../../context/Provider";
import { useNavigation } from "@react-navigation/native";
import Arrow from 'react-native-vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const { height, width } = Dimensions.get('screen')

interface IFormulario {
    id_usuario: number;
    id_mesa: number;
    id_restaurante: number;
    data: string;
    hora: string;
    quantidade_pessoas: number;
}

interface IHorario {
    horario: string;
    select: boolean
}

const Reserva = () => {

    const { data, setData } = useContext(AppContext);
    const [selectedDia, setSelectedDia] = useState('semana');
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const navigation = useNavigation();
    const [mesas, setMesas] = useState([])
    const [horariosSem, setHorarioSem] = useState<IHorario[]>([{ horario: '', select: false },]);
    const [horariosFim, setHorariosFim] = useState<IHorario[]>([{ horario: '', select: false }]);
    const [formulario, setFormulario] = useState<IFormulario[] | any>([
        {
            id_usuario: 0,
            id_mesa: 0,
            id_restaurante: 0,
            data: '',
            hora: '',
            quantidade_pessoas: 0
        }
    ])

    const handlerSubmit = async () => {

        const isEmptyOrZero = Object.values(formulario).some((campo) => {
            return campo === '' || campo === 0;
        });

        if (isEmptyOrZero) {
            Alert.alert('Todos campos devem ser preenchidos')
            console.log('Preencha todos os campos do formulário.');
            return;
        }

        const storedToken = await AsyncStorage.getItem('dados');
        if (storedToken !== null) {
            const parsedToken = JSON.parse(storedToken);
            const token = parsedToken.token;

            const OptionsRegister = {
                data: formulario,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };

            try {
                const response = await axios('http://192.168.1.153:8080/novaReserva', OptionsRegister);
                const data = response.data;
                if (response.status === 200) {
                    Alert.alert('Reserva feita com sucesso!')
                    console.log(data.sucess);
                } else {
                    console.log('Requisição não retornou status 200.');
                }
            } catch (error) {
                Alert.alert('Reserva já solicitada. Desculpa!')
                console.log('Erro na requisição:', error, error);
            }
        }
    };




    useEffect(() => {

        const fetchData = async () => {
            const OptionsRegister = {
                id: data.id,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            try {
                const response = await axios.post('http://192.168.1.153:8080/mesa', OptionsRegister);
                setMesas(response.data.data)
            } catch (error) {
                console.error(error);
            }
        };
        const filterSem = data?.horarioSem.split(',')
        const horariosSemObjetos = filterSem.map(horario => ({
            horario,
            select: false,
        }));
        setHorariosFim(horariosSemObjetos);
        const filterFimSem = data?.horarioFimSem.split(',')
        const horariosObjetos = filterFimSem.map(horario => ({
            horario,
            select: false,
        }));
        setHorarioSem(horariosObjetos);
        const setDefaultValue = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('dados');

                if (storedToken !== null) {
                    const parsedToken = JSON.parse(storedToken);
                    const id = parsedToken.id;

                    setFormulario({
                        id_usuario: id,
                        id_mesa: 0,
                        id_restaurante: data.id,
                        data: '',
                        hora: "",
                        quantidade_pessoas: 0
                    })

                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData()
        setDefaultValue();
    }, [])

    const handleClickHorario = (horario: string, data: string) => {
        if (data === "semana") {
            const updatedHorariosSem = horariosSem.map((item) => {
                if (item.horario === horario) {

                    setFormulario({ ...formulario, hora: horario })

                    return {
                        ...item,
                        select: true,

                    };
                }
                if (item.horario !== horario) {
                    return {
                        ...item,
                        select: false
                    };
                }
                return item;
            });
            setHorarioSem(updatedHorariosSem);
        } else {
            const updatedHorariosFimSem = horariosFim.map((item) => {
                if (item.horario === horario) {

                    setFormulario({ ...formulario, hora: horario })

                    return {
                        ...item,
                        select: true
                    };
                }
                if (item.horario !== horario) {
                    return {
                        ...item,
                        select: false
                    };
                }
                return item;
            });
            setHorariosFim(updatedHorariosFimSem);
        }
    };

    const handlerData = (data: Date) => {
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = (data.getMonth() + 1).toString().padStart(2, '0');
        const ano = data.getFullYear().toString();
        const dataFormatada = `${dia}-${mes}-${ano}`;
        setFormulario({ ...formulario, data: dataFormatada })
    }

    return (
        <View style={{ flex: 1, height: "100%" }}>
            <TouchableOpacity style={styles.header} onPress={() => navigation.navigate("detail" as never)}>
                <Arrow name="arrowleft" size={25} color="#fff" style={{ zIndex: 10 }} />
            </TouchableOpacity>


            <Image source={{ uri: `data:image/jpg;base64,${data?.img1}` }} style={{
                top: 0,
                zIndex: 8,
                height: '60%',
                width: "100%",
                position: "absolute",
            }} />


            <ScrollView style={{
                backgroundColor: "#fff",
                width: "100%",
                height: "60%",
                zIndex: 9,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
                position: "absolute",
                padding: 20,
                bottom: 0
            }}>

                <View style={{
                    height: 130,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: 16
                }}>
                    <View style={{
                        width: '45%',
                        height: 70,
                        marginBottom: 46
                    }}>
                        <Text style={{ color: '#000', marginBottom: 6, fontWeight: "700" }}>Dia</Text>
                        <Picker
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 10,
                                backgroundColor: "#151515",
                                justifyContent: "center",
                            }}
                            selectedValue={selectedDia}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedDia(itemValue)
                            }>
                            <Picker.Item style={{ fontSize: 15, color: "#fff" }} label="Seg / Sex" value="semana" />
                            <Picker.Item style={{ fontSize: 15, color: "#fff" }} label="Sab / Dom" value="fimSemana" />
                        </Picker>
                    </View>

                    <View style={{
                        width: '45%',
                        height: 70,
                        marginBottom: 46
                    }}>
                        <Text style={{ color: '#000', marginBottom: 6, fontWeight: "700" }}>Data</Text>
                        <TouchableOpacity onPress={() => setOpen(true)}
                            style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: "#151515",
                                justifyContent: "center",
                            }}>

                            <View style={{
                                height: "100%",
                                width: "100%",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                                bottom: 0
                            }}>
                                <Arrow name="calendar" size={25} color="#fff" style={{ zIndex: 10, marginBottom: 5, pointerEvents: 'none' }} />
                                <Text style={{ color: "#fff", fontWeight: "500", pointerEvents: 'none' }}>{formulario?.data}</Text>
                            </View>
                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                onConfirm={(date) => {
                                    handlerData(date)
                                    setOpen(false)
                                    setDate(date)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{
                    height: 130,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: 16
                }}>
                    <View style={{
                        width: '45%',
                        height: 70,
                        marginBottom: 46
                    }}>
                        <Text style={{ color: '#000', marginBottom: 6, fontWeight: "700" }}>Cadeiras</Text>
                        <Picker
                            style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: "#151515",
                                justifyContent: "center",
                            }}
                            selectedValue={formulario.quantidade_pessoas}
                            onValueChange={(itemValue, itemIndex) =>
                                setFormulario({ ...formulario, quantidade_pessoas: itemValue })
                            }>
                            <Picker.Item style={{ fontSize: 15, color: "#fff" }} label="cadeiras" value="" />
                            <Picker.Item style={{ fontSize: 15, color: "#fff" }} label="1" value="1" />
                            <Picker.Item style={{ fontSize: 15, color: "#fff" }} label="2" value="2" />
                            <Picker.Item style={{ fontSize: 15, color: "#fff" }} label="3" value="3" />
                            <Picker.Item style={{ fontSize: 15, color: "#fff" }} label="4" value="4" />
                            <Picker.Item style={{ fontSize: 15, color: "#fff" }} label="5" value="5" />
                            <Picker.Item style={{ fontSize: 15, color: "#fff" }} label="6" value="6" />
                            <Picker.Item style={{ fontSize: 15, color: "#fff" }} label="7" value="7" />
                        </Picker>
                    </View>

                    <View style={{
                        width: '45%',
                        height: 70,
                        marginBottom: 46
                    }}>
                        <Text style={{ color: '#000', marginBottom: 6, fontWeight: "700" }}>Mesa</Text>
                        <Picker
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: 10,
                                backgroundColor: "#151515",
                                justifyContent: "center",
                            }}
                            selectedValue={formulario?.id_mesa}
                            onValueChange={(itemValue, itemIndex) =>
                                setFormulario({ ...formulario, id_mesa: itemValue })
                            }>
                            {
                                mesas.map((e: any) => {
                                    return (
                                        <Picker.Item key={e?.id} style={{ fontSize: 15, color: "#fff" }} label={`Número: ${e?.numero}: Descrição: ${e?.descricao}`} value={e?.id} />
                                    )
                                })
                            }
                        </Picker>
                    </View>

                </View>

                {
                    selectedDia === 'semana'
                        ?
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "#000", fontWeight: '600', fontSize: 20, width: "100%" }}>Seg / Sex</Text>
                            <View style={{
                                flexDirection: "row",
                                width: '100%',
                                gap: 3,
                                alignSelf: "center",
                                flexWrap: "wrap",
                                marginTop: 20
                            }}>
                                {
                                    horariosSem?.map((e: any) => {
                                        return (
                                            <TouchableOpacity
                                                key={e.horario}
                                                style={{
                                                    width: width - 800,
                                                    alignItems: "center",
                                                    backgroundColor: e.select ? "#000" : "#f2f2f2",
                                                    borderRadius: 10,
                                                    paddingHorizontal: 40,
                                                    paddingVertical: 20,
                                                    marginBottom: 10
                                                }}
                                                onPress={() => handleClickHorario(e.horario, 'semana')}
                                            >
                                                <Text style={{ color: e.select ? "#f2f2f2" : "#000" }}>{e.horario}</Text>
                                            </TouchableOpacity>
                                        );
                                    })
                                }
                            </View>
                        </View>
                        :
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "#000", fontWeight: '600', fontSize: 20, width: "100%" }}>Sab / Dom</Text>
                            <View style={{
                                width: '100%',
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignSelf: "center",
                                flexWrap: "wrap",
                                marginTop: 20
                            }}>
                                {
                                    horariosFim?.map((e) => {
                                        return (
                                            <TouchableOpacity
                                                key={e.horario}
                                                style={{
                                                    width: width - 800,
                                                    alignItems: "center",
                                                    backgroundColor: e.select ? "#000" : "#f2f2f2",
                                                    borderRadius: 10,
                                                    paddingHorizontal: 40,
                                                    paddingVertical: 20,
                                                    marginBottom: 10
                                                }}
                                                onPress={() => handleClickHorario(e.horario, 'fim')}
                                            >
                                                <Text style={{ color: e.select ? "#f2f2f2" : "#000" }}>{e.horario}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        </View>
                }

                <TouchableOpacity style={styles.buttonContainer} onPress={() => handlerSubmit()}>
                    <Text style={styles.buttonText}>Reservar</Text>
                </TouchableOpacity>

            </ScrollView>

        </View>
    );
}


const styles = StyleSheet.create({

    buttonContainer: {
        width: '90%',
        height: 120,
        marginBottom: 40,
        marginVertical: 20,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#151515',
        borderRadius: 30,
    },
    buttonText: {
        fontSize: 50,
        letterSpacing: -2,
        fontWeight: '800',
        color: '#fff',
    },
    header: {
        top: 20,
        zIndex: 10,
        left: 10,
        width: 40,
        height: 40,
        backgroundColor: "#00000061",
        borderRadius: 100,
        marginBottom: 24,
        position: "absolute",
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Reserva;