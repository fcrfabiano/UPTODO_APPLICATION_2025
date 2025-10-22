import { getLocalTime, getTimeText } from "./gist";

export function formatDate(date: string | Date): string {
    if (typeof date === 'string') {
      const parsed = new Date(date);
      date = isNaN(parsed.getTime()) ? new Date() : parsed;
    }
  
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
  
    const localTime = getLocalTime(date)
    const time = getTimeText(localTime, ':');
  
    if (isToday) {
      return `Hoje às ${time}`;
    }
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleDateString('pt-BR', { month: 'long' });
  
    return `${day} de ${month} às ${time}`;
  }
  