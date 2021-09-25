const baseUrl = 'http://127.0.0.1:3000';

enum InputType {
  SINGLE_LINE_OF_TEXT,
  MULTIPLE_LINES_OF_TEXT,
}
const iptcFields = [
  { fieldName: 'Headline', labels: { de: 'Titel', en: 'Title' }, inputType: InputType.SINGLE_LINE_OF_TEXT, maxLength: 32 },
  { fieldName: 'Caption-Abstract', labels: { de: 'Dateiart / Beschreibung', en: 'Type / Description' }, inputType: InputType.MULTIPLE_LINES_OF_TEXT, maxLength: 2000 },
  { fieldName: 'Writer-Editor', labels: { de: 'Autor / Rechte', en: 'Author / Copyright' }, inputType: InputType.SINGLE_LINE_OF_TEXT, maxLength: 32 },
  { fieldName: 'Credit', labels: { de: 'Quelle', en: 'Source' }, inputType: InputType.SINGLE_LINE_OF_TEXT, maxLength: 32 },
];

export{ baseUrl, iptcFields }