export interface ServiceCenterRegisterDTO {
  email: string
  password: string
  providerProfile: {
    garageName: string
    ownerName: string
    phone: string
  }
}

export interface ServiceCenterLoginDTO {
  email: string
  password: string
}
export interface ServiceCenterAuthResponse {
  success: boolean;
  data: {
    provider: {
      _id: string
      email: string
      isBlocked?: boolean
    }
    accessToken: string
    refreshToken: string
  }
}