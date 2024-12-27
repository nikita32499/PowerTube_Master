export type TWorkerNodeHistory = {
	type: EnumWorkerNodeHistoryType.USER_CONNECTION_FAILED
	date: number
}

enum EnumWorkerNodeHistoryType {
	USER_CONNECTION_FAILED = 'USER_CONNECTION_FAILED',
}
