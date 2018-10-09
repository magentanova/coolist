export const withinRegion = (point, region) => {
    if (point.x < region.x || point.x > (region.x + region.width)) {
        return false
    }
    if (point.y < region.y || point.y > (region.y + region.height)) {
        return false
    }
    return true
}