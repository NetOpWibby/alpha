


/// export

export const getLoadingMarkup = () => ({
  container: `
    <style>
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeOut {
        from {
          opacity: 1;
          transform: translateY(0);
        }

        to {
          opacity: 0;
          transform: translateY(-10px);
        }
      }

      .fadeOut {
        animation: fadeOut 0.5s ease-out forwards;
      }

      #loading-wrapper {
        width: 100vw; height: 100vh;

        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
      }

      .logo {
        width: 75px; height: 75px;

        animation: fadeIn 0.5s ease-out forwards;
        margin-bottom: 20px;
        opacity: 0;
      }

      .text {
        animation: fadeIn 0.5s ease-out forwards;
        color: rgba(255, 255, 255, 0.6);
        font-size: 32px;
        font-weight: 200;
        opacity: 0;
        text-align: center;
      }

      .text-inner {
        font-weight: 400;
      }
    </style>

    <div id="loading-wrapper">
      <svg class="logo" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <title>GraphQL Playground Logo</title>

        <style>
          @keyframes appearIn {
            from {
              opacity: 0;
              transform: translateY(0px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scaleIn {
            from {
              transform: scale(0);
            }

            to {
              transform: scale(1);
            }
          }

          @keyframes innerDrawIn {
            0% {
              stroke-dashoffset: 70;
            }

            50% {
              stroke-dashoffset: 140;
            }

            100% {
              stroke-dashoffset: 210;
            }
          }

          @keyframes outerDrawIn {
            0% {
              stroke-dashoffset: 76;
            }

            100% {
              stroke-dashoffset: 152;
            }
          }

          .circle-top,
          .circle-top-right,
          .circle-bottom-right,
          .circle-bottom,
          .circle-bottom-left,
          .circle-top-left {
            fill: white;
          }

          .circle-top {
            animation: scaleIn 0.25s linear forwards 0.2222222222222222s;
            transform: scale(0);
            transform-origin: 64px 28px;
          }

          .circle-top-right {
            animation: scaleIn 0.25s linear forwards 0.4222222222222222s;
            transform: scale(0);
            transform-origin: 95.98500061035156px 46.510000228881836px;
          }

          .circle-bottom-right {
            animation: scaleIn 0.25s linear forwards 0.6222222222222222s;
            transform: scale(0);
            transform-origin: 95.97162628173828px 83.4900016784668px;
          }

          .circle-bottom {
            animation: scaleIn 0.25s linear forwards 0.8222222222222223s;
            transform: scale(0);
            transform-origin: 64px 101.97999572753906px;
          }

          .circle-bottom-left {
            animation: scaleIn 0.25s linear forwards 1.0222222222222221s;
            transform: scale(0);
            transform-origin: 32.03982162475586px 83.4900016784668px;
          }

          .circle-top-left {
            animation: scaleIn 0.25s linear forwards 1.2222222222222223s;
            transform: scale(0);
            transform-origin: 32.033552169799805px 46.510000228881836px;
          }

          .octoline-top-right,
          .octoline-right,
          .octoline-bottom-right,
          .octoline-bottom-left,
          .octoline-left,
          .octoline-top-left {
            stroke: white;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 4;
          }

          .octoline-top-right {
            animation: outerDrawIn 0.5s ease-out forwards 0.3333333333333333s, appearIn 0.1s ease-out forwards 0.3333333333333333s;
            animation-iteration-count: 1, 1;
            opacity: 0;
            stroke-dasharray: 76;
          }

          .octoline-right {
            animation: outerDrawIn 0.5s ease-out forwards 0.5333333333333333s, appearIn 0.1s ease-out forwards 0.5333333333333333s;
            animation-iteration-count: 1, 1;
            opacity: 0;
            stroke-dasharray: 76;
          }

          .octoline-bottom-right {
            animation: outerDrawIn 0.5s ease-out forwards 0.7333333333333334s, appearIn 0.1s ease-out forwards 0.7333333333333334s;
            animation-iteration-count: 1, 1;
            opacity: 0;
            stroke-dasharray: 76;
          }

          .octoline-bottom-left {
            animation: outerDrawIn 0.5s ease-out forwards 0.9333333333333333s, appearIn 0.1s ease-out forwards 0.9333333333333333s;
            animation-iteration-count: 1, 1;
            opacity: 0;
            stroke-dasharray: 76;
          }

          .octoline-left {
            animation: outerDrawIn 0.5s ease-out forwards 1.1333333333333333s, appearIn 0.1s ease-out forwards 1.1333333333333333s;
            animation-iteration-count: 1, 1;
            opacity: 0;
            stroke-dasharray: 76;
          }

          .octoline-top-left {
            animation: outerDrawIn 0.5s ease-out forwards 1.3333333333333333s, appearIn 0.1s ease-out forwards 1.3333333333333333s;
            animation-iteration-count: 1, 1;
            opacity: 0;
            stroke-dasharray: 76;
          }

          .triangle-bottom,
          .triangle-left,
          .triangle-right {
            stroke: white;
            stroke-linecap: round;
            stroke-width: 4;
          }

          .triangle-bottom {
            animation: innerDrawIn 1s ease-in-out forwards 1.3666666666666667s, appearIn 0.1s linear forwards 1.3666666666666667s;
            animation-iteration-count: infinite, 1;
            opacity: 0;
            stroke-dasharray: 70;
          }

          .triangle-left {
            animation: innerDrawIn 1s ease-in-out forwards 1.5333333333333332s, appearIn 0.1s linear forwards 1.5333333333333332s;
            animation-iteration-count: infinite, 1;
            opacity: 0;
            stroke-dasharray: 70;
          }

          .triangle-right {
            animation: innerDrawIn 1s ease-in-out forwards 1.7000000000000002s, appearIn 0.1s linear forwards 1.7000000000000002s;
            animation-iteration-count: infinite, 1;
            opacity: 0;
            stroke-dasharray: 70;
          }
        </style>

        <defs>
          <linearGradient id="linearGradient" x1="4.86%" x2="96.21%" y1="0%" y2="99.66%">
            <stop stop-color="#e00082" stop-opacity="0.8" offset="0%"></stop>
            <stop stop-color="#e00082" offset="100%"></stop>
          </linearGradient>
        </defs>

        <g>
          <rect id="gradient" width="127.96" height="127.96" y="1" fill="url(#linearGradient)" rx="4"></rect>
          <path id="border" fill="#e00082" fill-rule="nonzero" d="M4.7 2.84c-1.58 0-2.86 1.28-2.86 2.85v116.57c0 1.57 1.28 2.84 2.85 2.84h116.57c1.57 0 2.84-1.26 2.84-2.83V5.67c0-1.55-1.26-2.83-2.83-2.83H4.67zM4.7 0h116.58c3.14 0 5.68 2.55 5.68 5.7v116.58c0 3.14-2.54 5.68-5.68 5.68H4.68c-3.13 0-5.68-2.54-5.68-5.68V5.68C-1 2.56 1.55 0 4.7 0z"></path>

          <path
            class="circle-top" x="64" y="28"
            d="M64 36c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"
            style="transform: translate(100px, 100px);"></path>
          <path
            class="circle-top-right" x="95.98500061035156" y="46.510000228881836"
            d="M89.04 50.52c-2.2-3.84-.9-8.73 2.94-10.96 3.83-2.2 8.72-.9 10.95 2.94 2.2 3.84.9 8.73-2.94 10.96-3.85 2.2-8.76.9-10.97-2.94"
            style="transform: translate(100px, 100px);"></path>
          <path
            class="circle-bottom-right" x="95.97162628173828" y="83.4900016784668"
            d="M102.9 87.5c-2.2 3.84-7.1 5.15-10.94 2.94-3.84-2.2-5.14-7.12-2.94-10.96 2.2-3.84 7.12-5.15 10.95-2.94 3.86 2.23 5.16 7.12 2.94 10.96"
            style="transform: translate(100px, 100px);"></path>
          <path
            class="circle-bottom" x="64" y="101.97999572753906"
            d="M64 110c-4.43 0-8-3.6-8-8.02 0-4.44 3.57-8.02 8-8.02s8 3.58 8 8.02c0 4.4-3.57 8.02-8 8.02"
            style="transform: translate(100px, 100px);"></path>
          <path
            class="circle-bottom-left" x="32.03982162475586" y="83.4900016784668"
            d="M25.1 87.5c-2.2-3.84-.9-8.73 2.93-10.96 3.83-2.2 8.72-.9 10.95 2.94 2.2 3.84.9 8.73-2.94 10.96-3.85 2.2-8.74.9-10.95-2.94"
            style="transform: translate(100px, 100px);"></path>
          <path
            class="circle-top-left" x="32.033552169799805" y="46.510000228881836"
            d="M38.96 50.52c-2.2 3.84-7.12 5.15-10.95 2.94-3.82-2.2-5.12-7.12-2.92-10.96 2.2-3.84 7.12-5.15 10.95-2.94 3.83 2.23 5.14 7.12 2.94 10.96"
            style="transform: translate(100px, 100px);"></path>

          <path class="octoline-top-right" d="M63.55 27.5l32.9 19-32.9-19z"></path>
          <path class="octoline-right" d="M96 46v38-38z"></path>
          <path class="octoline-bottom-right" d="M96.45 84.5l-32.9 19 32.9-19z"></path>
          <path class="octoline-bottom-left" d="M64.45 103.5l-32.9-19 32.9 19z"></path>
          <path class="octoline-left" d="M32 84V46v38z"></path>
          <path class="octoline-top-left" d="M31.55 46.5l32.9-19-32.9 19z"></path>

          <path class="triangle-bottom" d="M30 84h70"></path>
          <path class="triangle-left" d="M65 26L30 87"></path>
          <path class="triangle-right" d="M98 87L63 26"></path>
        </g>
      </svg>

      <div class="text">Loading
        <span class="text-inner">GraphQL Playground</span>
      </div>
    </div>
  `,
  script: `
    const loadingWrapper = document.getElementById("loading-wrapper");

    if (loadingWrapper)
      loadingWrapper.classList.add("fadeOut");
  `
});
