export interface AccessTokenPayload {
  username: string
  userId: number
}
interface SolutionInfo {
  id: number
  title: string
  mark: number
}

export interface UserProfile {
  id: number
  username: string
  role: {
    id: number
    name: string
  }
  status: string
  rating: number
  solutions: SolutionInfo[]
}
export interface UserComment {
  id: number
  task_id: number
  user_id: number
  username: string
  content: string
  created_at: Date
}
export interface Filter {
  startFrom?: number
  limit?: number
  category?: string
  difficulty?: string
  popularity?: {
    min: number
    max: number
  }
}
