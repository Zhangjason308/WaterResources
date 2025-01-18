import { GetServerSideProps } from "next";

export interface Washroom_Location {
  _id: string;
  X: number;
  Y: number;
  OBJECTID: number;
  NAME: string;
  NAME_FR: string;
  ADDRESS: string;
  ADDRESS_FR: string;
  SEASONAL: number;
  SEASON_START: string;
  SEASON_END: string;
  HOURS_SUNDAY_OPEN: string;
  HOURS_SUNDAY_CLOSED: string;
  HOURS_MONDAY_OPEN: string;
  HOURS_MONDAY_CLOSED: string;
  HOURS_TUESDAY_OPEN: string;
  HOURS_TUESDAY_CLOSED: string;
  HOURS_WEDNESDAY_OPEN: string;
  HOURS_WEDNESDAY_CLOSED: string;
  HOURS_THURSDAY_OPEN: string;
  HOURS_THURSDAY_CLOSED: string;
  HOURS_FRIDAY_OPEN: string;
  HOURS_FRIDAY_CLOSED: string;
  HOURS_SATURDAY_OPEN: string;
  HOURS_SATURDAY_CLOSED: string;
  STAT_HOLIDAY_AVAILIBILITY: number;
  CHANGE_STATION_CHILD: number;
  CHANGE_STATION_ADULT: number;
  FAMELY_TOILET: number;
  ACCESSIBILITY: number;
  REPORT_TELEPHONE: number;
  SPECIAL_TOILET_TYPE: number;
  X_COORDINATE: number;
  Y_COORDINATE: number;
  JURISDICTION: string;
}

export interface Water_Fountain_Location {
  _id: string;
  X: number;
  Y: number;
  OBJECTID: number;
  BUILDING_NAME: string;
  BUILDING_NAME_FR: string;
  ADDRESS: string;
  ADDRESS_FR: string;
  GLOBALID: string;
  LAST_EDITED_DATE: string;
  OPEN_YEAR_ROUND: string;
  OPEN_YEAR_ROUND_FR: string;
  HOURS_OF_OPERATION: string;
  HOURS_OF_OPERATION_FR: string;
  INSIDE_OUTSIDE: string;
  INSIDE_OUTSIDE_FR: string;
  URL: string;
  URL_FR: string;
}

export async function fetchLocationData(){
  let washroomLocations: Washroom_Location[] = [];
  let fountainLocations: Water_Fountain_Location[] = [];

  try {
    const res = await fetch('api/locations');
    const data = await res.json();
    washroomLocations = data.washrooms;
    fountainLocations = data.waterFountains;
  }catch (error){
    console.error('Somthing went wrong fetching the data: ', error);
  }
  return {washroomLocations, fountainLocations};
}
