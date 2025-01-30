import { Ad } from '@albomoni/entities/ad-card/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';

export const getAdsAsync = () => apiClient.get<Ad[]>('ad/');
