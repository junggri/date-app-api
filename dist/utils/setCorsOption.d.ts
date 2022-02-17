export default function setCorsOption<T>(_whitelist: T[]): {
    origin: T[];
    methods: string;
    optionsSuccessStatus: number;
    credentials: boolean;
};
