export const NOTIFICATION_TYPES = {
  CONNECTION_REQUEST: `connectionRequested`,
  ACCEPTED_AT_GROUP: `acceptedAtGroup`,
  CONNECTION_ACCEPTED: `connectionRequestAccepted`
}

export const NOTIFICATION_TITLES = {
  [NOTIFICATION_TYPES.CONNECTION_REQUEST]: `Conexão solicitada`,
  [NOTIFICATION_TYPES.ACCEPTED_AT_GROUP]: `Aceito no grupo`,
  [NOTIFICATION_TYPES.CONNECTION_ACCEPTED]: `Nova conexão`
}

export const NO_NOTIFICATIONS = `Sem novidades!`
