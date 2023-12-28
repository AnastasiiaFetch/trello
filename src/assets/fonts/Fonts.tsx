import { Global } from '@emotion/react';

const Fonts = () => {
  return (
    <Global
      styles={`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

        body {
          background: #eff5fa;
          padding: 0;
          margin: 0;
          font-family: 'Inter', sans-serif !important;
        }

        ::-webkit-scrollbar {
	        width: 6px;
          height: 6px;
        }

        ::-webkit-scrollbar-thumb {
	        background-color: #DADADA;
	        border-radius: 4px;
        }

        ::-webkit-scrollbar-track {
	        background-color: #FAFAFA;
          border-radius: 4px;
        }

        scrollbar-color: #EEEEEE #FAFAFA;
        scrollbar-width: thin;

      `}
    />
  );
};

export default Fonts;
