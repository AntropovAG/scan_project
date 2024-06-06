import { format } from 'date-fns';

export const formatDate = (
    date: Date | string | null | undefined
) =>
    date !== null && date !== undefined
        ? format(new Date(date), "yyyy-MM-dd")
        : "";