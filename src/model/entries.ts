export interface ContextEntry {
    urlRegex: string;
    text: string;
    tags: string[];
    command?: string;
}

export const entries: ContextEntry[] = [
    {
        urlRegex: "https://www.reddit.com/*",
        text: "Reddit text one",
        tags: ["for me", "formula 1"]
    },
    {
        urlRegex: "https://www.reddit.com/*",
        text: "Reddit text two",
        tags: []
    },
    {
        urlRegex: "https://www.reddit.com/*",
        text: "Reddit text one",
        tags: ["for me", "formula 1"]
    },
    {
        urlRegex: "https://www.reddit.com/*",
        text: "Reddit text two",
        tags: []
    },
    {
        urlRegex: "https://www.reddit.com/*",
        text: "Reddit text one",
        tags: ["for me", "formula 1"]
    },
    {
        urlRegex: "https://www.reddit.com/*",
        text: "Reddit text two",
        tags: []
    },
    {
        urlRegex: "www.google.com/*",
        text: "Google text one",
        tags: []
    },
    {
        urlRegex: "",
        text: "All text one",
        tags: ["everyone", "all in", "hello", "lots of tags", "wow", "dog bark"]
    }
]