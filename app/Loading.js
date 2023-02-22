import styles from "./Loading.module.css";
const Loading = () => {
  return (
    <div className={styles.body}>
      <svg
        className={styles.bike}
        viewBox="0 0 48 30"
        width="48px"
        height="30px"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
        >
          <g transform="translate(9.5,19)">
            <circle
              className={styles.bike__tire}
              r="9"
              stroke-dasharray="56.549 56.549"
            />
            <g
              className={styles.bike__spokesSspin}
              stroke-dasharray="31.416 31.416"
              stroke-dashoffset="-23.562"
            >
              <circle className={styles.bike__spokes} r="5" />
              <circle
                className={styles.bike__spokes}
                r="5"
                transform="rotate(180,0,0)"
              />
            </g>
          </g>
          <g transform="translate(24,19)">
            <g
              className={styles.bike__pedalsSpin}
              stroke-dasharray="25.133 25.133"
              stroke-dashoffset="-21.991"
              transform="rotate(67.5,0,0)"
            >
              <circle className={styles.bike__pedals} r="4" />
              <circle
                className={styles.bike__pedals}
                r="4"
                transform="rotate(180,0,0)"
              />
            </g>
          </g>
          <g transform="translate(38.5,19)">
            <circle
              className={styles.bike__tire}
              r="9"
              stroke-dasharray="56.549 56.549"
            />
            <g
              className={styles.bike__spokesSspin}
              stroke-dasharray="31.416 31.416"
              stroke-dashoffset="-23.562"
            >
              <circle className={styles.bike__spokes} r="5" />
              <circle
                className={styles.bike__spokes}
                r="5"
                transform="rotate(180,0,0)"
              />
            </g>
          </g>
          <polyline
            className={styles.bike__seat}
            points="14 3,18 3"
            stroke-dasharray="5 5"
          />
          <polyline
            className={styles.bike__body}
            points="16 3,24 19,9.5 19,18 8,34 7,24 19"
            stroke-dasharray="79 79"
          />
          <path
            className={styles.bike__handlebars}
            d="m30,2h6s1,0,1,1-1,1-1,1"
            stroke-dasharray="10 10"
          />
          <polyline
            className={styles.bike__front}
            points="32.5 2,38.5 19"
            stroke-dasharray="19 19"
          />
        </g>
      </svg>
      <div className={styles.loadingText}>
        <b>Loading...</b> It may take few seconds to upload your image to our
        server. Please Be patient🙂
      </div>
    </div>
  );
};

export default Loading;
