import ErrorPageWrapper from '../../components/error/ErrorPageWrapper';
import icon from '../../assets/images/400.svg';

const Page400 = () => {
  return (
    <ErrorPageWrapper
      errorIcon={icon}
      errorText={
        'Вибачте, ваш запит містить неправильні або відсутні дані. Будь ласка, перевірте свій запит та спробуйте знову.'
      }
    />
  );
};

export default Page400;
