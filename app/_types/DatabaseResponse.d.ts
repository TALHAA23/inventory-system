declare interface DatabaseResponse<T = any> {
  data?: T;
  error?: string;
}

export default DatabaseResponse;
