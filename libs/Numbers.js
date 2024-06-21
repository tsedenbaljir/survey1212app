export function Numbers(number) {
    const options={
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }
    if(number === undefined || number === null){
        return number
    }
    return number.toLocaleString('en-US', options)
}