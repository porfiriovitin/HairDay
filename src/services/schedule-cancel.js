import { apiConfig } from "./api-config.js";

export async function scheduleCancel({id}) {
    try {
        await fetch (`${apiConfig.baseURL}/${id}`, {
            method: "DELETE",
        })

        alert("Agendamento cancelado com sucesso")
    } catch (error) {
        console.log(error)
    }
}