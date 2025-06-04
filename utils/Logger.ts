const time = new Date().toTimeString().slice(0, 8);
export function info(message: string, ...args: unknown[]) {
	console.info(`${time} [INFO] ${message}`, ...args);
}

export function warn(message: string, ...args: unknown[]) {
	console.warn(`${time} [WARN] ${message}`, ...args);
}

export function error(message: string, ...args: unknown[]) {
	console.error(`${time} [ERROR] ${message}`, ...args);
}

export function critical(message: string, ...args: unknown[]) {
	console.error(`${time} [CRITICAL] ${message}`, ...args);
}