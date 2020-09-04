export enum Permissions {
    None,             // 000
    Read    = 1 << 1, // 001
    Write   = 1 << 2, // 010
    Delete = 1 << 3, // 100
    Share = 1 << 4, // 101
    UploadFile = 1 << 5, // 110
}