import { buildErrorDetail, TErrorMessage } from "./error-message";

export const masterDataErrorMessage = {
    E_001(detail: string = ""): TErrorMessage{
        const e = buildErrorDetail('001', 'USER_NAME_EXISTED', detail);
        return e;
    },
    E_002(detail: string = ""): TErrorMessage{
        const e = buildErrorDetail('002', 'USER_NOT_FOUND', detail);
        return e;
    },
    E_003(detail: string = ""): TErrorMessage{
        const e = buildErrorDetail('003', 'EMAIL_IN_USE', detail);
        return e;
    },

    E_004(detail: string = ""): TErrorMessage{
        const e = buildErrorDetail('004', 'PERMISSION_NAME_EXISTED', detail);
        return e;
    },
    E_005(detail: string = ""): TErrorMessage{
        const e = buildErrorDetail('005', 'PERMISSION_NOT_FOUND', detail);
        return e;
    },
    E_006(detail: string = ""): TErrorMessage{
        const e = buildErrorDetail('006', 'INVALID_OTP', detail);
        return e;
    },
    E_007(detail: string = ""): TErrorMessage{
        const e = buildErrorDetail('007', 'ROLE_NAME_EXISTED', detail);
        return e;
    },
    E_008(detail: string = ""): TErrorMessage{
        const e = buildErrorDetail('008', 'ROLE_NOT_FOUND', detail);
        return e;
    },
    E_009(detail: string = ""): TErrorMessage{
        const e = buildErrorDetail('009', 'INVALID_OTP', detail);
        return e;
    },
    E_010(detail: string = ""): TErrorMessage{
        const e = buildErrorDetail('010', 'PERMISSION_DENIED', detail);
        return e;
    },


}