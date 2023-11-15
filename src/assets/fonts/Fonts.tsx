import { Global } from '@emotion/react';

const Fonts = () => {
  return (
    <Global
      styles={`
        body {
          background: #f2f2f2;
          font-family: 'Inter', sans-serif !important;
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
      `}
    />
  );
};

export default Fonts;
