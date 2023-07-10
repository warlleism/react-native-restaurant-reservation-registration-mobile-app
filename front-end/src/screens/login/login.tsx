import { useState } from "react";
import { Animated, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Dimensions, SafeAreaView, Text, TextInput, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import SingIng from "./sign-in";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

const { height } = Dimensions.get('window')

const Login = () => {

    const { control, handleSubmit, formState: { errors } } = useForm();

    const [posicao] = useState(new Animated.Value(3200))

    const navigation = useNavigation();

    const [showField, setShowField] = useState({
        email: '',
        emailBool: true,
        senha: '',
        senhaBool: true
    })

    const Login = async () => {

        const OptionsRegister = {
            data: { email: showField.email, senha: showField.senha },
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await axios('http://192.168.1.153:8080/login', OptionsRegister);
            const data = response.data;
            console.log(data)
            if (response.status === 200) {
                await AsyncStorage.setItem('token', data.token);
                console.log('Token definido com sucesso!');
                navigation.navigate('home' as never);
            } else {
                console.log('Requisição não retornou status 200.');
            }
        } catch (error) {
            console.log('Erro na requisição:', error, 'Email ou senha incorretos');
        }
    };


    const handleFieldFocus = (field: string) => {
        if (field === "email") {
            setShowField((prevent) => ({
                ...prevent,
                emailBool: false
            }))
        } else {
            setShowField((prevent) => ({
                ...prevent,
                senhaBool: false
            }))
        }
    };

    const handleFieldBlur = (field: string) => {
        if (field === 'email' && showField.email === '') {
            setShowField((prev) => ({ ...prev, emailBool: true }));
        } else if (field === 'senha' && showField.senha === '') {
            setShowField((prev) => ({ ...prev, senhaBool: true }));
        }
    };

    const handleFieldChange = (text: string, field: string) => {
        if (field === "email") {
            setShowField((prevent) => ({
                ...prevent,
                email: text
            }))
        } else {
            setShowField((prevent) => ({
                ...prevent,
                senha: text
            }))
        }
    };

    const setAnimation = (value: number) => {
        Animated.timing(
            posicao,
            {
                toValue: value,
                duration: 500,
                useNativeDriver: true
            }
        ).start()
    }

    const onSubmit = (data: any) => {
        setShowField(data);
        Login();
    };

    return (
        <>
            <Animated.View style={{
                width: '100%',
                position: "absolute",
                zIndex: 9999,
                top: 0,
                backgroundColor: "#FAF8F6",
                height: '100%',
                transform: [{ translateX: posicao }]
            }}>
                <TouchableOpacity style={{
                    position: "absolute",
                    top: 30,
                    left: 30,
                    zIndex: 3
                }} onPress={() => setAnimation(3200)}>
                    <Icon name="arrow-left" size={35} color="#161616" />
                </TouchableOpacity>
                <SingIng />
            </Animated.View>

            <SafeAreaView style={styles.safeAreaView}>

                <Image
                    source={require('../../../assets/blob1.png')}
                    style={{
                        position: "absolute",
                        left: 100,
                        top: height - 940
                    }} />

                <Image
                    source={require('../../../assets/blob1.png')}
                    style={{
                        position: "absolute",
                        right: 100,
                        bottom: height - 1000
                    }} />
                <View style={styles.container}>
                    <View>
                        <Text style={styles.loginText}>Login</Text>
                        <Text style={styles.loginSubtitle}>Façaa login para continuar.</Text>
                    </View>

                    <View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <View style={styles.inputWrapper}>
                                <Icon name="email-outline" size={20} color="#373737" />
                                {showField.emailBool && (
                                    <Text style={styles.placeholderText}>usuario132@gmail.com</Text>
                                )}
                                <Controller
                                    control={control}
                                    name="email"
                                    defaultValue=""
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            placeholderTextColor="#373737"
                                            style={styles.textInput}
                                            onFocus={() => handleFieldFocus('email')}
                                            onBlur={() => {
                                                onBlur();
                                                handleFieldBlur('email');
                                            }}
                                            onChangeText={value => {
                                                onChange(value);
                                                handleFieldChange(value, 'email');
                                            }}
                                            value={value}
                                        />
                                    )}
                                />
                            </View>
                        </View>
                        {errors.email && <Text style={{ color: "#000" }}>Precisa ser preenchido.</Text>}

                        <View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Senha</Text>
                                <View style={styles.inputWrapper}>
                                    <Icon name="lock-outline" size={20} color="#373737" />
                                    {showField.senhaBool && (
                                        <Text style={[styles.placeholderText, { bottom: 12 }]}>*********</Text>
                                    )}
                                    <Controller
                                        control={control}
                                        name="senha"
                                        defaultValue=""
                                        rules={{ required: true }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <TextInput
                                                placeholderTextColor="#373737"
                                                style={styles.textInput}
                                                onFocus={() => handleFieldFocus('senha')}
                                                onBlur={() => {
                                                    onBlur();
                                                    handleFieldBlur('senha');
                                                }}
                                                onChangeText={value => {
                                                    onChange(value);
                                                    handleFieldChange(value, 'senha');
                                                }}
                                                value={value}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 10 }}>
                                <Text style={{ color: "#161616" }}>Esqueceu sua senha?</Text>
                            </TouchableOpacity>
                        </View>
                        {errors.senha && <Text style={{ color: "#000" }}>Precisa ser preenchido.</Text>}

                        <LinearGradient
                            colors={['#161616', '#333333', '#999999']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.loginButton}
                        >
                            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(onSubmit as never)}>
                                <Text style={styles.loginButtonText}>LOGIN</Text>
                                <Icon name="arrow-right" size={25} color="#fff" />
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>

                <View style={styles.signupContainer}>
                    <Text style={{ color: "#2b2b2b" }}>não tem uma conta?</Text>
                    <TouchableOpacity onPress={() => setAnimation(0)}>
                        <Text style={styles.signupLink}> Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        height: '100%',
        paddingHorizontal: 40,
        backgroundColor: "#FAF8F6",
        justifyContent: "center"
    },
    container: {
        height: 400,
        alignSelf: "center",
    },
    loginText: {
        fontSize: 35,
        fontWeight: "800",
        color: "#000"
    },
    loginSubtitle: {
        fontSize: 15,
        fontWeight: "500",
        color: "#41414185",
        marginTop: 10
    },
    inputContainer: {
        flexDirection: "column",
        backgroundColor: '#fff',
        justifyContent: "space-around",
        borderRadius: 10,
        elevation: 4,
        marginTop: 40,
        paddingHorizontal: 10,
    },
    inputLabel: {
        color: "#000",
        fontSize: 12,
        marginLeft: 20,
        marginTop: 10,
        marginBottom: -10
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%"
    },
    placeholderText: {
        position: "absolute",
        fontWeight: "800",
        color: "#00000082",
        left: '9%',
        bottom: '32%',
        pointerEvents: "none"
    },
    textInput: {
        color: "#000",
        width: "90%"
    },
    loginButton: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        justifyContent: "center",
        width: 130,
        height: 50,
        marginTop: 30,
        elevation: 5,
        borderRadius: 100
    },
    loginButtonText: {
        fontSize: 15,
        color: "#fff",
        marginRight: 5
    },
    signupContainer: {
        bottom: 20,
        position: "absolute",
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center"
    },
    signupLink: {
        color: "#161616",
        fontWeight: "700"
    }
});

export default Login;