import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';

export async function dateFormat(date: any) {
  dayjs.extend(updateLocale);

  dayjs.updateLocale('en', {
    weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  });

  const formatedDates = [];

  for (let i = 0; i < date.length; i++) {
    const id = i + 1;

    const format = dayjs(date[i].date).locale('pt-br').format('dddd, DD/MM');

    formatedDates.push({ date: format, id, originalDate: date[i].date });
  }

  return formatedDates;
}
