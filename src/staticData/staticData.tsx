export const registerMessages = {
  messageEmailAlreadyTaken: 'Konto o podanym e-mail już istnieje.',
  messageBadEmail: 'Wprowadź poprawny adres e-mail.',
  messagePasswordError: 'Hasło musi zawierać min. 8 znaków',
  messagePasswordNotSimilar: 'Podane hasła nie są identyczne.',
  messageRegisterSuccess: `Zarejestrowano pomyślnie,${'\n'}sprawdź skrzynkę pocztową.`,
  messageFieldRequired: 'To pole jest wymagane',
  messageServerError: 'Błąd serwera',
};

export const loginMessages = {
  messageEmailConfirmation: `E-mail został potwierdzony,${'\n'}możesz się zalogować.`,
  messageLoginSuccess: `Logowanie pomyślne,${'\n'} nastąpi przekierowanie`,
  messageBadPassword: 'Hasło jest nieprawidłowe',
  messageBadEmail: 'Wprowadź poprawny adres e-mail.',
  forgotPasswordText: 'Zapomniałeś hasła?',
  messageServerError: 'Błąd serwera',
};

export const forgotPasswordMessages = {
  messageBadMail: 'Wprowadź poprawny adres e-mail.',
  messageEmailNotFound: 'Podany adres e-mail nie istnieje w bazie',
  popUpText: `Przypomnienie zostało wysłane.${'\n'} Sprawdź skrzynkę odbiorczą.`,
  contentText: `Wprowadź swój adres e-mail ${'\n'} żeby zresetować hasło.`,
  contentHeader: 'ZAPOMNIAŁEŚ HASŁA?',
};

export const buttonsData = {
  registerText: 'Zarejestruj się',
  registerWithGoogle: 'Zarejestruj się z google',
  loginText: 'Zaloguj się',
  loginWithGoogle: 'Zaloguj się z google',
  sendText: 'Wyślij',
  goBackText: 'Wróć',
  textColorWhite: {color: 'white'},
  textColorBlue: {color: '#3180AE'},
  backgroundColorVariants: [
    ['#3180AE', '#074782'],
    ['rgba(255, 255, 255, 0.87)', 'rgba(255, 255, 255, 0.87)'],
    ['#FBB114', '#FBB114'],
  ],
};

export const inputData = {
  placeholderTextBlueColor: 'rgba(7, 71, 130, 0.68)',
};

export const introHeaderText = {
  registerHeaderTextTwo: 'Masz już konto? Doskonale!',
  loginHeaderTextTwo: 'Nie masz jeszcze konta?',
  registerHeaderTextOne: 'Zaloguj się',
  loginHeaderTextOne: 'Zarejestruj się',
};

export const introductionTextContent = {
  firstScreenContentText: `aplikacji budującej język ${'\n'} w umyśle dziecka,${'\n'} a także uczącącej komunikacji.`,
  secondScreenContentText: `Dodawaj zdjęcia i nagrania głosowe,${'\n'} twórz opisy, przesyłaj pliki,${'\n'} komponuj albumy${'\n'} pełne wyjątkowych wspomnień!`,
  firstScreenTitle: 'WITAJ W',
  secondScreenTitle: 'POZNAJ',
  thirdScreenTitle: 'ŚWIAT OCZAMI DZIECKA',
};

export const menuColors = {
  RED_COLOR: '#EB5F34',
  YELLOW_COLOR: '#FBB114',
};
