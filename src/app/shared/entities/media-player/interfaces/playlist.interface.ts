export type Playlist = PlaylistItem[];

export interface PlaylistItem {
    /**
     * An array of source objects representing the media sources for the video.
     * Each source object includes the URL and MIME type of the video source.
     */
    sources: Array<{
        src: string;
        type: string;
    }>;

    /**
     * The URL of the poster image displayed before the video plays.
     * This property is optional.
     */
    poster?: string;

    /**
     * The amount of seconds representing the length of the media source.
     * This property is optional.
     */
    duration?: number;

    /**
     * An optional array of text track objects for subtitles, captions, etc.
     * Each object in this array follows the structure of the Video.js TextTrack object.
     */
    textTracks?: Array<{
        kind?: string;
        label?: string;
        language?: string;
        src?: string;
        srcLang?: string;
        default?: boolean;
    }>;

    /**
     * Additional dynamic properties that may be specific to the video
     * or required by the playlist system.
     */
    [key: string]: any;
}