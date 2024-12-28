export type TResponse<T> = {
    response:
        | {
              success: true;
              data: T;
          }
        | {
              success: false;
              error: string;
          };
};
