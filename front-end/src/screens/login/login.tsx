import { useState } from "react";
import { Animated, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Dimensions, SafeAreaView, Text, TextInput, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import SingIng from "./sign-in";

const { height } = Dimensions.get('window')

const Login = () => {

    const [posicao] = useState(new Animated.Value(3200))

    const [showField, setShowField] = useState({
        email: '',
        emailBool: true,
        senha: '',
        senhaBool: true
    })

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

    return (
        <>
            <Animated.View style={{
                width: '100%',
                position: "absolute",
                zIndex: 9999,
                top: 0,
                backgroundColor: "#FAF8F6",
                height: '100%',
                transform: [{ translateY: posicao }]
            }}>
                <TouchableOpacity style={{
                    position: "absolute",
                    top: 70,
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
                        <Text style={styles.loginSubtitle}>Faça login para continuar.</Text>
                    </View>

                    <View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <View style={styles.inputWrapper}>
                                <Icon name="email-outline" size={20} color="#373737" />
                                {showField.emailBool && (
                                    <Text style={styles.placeholderText}>usuario132@gmail.com</Text>
                                )}
                                <TextInput
                                    placeholderTextColor="#373737"
                                    style={styles.textInput}
                                    onFocus={() => handleFieldFocus('email')}
                                    onBlur={() => handleFieldBlur('email')}
                                    onChangeText={(e) => handleFieldChange(e, 'email')}
                                    value={showField.email}
                                />
                            </View>
                        </View>

                        <View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Senha</Text>
                                <View style={styles.inputWrapper}>
                                    <Icon name="lock-outline" size={20} color="#373737" />
                                    {showField.senhaBool && (
                                        <Text style={[styles.placeholderText, { bottom: 12 }]}>*********</Text>
                                    )}
                                    <TextInput
                                        placeholderTextColor="#000"
                                        style={styles.textInput}
                                        onFocus={() => handleFieldFocus('senha')}
                                        onBlur={() => handleFieldBlur('senha')}
                                        onChangeText={(e) => handleFieldChange(e, 'senha')}
                                        value={showField.senha}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 10 }}>
                                <Text style={{ color: "#161616" }}>Esqueceu sua senha?</Text>
                            </TouchableOpacity>
                        </View>

                        <LinearGradient
                            colors={['#161616', '#333333', '#999999']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.loginButton}
                        >
                            <TouchableOpacity style={styles.loginButton}>
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
        borderWidth: 2,
        borderColor: "#000",
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
        color: "#373737",
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