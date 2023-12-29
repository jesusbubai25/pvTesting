import { GHI_GTI_data_fail, GHI_GTI_data_request, GHI_GTI_data_sucess,
     all_inverter_efficiency_fail, all_inverter_efficiency_request,
      all_inverter_efficiency_sucess, all_scbsmb_fail, all_scbsmb_request, all_scbsmb_sucess,
       energy_monthly_fail, energy_monthly_request, energy_monthly_sucess, inverter_efficiency_fail,
        inverter_efficiency_request, inverter_efficiency_sucess, powerplant_details_fail, powerplant_details_request, powerplant_details_sucess } from "../constants/dataConstants"
import axios from "axios"

axios.create({
    baseURL:"http://localhost:8000",
    withCredentials:true
})


export const Inverter_Efficiency = () => async (dispatch) => {
    try {
        dispatch({ type: inverter_efficiency_request })

        const { data } = await axios.get("/inverter-efficiency");
        dispatch({ type: inverter_efficiency_sucess, payload: data.newdata })


    } catch (error) {
        dispatch({ type: inverter_efficiency_fail, payload: error.response.data.error })
    }
}


export const All_Inverter_Efficiency_Monthly = () => async (dispatch) => {
    try {
        dispatch({ type: all_inverter_efficiency_request })

            const { data } = await axios.get("/inverter-efficiency-monthly");
        
        dispatch({ type: all_inverter_efficiency_sucess, payload: data.newresult })


    } catch (error) {
        dispatch({ type: all_inverter_efficiency_fail, payload: error.response.data.error })
    }
}

export const All_SCBSMB = () => async (dispatch) => {
    try {
        dispatch({ type: all_scbsmb_request })
        var result = [];
        {
            const { data } = await axios.get("/SCBSMB1");
            result.push(data);
        }
        {
            const { data } = await axios.get("/SCBSMB2");
            result.push(data);
        }
        {
            const { data } = await axios.get("/SCBSMB3");
            result.push(data);
        }
        {
            const { data } = await axios.get("/SCBSMB4");
            result.push(data);
        }
        dispatch({ type: all_scbsmb_sucess, payload: result })


    } catch (error) {
        dispatch({ type: all_scbsmb_fail, payload: error.response.data.error })
    }
}

export const normalizedEnergyDetails = () => async (dispatch) => {
    try {
        dispatch({ type: energy_monthly_request })

            const { data } = await axios.get("/normalizedEnergyDetails");
        dispatch({ type:energy_monthly_sucess, payload: data })


    } catch (error) {
        dispatch({ type: energy_monthly_fail, payload: error.response.data.error })
    }
}

export const GHI_GTI_data_action = () => async (dispatch) => {
    try {
        dispatch({ type: GHI_GTI_data_request })

            const { data } = await axios.get("/GHI-GTI-data");
        dispatch({ type:GHI_GTI_data_sucess, payload: data })

    } catch (error) {
        dispatch({ type: GHI_GTI_data_fail, payload: error.response.data.error })
    }
}

export const powerPlantDetail = () => async (dispatch) => {
    try {
        dispatch({ type: powerplant_details_request })

            const { data } = await axios.get("/powerPlantDetails");
        dispatch({ type:powerplant_details_sucess, payload: {data1:data.result,data2:data.result2,inverter_details:data.result3} })

    } catch (error) {
        dispatch({ type: powerplant_details_fail, payload: error.response.data.error })
    }
}





