
export interface DataPoint {
  x: number;
  y: number;
  type: 'normal' | 'adversarial';
  id: string;
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
  timestamp?: string;
}

export interface ScanResult {
  fileName: string;
  fileType: string;
  threatsDetected: number;
  dataPoints: DataPoint[];
  summary: string;
  timestamp: string;
  safetyScore: number;
  isLiveStream?: boolean;
  kafkaTopic?: string;
}

export interface HistoryItem {
  id: string;
  dataset: string;
  type: string;
  date: string;
  status: string;
  severity: 'High' | 'Medium' | 'Low';
  threats: number;
  throughput?: string;
}

export enum Page {
  Dashboard = 'dashboard',
  Scanner = 'scanner',
  Visualizer = 'visualizer',
  Report = 'report',
  Overview = 'overview'
}

export type AuthMode = 'login' | 'signup';
