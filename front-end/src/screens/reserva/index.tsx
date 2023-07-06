import React from "react"
import { Text, View, TextInput, Button } from "react-native";
import { useForm, Controller } from 'react-hook-form';

type Inputs = {
    example: string,
    exampleRequired: string,
};

const Reserva = () => {
    const { handleSubmit, control, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log(data); // Aqui você pode fazer algo com os dados submetidos
    };

    return (
        <View>
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <Text>Data:</Text>
                        <TextInput
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                        />
                    </View>
                )}
                name="data"
                defaultValue=""
            />
            {errors.data && <Text>Data é obrigatória.</Text>}

            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <Text>Hora:</Text>
                        <TextInput
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                        />
                    </View>
                )}
                name="hora"
                defaultValue=""
            />
            {errors.hora && <Text>Hora é obrigatória.</Text>}

            <Controller
                control={control}
                rules={{ required: true, pattern: /^[0-9]+$/ }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <Text>Quantidade de Pessoas:</Text>
                        <TextInput
                            onBlur={onBlur}
                            onChangeText={(value) => onChange(value)}
                            value={value}
                            keyboardType="numeric"
                        />
                    </View>
                )}
                name="quantidade_pessoas"
                defaultValue=""
            />
            {errors.quantidade_pessoas && (
                <Text>Quantidade de Pessoas é obrigatória e deve ser um número.</Text>
            )}

            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    );
}

export default Reserva;