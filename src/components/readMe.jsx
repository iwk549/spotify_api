import React from "react";
import Modal from "react-modal";

const ReadMe = ({ id, popupOpen, closeModal }) => {
  return (
    <Modal
      id={id}
      isOpen={popupOpen}
      closeOnDocumentClick
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <div>
        <button
          className="btn btn-sm btn-block btn-danger sticky-top"
          onClick={closeModal}
        >
          Close
        </button>
        <hr />
        <h5 className="text-center">Instructions</h5>
        <ul>
          <li>Click on Enter Spotify Credentials</li>
          <li>
            Enter your credentials. Credentials can be obtained from the{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://developer.spotify.com/dashboard/applications"
            >
              Spotify for Developers Page
            </a>
          </li>
          <li>
            Click Save Credentials. Your credentials will be saved until you
            remove them.
          </li>
          <li>
            Enter at least two playlist ids, separated by a comma. The playlist
            id is a 22 character string. It can be found at the end of the
            playlist page url.
          </li>
          <li>
            Enter a single artist id. Again this is a 22 character string and
            can be found at the end of the artist's page.
          </li>
          <li>There are two checkboxes.</li>
          <ul>
            <li>
              Include Match Probabilities will show the probability of match
              that each track has with each playlist.
            </li>
            <li>
              Include All Songs by Artist will run the algorithm for all songs
              by the artist you entered, not just for their top ten songs. For
              artists with very lasrge catalogs this may slow down the results
              considerably.
            </li>
          </ul>
          <li>Click Get Recommendations</li>
          <li>
            The output table will appear below the form. Click Download Full
            Data to Excel to see all available analysis columns.
          </li>
        </ul>
        <hr />
        <h5 className="text-center">Methodology</h5>
        <p>
          The machine learning algorithm is run using a Python Flask RESTapi
          backend deployed to Heroku. Upon submission the intial data is
          gathered using{" "}
          <a
            target="blank_"
            rel="noopener noreferrer"
            href="https://spotipy.readthedocs.io/en/2.13.0/#"
          >
            Spotipy
          </a>{" "}
          and evaluated with sci-kit learn.
          <br />
          <br />
          The values used for prediction are: danceability, energy, speechiness,
          acousticness, instrumentalness, liveness, and valence. Spotify assigns
          each of these a value between 0 and 1 so no scaling is needed.
          <br />
          <br />
          Cross validation is performed on all of the tracks in the requested
          playlists to determine the best estimator to use for the dataset
          between Known Nearest Neighbors (KNN) and Support Vector
          Classification (SVC). The cross validation is also used to determine
          either the optimal k-value (for KNN) or the optimal kernel, C and
          gamma values (for SVC).
          <br />
          <br />
          Once the optimal estimator and values are determined the estimator is
          fit to the playlist data then the artist tracks are assigned a best
          fitting playlist against the estimator. Note: if{" "}
          <i>Include Match Probabilities</i> is checked then the estimator will
          alway be SVC as KNN does not provide percentages of match.
        </p>
      </div>
    </Modal>
  );
};

export default ReadMe;
