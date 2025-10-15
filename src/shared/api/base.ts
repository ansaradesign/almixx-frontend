/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable class-methods-use-this */

import { API_URL, PAYMENT_URL } from '../config';

export class ApiClient {
  [x: string]: any;

  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async handleResponse<TResult>(response: Response): Promise<TResult> {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    try {
      return await response.json();
    } catch (error) {
      throw new Error('Error parsing JSON response');
    }
  }

  public async get<TResult = unknown>(
    endpoint: string,
    queryParams?: Record<string, string | number>,
    customProperties?: object,
  ): Promise<TResult> {
    const url = new URL(endpoint, this.baseUrl);

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });
    }

    const basicProperties = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...customProperties,
      },
    };

    const response = await fetch(url.toString(), basicProperties);

    return this.handleResponse<TResult>(response);
  }

  public async post<TResult = unknown, TData = Record<string, unknown>>(
    endpoint: string,
    body: TData,
    customProperties?: object,
  ): Promise<TResult> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...customProperties,
      },
      body: JSON.stringify(body),
    });

    return this.handleResponse<TResult>(response);
  }

  public async put<TResult = unknown, TData = Record<string, unknown>>(
    endpoint: string,
    body: TData,
    customProperties?: object,
  ): Promise<TResult> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...customProperties,
      },
      body: JSON.stringify(body),
    });

    return this.handleResponse<TResult>(response);
  }

  public async delete<TResult = unknown, TData = Record<string, unknown>>(
    endpoint: string,
    body: TData,
    customProperties?: object,
  ): Promise<TResult> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...customProperties,
      },
      body: JSON.stringify(body),
    });

    return this.handleResponse<TResult>(response);
  }
}

export const apiClient = new ApiClient(API_URL);
export const paymentClient = new ApiClient(PAYMENT_URL);
