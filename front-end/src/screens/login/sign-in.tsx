import { useState } from "react";
import { Image, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { Dimensions, SafeAreaView, Text, TextInput, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import User from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const { height } = Dimensions.get('window')

const SingIng = () => {
    const [showField, setShowField] = useState({
        email: "",
        senha: "",
        name: "",
        confirmar: "",
        nameBool: true,
        emailBool: true,
        senhaBool: true,
        confirmarSenhaBool: true
    });

    const handleFieldFocus = (field: string) => {
        if (field === "email") {
            setShowField((prev) => ({
                ...prev,
                emailBool: false
            }));
        } else if (field === "senha") {
            setShowField((prev) => ({
                ...prev,
                senhaBool: false
            }));
        } else if (field === "name") {
            setShowField((prev) => ({
                ...prev,
                nameBool: false
            }));
        } else if (field === "confirmarSenha") {
            setShowField((prev) => ({
                ...prev,
                confirmarSenhaBool: false
            }));
        }
    };

    const handleFieldBlur = (field: string) => {
        if (field === "email" && showField.email === "") {
            setShowField((prev) => ({
                ...prev,
                emailBool: true
            }));
        } else if (field === "senha" && showField.senha === "") {
            setShowField((prev) => ({
                ...prev,
                senhaBool: true
            }));
        } else if (field === "name" && showField.name === "") {
            setShowField((prev) => ({
                ...prev,
                nameBool: true
            }));
        } else if (field === "confirmarSenha" && showField.confirmar === "") {
            setShowField((prev) => ({
                ...prev,
                confirmarSenhaBool: true
            }));
        }
    };

    const handleFieldChange = (text: string, field: string) => {
        if (field === "email") {
            setShowField((prev) => ({
                ...prev,
                email: text
            }));
        } else if (field === "senha") {
            setShowField((prev) => ({
                ...prev,
                senha: text
            }));
        } else if (field === "name") {
            setShowField((prev) => ({
                ...prev,
                name: text
            }));
        } else if (field === "confirmarSenha") {
            setShowField((prev) => ({
                ...prev,
                confirmar: text
            }));
        }
    };


    return (
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
                    <Text style={styles.loginText}>Criar Conta</Text>
                </View>

                <View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Nome</Text>
                        <View style={styles.inputWrapper}>
                            <User name="user" size={20} color="#373737" />
                            {showField.nameBool && (
                                <Text style={styles.placeholderText}>Gabriela Oliveira</Text>
                            )}
                            <TextInput
                                placeholderTextColor="#373737"
                                style={styles.textInput}
                                onFocus={() => handleFieldFocus('name')}
                                onBlur={() => handleFieldBlur('name')}
                                onChangeText={(e) => handleFieldChange(e, 'name')}
                                value={showField.name}
                            />
                        </View>
                    </View>

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
                                    secureTextEntry={true}
                                    onFocus={() => handleFieldFocus('senha')}
                                    onBlur={() => handleFieldBlur('senha')}
                                    onChangeText={(e) => handleFieldChange(e, 'senha')}
                                    value={showField.senha}
                                />
                            </View>

                            <View style={[styles.inputWrapper, { marginTop: 10 }]}>
                                <Icon name="lock-outline" size={20} color="#373737" />
                                {showField.confirmarSenhaBool && (
                                    <Text style={[styles.placeholderText, { bottom: 12 }]}>confirmar senha</Text>
                                )}
                                <TextInput
                                    placeholderTextColor="#000"
                                    style={styles.textInput}
                                    secureTextEntry={true}
                                    onFocus={() => handleFieldFocus('confirmarSenha')}
                                    onBlur={() => handleFieldBlur('confirmarSenha')}
                                    onChangeText={(e) => handleFieldChange(e, 'confirmarSenha')}
                                    value={showField.confirmar}
                                />
                            </View>
                        </View>
                    </View>

                    <LinearGradient
                        colors={['#161616', '#333333', '#999999']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.loginButton}
                    >
                        <TouchableOpacity style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>Cadastrar</Text>
                            <Icon name="arrow-right" size={25} color="#fff" />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        height: "100%",
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
        marginBottom: 10
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

export default SingIng;