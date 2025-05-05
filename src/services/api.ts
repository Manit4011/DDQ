import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { API_BASE_URL } from "../constants/constant";
import { ChatApiResponse, ChatbotApiResponse, FileUploadResponse, UploadPollingResponse, UploadResponse } from "../types/interface";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  //   timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include tokens or handle errors globally
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    if (apiKey) {
      config.headers.set("x-api-key", apiKey);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export const postChat = async (data: any): Promise<ChatApiResponse> => {
  try {
    const response = await apiClient.post("chat", data);
    return response.data;
  } catch (error: any) {
    console.error("Error posting data:", error.message);
    throw error;
  }
};
export const postFileToProcess = async (file: File, filePath: string): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("file_path", filePath);

    const response = await apiClient.post("upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Indicate a form-data request
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error posting file: ", error.message);
    throw error;
  }
};
export const getUploadFileResponse = async (
  taskId: string
): Promise<UploadPollingResponse> => {
  try {
    const response = await apiClient.get(`/get_info/${taskId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching response: ", error.message);
    throw error;
  }
}

export const uploadQuestionnaireFile = async (
  file: File,
  userId: string,
  convId: string
): Promise<FileUploadResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", userId);
    formData.append("conv_id", convId);

    const response = await apiClient.post("process-questionnaire", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error uploading file: ", error.message);
    throw error;
  }
};
export const getFileProcessingResponse = async (
  fileId: string
): Promise<ChatbotApiResponse> => {
  try {
    const response = await apiClient.get(`/get_response/${fileId}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching response: ", error.message);
    throw error;
  }
};

