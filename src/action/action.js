import { NEW_WEATHER, GET_START_WEATHER } from './actTypes';

export function newWeather(data) {
    return {
        type: NEW_WEATHER,
        data
    }
}

export function getWeather(data) {
    return {
        type: GET_START_WEATHER,
        data
    }
}