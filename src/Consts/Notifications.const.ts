export const NOTIFICATION_TYPES = {
  CONNECTION_REQUEST: `connectionRequest`,
  ACCEPTED_AT_GROUP: `acceptedAtGroup`,
  CONNECTION_ACCEPTED: `connectionAccepted`
}

export const NOTIFICATION_TITLES = {
  [NOTIFICATION_TYPES.CONNECTION_REQUEST]: `Conexão solicitada`,
  [NOTIFICATION_TYPES.ACCEPTED_AT_GROUP]: `Aceito no grupo`,
  [NOTIFICATION_TYPES.CONNECTION_ACCEPTED]: `Solicitação aceita`
}
