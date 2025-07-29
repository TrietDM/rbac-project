export type TErrorMessage = {
    message: string;
    errorCode: string;
    detail?: string;
}

export const buildErrorDetail = (errorCode: string, message: string = "", detail: any = null): TErrorMessage =>{
    const e: TErrorMessage = {
        errorCode,
        message
    };
    if(detail)
        e.detail = detail;
    return e;
}