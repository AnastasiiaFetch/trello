export const showToast = (toastFunc: (...args: any) => void, message: string, status: string) => {
  toastFunc({
    title: message,
    status: status,
    isClosable: true,
    position: 'top-right',
    duration: 5000,
  });
};
