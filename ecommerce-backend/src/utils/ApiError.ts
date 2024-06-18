class ApiError extends Error {
    public statusCode: number;
    public data: null;
    public message: string;
    public success: boolean;
    public errors: string[] | object[];

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        error: string[] | object[] = [],
        stack: string = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = error;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
