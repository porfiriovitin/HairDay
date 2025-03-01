import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js"
import {schedulesShow} from "../../modules/schedules/show.js"
import { hoursLoad } from "../form/hours-load.js"


const selectedDate = document.getElementById("date")


export async function schedulesDay(){
    //Get input date
    const date = selectedDate.value

    //buscar na API
    const dailySchedules = await scheduleFetchByDay({date})

    //Exibir os agendamentos
    schedulesShow({dailySchedules: dailySchedules});


    //Available 
    hoursLoad({date, dailySchedules})
}