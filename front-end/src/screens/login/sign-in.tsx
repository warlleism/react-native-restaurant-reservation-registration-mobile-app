import { useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView, Text, TextInput, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import User from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import useCreateUser from "../../hooks/createNewUser";
import { IForm } from "../../interfaces/IForm";


const SingIng = () => {

    const [showField, setShowField] = useState<IForm>({
        email: "",
        senha: "",
        nome: "",
        confirmar: "",
        foto: '',
        nameBool: true,
        emailBool: true,
        senhaBool: true,
        confirmarSenhaBool: true
    });

    const { error, createUser } = useCreateUser(showField, setShowField);

    const handleFieldFocus = (field: string) => {
        if (field === "email") {
            setShowField((prev: IForm) => ({
                ...prev,
                emailBool: false
            }));
        } else if (field === "senha") {
            setShowField((prev: IForm) => ({
                ...prev,
                senhaBool: false
            }));
        } else if (field === "name") {
            setShowField((prev: IForm) => ({
                ...prev,
                nameBool: false
            }));
        } else if (field === "confirmarSenha") {
            setShowField((prev: IForm) => ({
                ...prev,
                confirmarSenhaBool: false
            }));
        }
    };

    const handleFieldBlur = (field: string) => {
        if (field === "email" && showField.email === "") {
            setShowField((prev: IForm) => ({
                ...prev,
                emailBool: true
            }));
        } else if (field === "senha" && showField.senha === "") {
            setShowField((prev: IForm) => ({
                ...prev,
                senhaBool: true
            }));
        } else if (field === "name" && showField.nome === "") {
            setShowField((prev: IForm) => ({
                ...prev,
                nameBool: true
            }));
        } else if (field === "confirmarSenha" && showField.confirmar === "") {
            setShowField((prev: IForm) => ({
                ...prev,
                confirmarSenhaBool: true
            }));
        }
    };

    const handleFieldChange = (text: string, field: string) => {
        if (field === "email") {
            setShowField((prev: IForm) => ({
                ...prev,
                email: text
            }));
        } else if (field === "senha") {
            setShowField((prev: IForm) => ({
                ...prev,
                senha: text
            }));
        } else if (field === "name") {
            setShowField((prev: IForm) => ({
                ...prev,
                nome: text
            }));
        } else if (field === "confirmarSenha") {
            setShowField((prev: IForm) => ({
                ...prev,
                confirmar: text
            }));
        }
    };

    const handleFileSelection = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });

            if (res[0].type?.includes('video')) {
                console.log('arquivo errado')
                return
            }
            console.log('Arquivo selecionado:', res[0].type);
            const fileContent = await RNFS.readFile(res[0].uri, 'base64');
            setShowField((prev: IForm) => ({
                ...prev,
                foto: fileContent
            }));
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('Seleção de arquivo cancelada');
            } else {
                console.log('Erro ao selecionar o arquivo:', err);
            }
        }
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>

            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 40 }}>

                <View style={styles.container}>

                    <View>
                        <Text style={styles.loginText}>Criar Conta</Text>
                    </View>

                    <View>
                        {
                            showField.foto !== '' ? (
                                <TouchableOpacity onPress={handleFileSelection} style={{
                                    alignSelf: "center",
                                    marginBottom: 16,
                                    width: 130,
                                    height: 130,
                                    borderRadius: 100,
                                    overflow: "hidden",
                                }}>
                                    <Image style={{ height: "100%", width: "100%" }}
                                        source={{ uri: `data:image/png;base64,${showField.foto}` }}
                                    />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={{
                                        marginBottom: 16,
                                        backgroundColor: "#ccc",
                                        width: 130,
                                        height: 130,
                                        borderRadius: 100,
                                        alignSelf: "center",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                    onPress={handleFileSelection}>
                                    <Text style={{ fontWeight: '700', fontSize: 20 }}>FOTO</Text>
                                </TouchableOpacity>
                            )
                        }

                        <View>
                            {
                                error ? <Text style={{ alignSelf: "center", fontWeight: "700", color: "red" }}>Email já Cadastrado</Text> : null
                            }

                        </View>
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
                                    value={showField.nome}
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
                            style={[styles.loginButton, { marginBottom: 10 }]}
                        >
                            <TouchableOpacity style={styles.loginButton} onPress={() => createUser()}>
                                <Text style={styles.loginButtonText}>Cadastrar</Text>
                                <Icon name="arrow-right" size={25} color="#fff" />
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        height: "100%",
        backgroundColor: "#FAF8F6",
    },
    container: {
        height: "70%",
        marginTop: 100,
        alignSelf: "center",
    },
    loginText: {
        fontSize: 35,
        marginBottom: 16,
        fontWeight: "800",
        color: "#000",
        alignSelf: "center"
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
        marginTop: 20,
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

export default SingIng;