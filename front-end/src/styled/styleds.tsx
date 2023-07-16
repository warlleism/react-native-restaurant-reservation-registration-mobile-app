import styled from "styled-components/native";
import LinearGradient from 'react-native-linear-gradient';

export const ButtonContainer = styled.TouchableOpacity`
  width: 90%;
  height: 100px;
  align-items: center;
  align-self: center;
  justify-content: center;
  background-color: #151515;
  border-radius: 30px;
`;

export const ButtonText = styled.Text`
  font-size: 50px;
  letter-spacing: -2px;
  font-weight: 800;
  color: #fff;
`;


interface TouchableOpacityStyledProps {
  select: boolean;
  width: number;
}

export const TouchableOpacityStyled = styled.TouchableOpacity<TouchableOpacityStyledProps>`
  width: ${({ width }) => width - 800}px;
  align-items: center;
  background-color: ${({ select }) => (select ? '#000' : '#fff')};
  border-radius: 100px;
  padding-horizontal: 40px;
  padding-vertical: 20px;
  margin-bottom: 10px;
`;

export const TextStyled = styled.Text<{ select: boolean }>`
  color: ${({ select }) => (select ? '#f2f2f2' : '#000')};
`;

export const ViewStyledReservas = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
  height: 150px;
`;

export const InfoText = styled.Text`
  color: #000000bf;
  font-size: 13px;
`;

export const LoginButtonContainer = styled(LinearGradient)`
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
  justify-content: center;
  width: 130px;
  height: 50px;
  margin-top: 30px;
  elevation: 5;
  border-radius: 100px;
`;

export const LoginButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LoginButtonText = styled.Text`
  font-size: 15px;
  color: #fff;
  margin-right: 5px;
`;

export const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const MenuText = styled.Text`
  font-weight: 600;
  color: #0F0F0F;
  font-size: 15px;
`;


