export const NOTIFICATION_TYPES = {
  CONNECTION_REQUEST: `connectionRequested`,
  CONNECTION_ACCEPTED: `connectionRequestAccepted`,
  ACCEPTED_AT_GROUP: `acceptedAtGroup`
}

export const NOTIFICATION_TITLES = {
  [NOTIFICATION_TYPES.CONNECTION_REQUEST]: `Conexão solicitada`,
  [NOTIFICATION_TYPES.CONNECTION_ACCEPTED]: `Nova conexão`,
  [NOTIFICATION_TYPES.ACCEPTED_AT_GROUP]: `Aceito no grupo`
}

export const NO_NOTIFICATIONS = `Sem novidades!`
