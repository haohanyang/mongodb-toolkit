declare const supportedDelimiters: readonly [',', '\t', ';', ' '];
declare const supportedLinebreaks: readonly ['\r\n', '\n'];

export type Delimiter = (typeof supportedDelimiters)[number];
export type Linebreak = (typeof supportedLinebreaks)[number];
