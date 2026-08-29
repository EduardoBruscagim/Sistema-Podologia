export interface SystemStatus {
  name: string
  version: string
  status: 'online' | 'maintenance' | 'offline'
  timestamp: string
}

export interface PatientSummary {
  id: string
  name: string
  phone: string
  lastVisit?: string
  status: 'active' | 'archived'
}
