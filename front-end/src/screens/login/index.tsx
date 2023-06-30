import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Dimensions, SafeAreaView, Text, TextInput, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const { height } = Dimensions.get('window')

const Login = () => {

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
                        <View style={styles.passwordContainer}>
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
                            <Text>Esqueceu sua senha?</Text>
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
                <TouchableOpacity>
                    <Text style={styles.signupLink}> Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        height: height,
        paddingHorizontal: 40,
        backgroundColor: "#f9f6ee30",
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
        marginBottom: 10
    },
    inputLabel: {
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
        width: "90%"
    },
    passwordContainer: {
        flexDirection: "column",
        backgroundColor: '#fff',
        justifyContent: "space-around",
        borderRadius: 10,
        elevation: 4,
        marginTop: 20,
        paddingHorizontal: 10
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