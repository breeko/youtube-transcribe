export const getWordDisplay = (w: Word) => w.start ? ` ${w.content}` : w.content

export const isDefined = <T>(item: T | undefined): item is T => item !== undefined
