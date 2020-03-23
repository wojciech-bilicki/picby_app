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
  messageBadPassword: 'Email lub hasło jest nieprawidłowe',
  messageBadEmail: 'Wprowadź poprawny adres e-mail.',
  forgotPasswordText: 'Zapomniałeś hasła?',
  messageServerError: 'Błąd serwera',
  messageUserNotConfirmed: `Konto nie zostało potwierdzone ${'\n'} Sprawdź skrzynkę odbiorczą.`,
};

export const forgotPasswordMessages = {
  messageBadMail: 'Wprowadź poprawny adres e-mail.',
  messageEmailNotFound: 'Podany adres e-mail nie istnieje w bazie',
  messageSendSuccess: `Przypomnienie zostało wysłane.${'\n'} Sprawdź skrzynkę odbiorczą.`,
  contentText: `Wprowadź swój adres e-mail ${'\n'} żeby zresetować hasło.`,
  messageServerError: 'Błąd serwera',
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

export const firstLoginDashboard = {
  buttonText: 'USTAWIENIA KONTA',
  headerText: 'WITAJ W APLIKACJI',
  subtitle: `Aby rozpocząć korzystanie z aplikacji, ${'\n'} przejdź do ustawień konta.`,
  contentText: `Wszystkie zmiany możesz edytować ${'\n'} w dowolnym momencie.${'\n'}Ustawienia zawsze znajdziesz${'\n'} w menu głównym.`,
};

export const commonColors = {
  orangeRed: '#EB5F34',
  lightBlue: 'rgba(7, 71, 130, 0.68)',
  darkRed: '#CC1919',
};

export const catalogsData = {
  title: 'Brak katalogów w PICBY.',
  subtitle: `Nie utworzyłeś jeszcze żadnego katalogu. ${'\n'} Kliknij w ikonę plusa z prawej strony,${'\n'} aby dodać pierwszy katalog.`,
};

export const userLoginErrorCodes = {
  badEmailOrPasswordCode: '100',
  userNotConfirmedCode: '101',
};
