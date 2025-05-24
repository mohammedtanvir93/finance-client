import { object } from "zod";
import { remove, retrieve } from "./session";

const controllers = new Set<AbortController>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function customFetch<T = any>(
    input: RequestInfo,
    init: RequestInit = {}
): Promise<T> {
    const controller = new AbortController();
    init.signal = controller.signal;
    controllers.add(controller);

    const token = retrieve('token');

    init.headers = {
        ...init.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    try {
        const response = await fetch(input, init);

        if (response.status === 401 && window.location.pathname !== '/signin') {
            cancelAllRequests();
            remove('token');
            window.location.href = '/signin';
            throw new Error('Unauthorized - Redirecting to login');
        }

        if (!response.ok) {
            const errorBody = await response.text();
            let errorDetails: string | object = errorBody;

            try {
                errorDetails = JSON.parse(errorBody);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                errorDetails = { message: errorBody };
            }

            throw new Error(`${JSON.stringify(errorDetails)}`);
        }

        const contentLength = response.headers.get('content-length');
        const contentType = response.headers.get('content-type');

        if (
            response.status !== 204 &&
            contentLength !== '0' &&
            contentType?.includes('application/json')
        ) {
            return response.json() as Promise<T>;
        }

        return undefined as unknown as T;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err.name === 'AbortError') {
            console.log('Request aborted');
        } else {
            console.error('Fetch error:', err);
        }
        throw err;
    } finally {
        controllers.delete(controller);
    }
}

function cancelAllRequests() {
    controllers.forEach(controller => controller.abort());
    controllers.clear();
}

const defaultHeaders = {
    'Content-Type': 'application/json',
};

const http = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get: async <T = any>(
        url: string,
        options: RequestInit = {},
        params?: Record<string, string | number | boolean>
    ): Promise<T> => {
        const urlWithParams = params ? `${url}?${new URLSearchParams(params as Record<string, string>).toString()}` : url;

        return customFetch<T>(urlWithParams, {
            ...options,
            method: 'GET',
            headers: { ...defaultHeaders, ...options.headers },
        });
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    post: async <T = any>(url: string, data?: any, options: RequestInit = {}): Promise<T> => {
        const isObject =
            data !== null && typeof data === 'object' && !(data instanceof FormData);

        return customFetch(url, {
            ...options,
            method: 'POST',
            body: isObject ? JSON.stringify(data) : data,
            headers: { ...defaultHeaders, ...options.headers },
        });
    },


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    patch: async <T = any>(url: string, data?: any, options: RequestInit = {}): Promise<T> => {
        return customFetch(url, {
            ...options,
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
            headers: { ...defaultHeaders, ...options.headers },
        });
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete: async <T = any>(url: string, options: RequestInit = {}): Promise<T> => {
        return customFetch(url, {
            ...options,
            method: 'DELETE',
            headers: { ...defaultHeaders, ...options.headers },
        });
    },
};

export default http;
