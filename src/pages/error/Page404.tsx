import ErrorPageWrapper from '../../components/error/ErrorPageWrapper';
import icon from '../../assets/images/404.svg';

const Page404 = () => {
  return (
    <ErrorPageWrapper
      errorIcon={icon}
      errorText={
        'Сторінку або ресурс, який ви шукали, не знайдено. Можливо, він був переміщений або видалений. Будь ласка, перевірте правильність URL та спробуйте знову.'
      }
    />
  );
};

export default Page404;
