import next from 'next';

export const nextApp = next({
    dir: './client',
    dev: process.env.NODE_ENV !== 'production',
});

export const handle = nextApp.getRequestHandler();
