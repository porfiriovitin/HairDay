import dayjs from "dayjs";
import { apiConfig } from "./api-config";

export async function scheduleFetchByDay({ date }) {
  try {

    const response = await fetch(`${apiConfig.baseURL}`);
    const data = await response.json();

    //Filtrar os agendamentos pelo dia selecionado
    const dailySchedules = data.filter((schedule) =>
      dayjs(date).isSame(schedule.when, "day"));
    
    return dailySchedules;

  } catch (error) {
    console.log(error);
    alert("Erro ao buscar agendamentos do dia selecionado");
  }
}
