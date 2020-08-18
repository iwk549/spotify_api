import http from "./httpService";

export async function getTopTracks(artist_id) {
  try {
    return http.get(
      http.audio_features_endpoint + "/artists/top_tracks?id=" + artist_id
    );
  } catch (ex) {
    return ex.response;
  }
}
