export interface PlanResponse {
  id: number;
  name: string;
  price: number;
  type: string;
  billingPeriod: string;
  laundryFeatures: string[];
  clientFeatures: string[];
  recommended: boolean;
}
