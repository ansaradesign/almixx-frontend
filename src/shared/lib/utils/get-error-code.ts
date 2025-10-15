export const getErrorCode = (error: string) => Number(error.split(': ').at(-1));
