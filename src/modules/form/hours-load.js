import {openingHours} from "../../utils/opening-hours.js"
import dayjs, { Dayjs } from "dayjs"
import { hoursClick } from "./hours-click.js"
import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js"

const hours = document.getElementById("hours")

export function hoursLoad({date , dailySchedules}){
    //Limpa a lista de horários
    hours.innerHTML = ""

    //Obtém a lista de todos os horários ocupados
    const unavailableHours = dailySchedules.map((schedule)=> dayjs(schedule.when).format("HH:mm"))

    const opening = openingHours.map((hour)=>{
        
        const [scheduleHour] = hour.split(":")
        
        //Add a time to the date and verify if the date is in the past
        const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs())

        const available = !unavailableHours.includes(hour) && !isHourPast
        
        return {
            hour,
            avaiable: available
        }
    })

    opening.forEach(({hour, avaiable})=>{
        const li = document.createElement("li")
        li.classList.add("hour")
        li.classList.add(avaiable ? "hour-available" : "hour-unavailable")
        li.textContent = hour

        if(hour === "9:00"){
            hourHeaderAdd("Manhã")
        }else if (hour === "13:00"){
            hourHeaderAdd("Tarde")
        }else if(hour === "18:00"){
            hourHeaderAdd("Noite")
        }

        hours.append(li)
    }
    )

    hoursClick()

}

function hourHeaderAdd(title){
    const header = document.createElement("li")
    header.classList.add("hour-period")
    header.textContent = title

    hours.append(header)
}