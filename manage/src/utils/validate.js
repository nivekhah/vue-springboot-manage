export function isAbsolutePath(path) {
    return /^(http?|tel|mailto)/.test(path)
}