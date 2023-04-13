import styles from "../styles/AboutView.module.css";

export default function AboutView(props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>
        <div>Vinobo</div>
        <div className={styles.h1s}>Video Notebook</div>
      </h1>
      <hr />
      <main className={styles.body}>
        <h2>About Vinobo</h2>
        <p>
          Vinobo is a web app intended to facilitate for students to study video-based material. Our
          app does this by allowing users to search for the content within a YouTube video, and
          attach personal notes to it. The search and notes enables the user to find and annotate
          points in the video that are of interest to the user. The users can then save their
          timestamped notes with the corresponding video for future study.
        </p>
        <p>Please sign up and explore the possibilities of Vinobo!</p>
        <hr />
        <h2>How to use</h2>
        <ul>
          <li>Start by copying the YouTube link of a video that you would like to study.</li>
          <li>
            Paste the video URL in the left sidebar on the main page and click <i>Add</i>. The video
            and it{"'"}s transcripts will now load into the app.
          </li>
          <li>You can now watch the video, search in the transcript, and take notes.</li>
          <li>
            Add a note by typing in the form below the video. The timestamp can be manually set or
            left empty for the current video time.
          </li>
        </ul>
        <hr />
        <h2>Creators</h2>
        <p>
          This app was created as a group project during the course DH2642 Interaction Programming
          at KTH Royal Institute of Science. These are the team members:
        </p>
        <div className={styles.creators}>
          <div>Johan Berg</div>
          <div>Elias Beshir</div>
          <div>Bram Albertus Peters</div>
          <div>Simon Falk</div>
        </div>
        <hr />
        <h2>Code</h2>
        <p>
          Currently only on <a href="https://gits-15.sys.kth.se/jberg8/DH2642-Vinobo">KTH GitHub</a>
          .
        </p>
      </main>
    </div>
  );
}
