import ErrorPageWrapper from '../../components/error/ErrorPageWrapper';
import icon from '../../assets/images/500.svg';

const Page500 = () => {
  return (
    <ErrorPageWrapper
      errorIcon={icon}
      errorText={
        'На жаль, сталася внутрішня помилка сервера. Наші технічні спеціалісти вже працюють над виправленням цієї ситуації. Будь ласка, спробуйте пізніше.'
      }
    />
  );
};

export default Page500;
