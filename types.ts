
export interface DataPoint {
  x: number;
  y: number;
  type: 'normal' | 'adversarial';
  id: string;
  // Extended metadata for Data Explorer
  airline?: string;
  dateOfJourney?: string;
  source?: string;
  destination?: string;
  route?: string;
  depTime?: string;
  arrivalTime?: string;
  duration?: string;
  stops?: string;
  additionalInfo?: string;
}

export interface AnalysisResult {
  totalPoints: number;
  detectedAnomalies: number;
  confidence: number;
  clusterStats: {
    normalCount: number;
    attackCount: number;
  };
}

export enum Page {
  Dashboard = 'dashboard',
  Scanner = 'scanner',
  Visualizer = 'visualizer',
  Report = 'report',
  Overview = 'overview'
}

export type AuthMode = 'login' | 'signup';
