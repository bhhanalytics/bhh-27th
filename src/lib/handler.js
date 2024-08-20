export const requestHandler = async (
    request,
    {
      afterRequestSuccess = () => {},
      afterRequestError = () => {},
      showNotifySuccess = true,
      showNotifyError = true,
      log = true,
      successText = () => "Success",
      errorText = null,
    } = {}
  ) => {
    try {
      const res = (await request).data;
      afterRequestSuccess(res);
      log && console.log(res);
      //showNotifySuccess && notifySuccess(successText(res))
      return res;
    } catch (error) {
      const errorMessage = errorText || `Error: ${error.message || error}`;
      afterRequestError(error);
      //showNotifyError && notifyError(errorMessage);
      log && console.error(error);
      return 0;
    }
  };