import moment from 'moment';

export default function dateFormater(unformatedDate: any) {
  const date = new Date(unformatedDate);
  return moment(date).format('DD/MM/YYYY');
}