export interface ISumoIncident {
  id?: string;
  incident?: string;
  archive: number;
  internal?: number;
  customerid?: number;
  customername?: string;
  summary?: string;
  action?: string;
  creator?: string;
  created?: string;
  status?: string;
  __typename?: string;
}

export interface ISingleSumoIncident {
  sumoincident: ISumoIncident;
}
export interface ISumoIncidentData {
  sumoincidents: ISumoIncident[];
}
