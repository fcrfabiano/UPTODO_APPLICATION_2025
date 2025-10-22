export type Task = {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    imageUri?: string;
    latitude?: number;
    longitude?: number;
    createdAt: string; // ISO string
    };