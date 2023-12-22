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
	        width: 5px;
          height: 5px;
        }

        ::-webkit-scrollbar-thumb {
	        background-color: #e8e8e8;
	        border-radius: 4px;
        }

        ::-webkit-scrollbar-track {
	        background-color: #f8f9fa;
          border-radius: 60px;
        }

        scrollbar-color: #e8e8e8 #f8f9fa;
        scrollbar-width: thin;

      `}
    />
  );
};

export default Fonts;
