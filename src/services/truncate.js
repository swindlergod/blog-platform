export function textTruncate(text, maxlength) {
    if (text === undefined || text.length < 50) {
        return text
    }
    var sliced = text.slice(0, maxlength);
        if (sliced.length < text.length) {
        sliced += '...';
        }    
return sliced
}