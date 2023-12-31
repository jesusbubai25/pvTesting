import {
    GHI_GTI_data_fail,
    GHI_GTI_data_request,
    GHI_GTI_data_sucess,
    all_inverter_efficiency_fail, all_inverter_efficiency_request,
    all_inverter_efficiency_sucess, all_scbsmb_fail, all_scbsmb_request, all_scbsmb_sucess, energy_monthly_fail,
    energy_monthly_request, energy_monthly_sucess, inverter_efficiency_fail, inverter_efficiency_request,
    inverter_efficiency_sucess,
    powerplant_details_fail,
    powerplant_details_request,
    powerplant_details_sucess,

} from "../constants/dataConstants";


export const efficiency = (state = { efficiencies: null }, action) => {

    switch (action.type) {
        case inverter_efficiency_request:
            return {
                ...state,
                loading: true
            };
        case inverter_efficiency_sucess:
            return {
                ...state,
                loading: false,
                efficiencies: action.payload
            };
        case inverter_efficiency_fail:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

}




export const all_scbsmb = (state = { all_scbsmb: null }, action) => {

    switch (action.type) {
        case all_scbsmb_request:
            return {
                ...state,
                loading: true
            };
        case all_scbsmb_sucess:
            return {
                ...state,
                loading: false,
                all_scbsmb: action.payload
            };
        case all_scbsmb_fail:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

}
export const monthly_inverter_efficiency = (state = { monthly_inverter_efficiency:null }, action) => {

    switch (action.type) {
        case all_inverter_efficiency_request:
            return {
                ...state,
                loading: true
            };
        case all_inverter_efficiency_sucess:
            return {
                ...state,
                loading: false,
                monthly_inverter_efficiency: action.payload
            };
        case all_inverter_efficiency_fail:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

}



export const normalizedEnergyDetails = (state = { energy: null }, action) => {

    switch (action.type) {
        case energy_monthly_request:
            return {
                ...state,
                loading: true
            };
        case energy_monthly_sucess:
            return {
                ...state,
                loading: false,
                energy: action.payload
            };
        case energy_monthly_fail:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

}

export const GHI_GTI_data = (state = { GHI_GTI_data: null }, action) => {

    switch (action.type) {
        case GHI_GTI_data_request:
            return {
                ...state,
                loading: true
            };
        case GHI_GTI_data_sucess:
            return {
                ...state,
                loading: false,
                GHI_GTI_data: action.payload
            };
        case GHI_GTI_data_fail:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}
export const plantDetail = (state = { plantDetail: null }, action) => {

    switch (action.type) {
        case powerplant_details_request:
            return {
                ...state,
                loading: true
            };
        case powerplant_details_sucess:
            return {
                ...state,
                loading: false,
                plantDetail: action.payload
            };
        case powerplant_details_fail:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

