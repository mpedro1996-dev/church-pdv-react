import axios from 'axios';

export const api = axios.create({
    baseURL:'http://localhost:5091',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Tipagem explícita para setLoading
let setLoading: (loading: boolean) => void;

// Função para registrar setLoading
export const registerLoadingIndicator = (setLoadingFunc: (loading: boolean) => void) => {
    setLoading = setLoadingFunc;
};

// Interceptor para a requisição
api.interceptors.request.use(
    config => {
        // Exibir indicador de carregamento
        showLoadingIndicator();
        return config;
    },
    error => {
        // Ocultar indicador de carregamento em caso de erro
        hideLoadingIndicator();
        return Promise.reject(error);
    }
);

// Interceptor para a resposta
api.interceptors.response.use(
    response => {
        // Ocultar indicador de carregamento
        hideLoadingIndicator();
        return response;
    },
    error => {
        // Ocultar indicador de carregamento em caso de erro
        hideLoadingIndicator();
        return Promise.reject(error);
    }
);

// Funções para mostrar e esconder o indicador de carregamento
const showLoadingIndicator = () => {
    if (setLoading) setLoading(true);
};

const hideLoadingIndicator = () => {
    if (setLoading) setLoading(false);
};