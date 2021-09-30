import ReactDOMServer from 'react-dom/server';

const IndexHTML = () => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Rhino Security - Djavan</title>
      {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500,700,300" /> */}
      {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.7.0/css/flag-icon.min.css" /> */}
      <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
      <style>
        {`
          .page-loader {
              background-color: #2c3e50;
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
          }

          .spinner {
            width: 40px;
            height: 40px;

            position: relative;
            margin: auto;
            margin-top: calc(50vh - 40px);
          }

          .double-bounce1, .double-bounce2 {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #fff;
            opacity: 0.6;
            position: absolute;
            top: 0;
            left: 0;

            -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
            animation: sk-bounce 2.0s infinite ease-in-out;
          }

          .double-bounce2 {
            -webkit-animation-delay: -1.0s;
            animation-delay: -1.0s;
          }

          @-webkit-keyframes sk-bounce {
            0%, 100% { -webkit-transform: scale(0.0) }
            50% { -webkit-transform: scale(1.0) }
          }

          @keyframes sk-bounce {
            0%, 100% {
              transform: scale(0.0);
              -webkit-transform: scale(0.0);
            } 50% {
              transform: scale(1.0);
              -webkit-transform: scale(1.0);
            }
          }
        `}
      </style>
    </head>
    <body>
      <div id="react-view" />
      <div className="page-loader">
        <div className="spinner">
          <div className="double-bounce1" />
          <div className="double-bounce2" />
        </div>
      </div>
    </body>
  </html>);

export default () => {
  const html = ReactDOMServer.renderToStaticMarkup(<IndexHTML />);
  return `<!DOCTYPE html>${html}`;
};
