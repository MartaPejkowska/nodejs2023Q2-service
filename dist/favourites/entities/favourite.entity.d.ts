import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
export declare class FavouriteEntity {
    albums: AlbumEntity[];
    tracks: TrackEntity[];
    artists: ArtistEntity[];
}
export declare class TrackFav {
    id: string;
    trackId: string | null;
    track: TrackEntity;
}
export declare class ArtistFav {
    id: string;
    artistId: string | null;
    artist: ArtistEntity;
}
export declare class AlbumFav {
    id: string;
    albumId: string | null;
    album: AlbumEntity;
}
