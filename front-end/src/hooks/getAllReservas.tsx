import { useState, useEffect } from "react";
import axios from "axios";

interface IReservation {
  id: number;
  img_restaurente: string;
  nome_restaurante: string;
  data: string;
  hora: string;
  numero: string;
  descricao: string;
}

//Custom hook responsável por consumir api "get" em todas as reservas
const useFetchReservas = () => {
  const [endDelete, setEndDelete] = useState<boolean>(false);
  const [itens, setItens] = useState<IReservation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://192.168.1.153:8080/todasReservas"
        );
        setItens(response.data.data[0]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, [endDelete]);

  return { itens, isLoading, setEndDelete, setItens, endDelete };
};

export default useFetchReservas;
